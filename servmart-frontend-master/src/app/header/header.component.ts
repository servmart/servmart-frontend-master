import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  applyNow():void {
    this.route.navigate(['/sign-up']); // navigate to other page
  }

  goToLogin(){
    this.route.navigate(['/login']); // navigate to login page
  }

}
