import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router, private commonService: CommonService){

  }
  canActivate(): boolean {
    if(this.commonService.loggedIn() && this.commonService.isAccountVerified() && this.commonService.isContractAccepted()){
      return true;
    }
    else if(this.commonService.loggedIn() && !this.commonService.isAccountVerified()){
      this.route.navigate(['/account-not-verified'])
      return true;
    }
    else if(this.commonService.loggedIn() && this.commonService.isAccountVerified() && !this.commonService.isContractAccepted()){
      this.route.navigate(['/contract-page'])
      return true;
    }
    else{
      this.route.navigate(['/login'])
      return false;
    }
  }
}
