import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let loginRegex:RegExp = /users\/login/i;
    let signupRegex:RegExp = /users\/signup/i;
    let commonService = this.injector.get(CommonService)
    if(loginRegex.test(req.url) || signupRegex.test(req.url)){
      return next.handle(req);
    }else{
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${commonService.getToken()}`
        }
      })
      return next.handle(tokenizedReq);
    }
  }
}
