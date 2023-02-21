import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
//import { ToastrService } from 'ngx-toastr';
 
//import { AuthenticationService } from '../_services';
 
@Component({
selector: 'app-forgot-password',
templateUrl: './forgot-password.component.html',
styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword: FormGroup;
  loading = false;
  submitted = false;
  fogotPasswordApiResponse:string = '';
  passwordRecoverySuccess:boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) { }
  
  ngOnInit() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.forgotPassword = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(emailregex)]]
    });
  }
  
  // for accessing to form fields
  get fval() { return this.forgotPassword.controls; }
  
  onFormSubmit() {
    this.submitted = true;
    if (this.forgotPassword.invalid) {
      return;
    }
    this.loading = true;
    this.commonService.forgotPassword(this.forgotPassword.value).subscribe((res:any) =>{
      this.loading = false;
      this.passwordRecoverySuccess = true;
    }, (error:any) =>{
       this.fogotPasswordApiResponse = error.error.message;
       this.loading = false;
    })
  }

  goToHomePage(){
    this.router.navigate(['/home']); // navigate to home page
  }
}