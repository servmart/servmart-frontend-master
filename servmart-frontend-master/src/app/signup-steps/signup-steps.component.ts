import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-steps',
  templateUrl: './signup-steps.component.html',
  styleUrls: ['./signup-steps.component.scss']
})
export class SignupStepsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  getStarted(){
    this.route.navigate(['/approval-form']); // navigate to approval page
  }

}
