import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.scss']
})
export class ContractPageComponent implements OnInit {
  disabledAgreement: boolean = true;
  constructor(private route: Router, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  changeCheck(event:any){
    this.disabledAgreement = !event.target.checked;
  }

  goToSubscription(): void {
    this.commonService.updateUser({contractAccepted: true}).subscribe((res:any) =>{
      localStorage.setItem('isContractAccepted', 'true')
      this.route.navigate(['/subscription-page']);
    }, (error) =>{
      console.log(error);
    })
  }


  goToHomePage(){
    this.route.navigate(['/home']); // navigate to home page
  }
}
