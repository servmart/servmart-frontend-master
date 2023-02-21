import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.scss']
})
export class ApprovalFormComponent implements OnInit {
  addShopFormGroup:any;
  selected = '';
  sendVerificationLink = false;
  emailLink:string ='';
  constructor(private route: Router, private commonService: CommonService) {
    
  }

  ngOnInit() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let mobileregex: RegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.addShopFormGroup = new FormGroup({
      supplierName: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      supplierNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      panNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      gstin: new FormControl("", [
        Validators.minLength(5),
        Validators.required
      ]),
      supplierMobileNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(mobileregex)
      ]),
      supplierEmailId: new FormControl("", [
        Validators.required,
        Validators.pattern(emailregex)
      ]),
      password: new FormControl("", [
        Validators.minLength(8),
        Validators.required
      ]),
      selectType: new FormControl("", [
        Validators.nullValidator
      ])
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.addShopFormGroup.controls[controlName].hasError(errorName);
  };

  addUser(data:any) {
    this.commonService.addUser(data).subscribe((res:any) =>{
      this.sendVerificationLink = true;
      //localStorage.setItem("token", res.token);
      //this.route.navigate(['/contract-page']);
      //this.productList = res;
    }, (error) =>{
      console.log(error);
    })
  }

  onSubmit(val:any) {
    this.addUser(val); 
  }
  
  goToHomePage(){
    this.route.navigate(['/home']); // navigate to login page
  }
}
