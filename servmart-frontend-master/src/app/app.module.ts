import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerBaseComponent } from './customer-base/customer-base.component';
import { ModesToSellComponent } from './modes-to-sell/modes-to-sell.component';
import { FooterWrapComponent } from './footer-wrap/footer-wrap.component';
import { SignupStepsComponent } from './signup-steps/signup-steps.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ApprovalFormComponent } from './approval-form/approval-form.component';
import { ContractPageComponent } from './contract-page/contract-page.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { OnboardingPageComponent } from './onboarding-page/onboarding-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CommonService } from './common.service';
import { HttpInterceptorService } from './http-interceptor.service';
import { AccountWelcomeComponent } from './account-welcome/account-welcome.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { AccountNotVerifiedComponent } from './account-not-verified/account-not-verified.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerBaseComponent,
    ModesToSellComponent,
    FooterWrapComponent,
    SignupStepsComponent,
    HomePageComponent,
    ApprovalFormComponent,
    ContractPageComponent,
    SubscriptionPageComponent,
    PaymentPageComponent,
    OnboardingPageComponent,
    ProductDetailComponent,
    MainHeaderComponent,
    LoginComponent,
    AccountWelcomeComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
    PasswordChangeComponent,
    AddUpdateProductComponent,
    ImageCropperComponent,
    AccountNotVerifiedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule
  ],
  providers: [AuthGuard, CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
