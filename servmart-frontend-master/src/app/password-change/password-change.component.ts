import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { FieldMatchValidator } from '../common/field-match-validator';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  updatePassword: FormGroup;
  loading = false;
  submitted = false;
  resetPasswordResponse = '';
  passwordUpdateSuccess = false;
  //returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.updatePassword = this.formBuilder.group({
      currentPassword: ['', [Validators.required,  Validators.minLength(8)]],
      newPassword: ['', [Validators.required,  Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,  Validators.minLength(8)]],
    }, {
      validator: FieldMatchValidator('newPassword', 'confirmPassword')
    });
  }

  get fval() { return this.updatePassword.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (this.updatePassword.invalid) {
    return;
    }
    this.loading = true;
    this.commonService.updatePassword(this.updatePassword.value).subscribe((res:any) =>{
      this.passwordUpdateSuccess = true;
      this.loading = false;
      localStorage.setItem("token", res.token);
      this.resetPasswordResponse = res.message;
      setTimeout(()=>{
        window.history.back();
    }, 1500);
    }, (error:any) =>{
      this.resetPasswordResponse = error.error.message;
      this.loading = false;
    })
  }

  goToHomePage(){
    this.router.navigate(['/home']); // navigate to home page
  }

  goToLoginPage(){
    this.router.navigate(['/login']); // navigate to login page
  }

}
