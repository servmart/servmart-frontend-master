import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
//import { ToastrService } from 'ngx-toastr';
 
//import { AuthenticationService } from '../_services';
 
@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loginErrorResponse = '';
  userDetails:any = {};
  //returnUrl: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
    //private authenticationService : AuthenticationService,
    //private toastr: ToastrService
  ) { }
  
  ngOnInit() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(emailregex)]],
    password: ['', [Validators.required,  Validators.minLength(8)]]
    });
  }
  
  // for accessing to form fields
  get fval() { return this.loginForm.controls; }
  
  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.commonService.loginUser(this.loginForm.value).subscribe((res:any) =>{
      this.userDetails = res;
      localStorage.setItem("token", res.token);
      localStorage.setItem("currentUserId", res.userId);
      localStorage.setItem("supplierName", res.supplierName);
      localStorage.setItem("isAccountVerified", res.accountVerified);
      localStorage.setItem("isContractAccepted", res.contractAccepted)
      this.checkUserStatusandRedirect(this.userDetails)
      //this.router.navigate(['/product-detail']);
    }, (error:any) =>{
      this.loginErrorResponse = error.error.message;
      this.loading = false;
    })
  }

  forgotPassword() {
    console.log(this.loginForm.controls);
    this.submitted = false;
    this.loginForm.reset();
    this.loginErrorResponse  = '';
    this.router.navigate(['/forgotPassword']);
  }  
  goToHomePage(){
    this.router.navigate(['/home']); // navigate to home page
  }
  checkUserStatusandRedirect(data:any){
    if(!data.accountVerified){
      return this.router.navigate(['/account-not-verified']);
    }
    else if(!data.contractAccepted){
      return this.router.navigate(['/contract-page']);
    }
    else{
      localStorage.setItem('accountReadyToUse', 'ready')
      return this.router.navigate(['/product-detail']);
    }
  }
}