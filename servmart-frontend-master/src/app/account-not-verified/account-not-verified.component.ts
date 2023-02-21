import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-not-verified',
  templateUrl: './account-not-verified.component.html',
  styleUrls: ['./account-not-verified.component.scss']
})
export class AccountNotVerifiedComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  goToHomePage(){
    this.route.navigate(['/home']); // navigate to home page
  }

}
