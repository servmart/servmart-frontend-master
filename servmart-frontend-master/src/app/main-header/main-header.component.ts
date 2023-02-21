import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  searchString = "";
  isUserLoggedIn:boolean = false;
  supplierName: any = localStorage.getItem("supplierName") 
  supplierNameInitials = this.supplierName.split(' ').map((word:any) => word[0]).join('.');
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  searchProduct() {
    console.log(this.searchString);
  }
  goToHomePage(){
    this.route.navigate(['/home']); // navigate to home page
  }
  logOutUser(){
    localStorage.clear();
    this.route.navigate(['/home']);
  }
  goToChangePassword(){
    this.route.navigate(['/changePassword']); // navigate to change password page
  }
  goToOnboardingPage(){
    this.route.navigate(['/onboarding-page']);
  }
}
