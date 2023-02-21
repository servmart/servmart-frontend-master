import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountNotVerifiedComponent } from './account-not-verified/account-not-verified.component';
import { AccountWelcomeComponent } from './account-welcome/account-welcome.component';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { ApprovalFormComponent } from './approval-form/approval-form.component';
import { AuthGuard } from './auth.guard';
import { ContractPageComponent } from './contract-page/contract-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { OnboardingPageComponent } from './onboarding-page/onboarding-page.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SignupStepsComponent } from './signup-steps/signup-steps.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent},
  {path: 'sign-up', component: SignupStepsComponent},
  {path: 'approval-form', component: ApprovalFormComponent},
  {path: 'contract-page', component: ContractPageComponent},
  {path: 'subscription-page', component: SubscriptionPageComponent,canActivate:[AuthGuard]},
  {path: 'payment-page', component: PaymentPageComponent,canActivate:[AuthGuard]},
  {path: 'onboarding-page', component: OnboardingPageComponent,canActivate:[AuthGuard]},
  {path: 'product-detail', component: ProductDetailComponent,canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'accountWelcome/:token', component: AccountWelcomeComponent},
  {path: 'resetPassword/:resetToken', component: PasswordResetComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'changePassword', component: PasswordChangeComponent,canActivate:[AuthGuard]},
  {path: 'addUpdateProduct', component: AddUpdateProductComponent,canActivate:[AuthGuard]},
  {path: 'account-not-verified', component: AccountNotVerifiedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
