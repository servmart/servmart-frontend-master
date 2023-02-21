import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

export interface PeriodicElement {
  property: string;
  basic: string;
  vip: string;
  premium: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { property: 'Unlimited Products Upload', basic: 'No', vip: 'Yes', premium: 'Yes'},
  { property: 'Promotions & Events', basic: 'Yes', vip: 'Yes', premium: 'Yes'},
  { property: 'Store Domain', basic: 'No', vip: 'No', premium: 'Yes'},
  { property: 'Ad Support', basic: 'No', vip: 'Yes', premium: 'Yes'},
];

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.scss']
})
export class SubscriptionPageComponent implements OnInit {
  displayedColumns: string[] = [ 'property', 'basic', 'vip', 'premium'];
  dataSource = ELEMENT_DATA;
  subscriptionPackage:Number = 250;
  constructor(private route: Router, private commonService: CommonService) { }
  handler:any = null;
  showContinueButton:boolean = false;
  
  ngOnInit(): void {
    this.loadStripe();
  }

  makePayment(){
    setTimeout(()=>{
      this.showContinueButton = true
  }, 5000);
    this.pay(this.subscriptionPackage);
  }

  continueToNextPage(): void {
    this.commonService.updateUser({subscriptionPackage: this.subscriptionPackage}).subscribe((res:any) =>{
      this.route.navigate(['/onboarding-page']);// navigate to approval page
      this.showContinueButton = false; 
    }, (error) =>{
      console.log(error);
    })
  }

  goToHomePage(){
    this.route.navigate(['/home']); // navigate to home page
  }
  onItemChange(data:Number){
    this.subscriptionPackage = data;
  }
  pay(amount:any) {    
  
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
      }
    });
  
    handler.open({
      name: 'ServMart',
      description: 'ServMart Payment Gateway',
      amount: amount * 100
    });
  }
  
  loadStripe() { 
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
          }
        });
      }
        
      window.document.body.appendChild(s);
    }
  }
  
}
