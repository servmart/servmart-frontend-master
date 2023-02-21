import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-account-welcome',
  templateUrl: './account-welcome.component.html',
  styleUrls: ['./account-welcome.component.scss']
})
export class AccountWelcomeComponent implements OnInit {
  verificationResponse:string = '';
  errorFlag:boolean = false;


  constructor(private commonService: CommonService, private route:Router) { }

  ngOnInit(): void {
    this.commonService.verifyUserAccount(window.location.pathname.split('/')[2]).subscribe((res:any) =>{
      this.verificationResponse = res.message;
    }, (error:any) =>{
      this.errorFlag = true;
      this.verificationResponse = error.error.message;
      
    })
  }

  goToLoginPage(){
    this.route.navigate(['/login']); // navigate to login page
  }

  goToHomePage(){
    this.route.navigate(['/home']); // navigate to home page
  }
}
