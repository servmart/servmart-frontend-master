import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { FieldMatchValidator } from '../common/field-match-validator';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})


export class PasswordResetComponent implements OnInit {
  passwordReset: FormGroup;
  loading = false;
  submitted = false;
  resetPasswordResponse = '';
  passwordResetSuccess = false;
  //returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.passwordReset = this.formBuilder.group({
      password: ['', [Validators.required,  Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,  Validators.minLength(8)]],
    }, {
      validator: FieldMatchValidator('password', 'confirmPassword')
    });
  }

  get fval() { return this.passwordReset.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (this.passwordReset.invalid) {
    return;
    }
    this.loading = true;
    const token = window.location.pathname.split('/')[2];
    this.commonService.resetPassword(this.passwordReset.value, token).subscribe((res:any) =>{
      this.passwordResetSuccess = true;
      this.resetPasswordResponse = res.message;
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
