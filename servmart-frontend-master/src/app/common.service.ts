import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  items = [];
  constructor(private httpreq:HttpClient) { }

  addToCart(products = []) {
    this.items = [...products];
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getAllProducts() {
    return this.httpreq.get(environment.baseUrl+'/api/v1/products');
  }

  addUser(data: any) {
    return this.httpreq.post(environment.baseUrl+'/api/v1/users/signup', data);
  }

  loginUser(data: any) {
    return this.httpreq.post(environment.baseUrl+'/api/v1/users/login', data);
  }

  sendMessage(body = {}){
    //return this.httpreq.post("http://localhost:3000/email",body);
  }

  loggedIn(){
    console.log('called to check token')
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  isAccountVerified(){
    if(localStorage.getItem('isAccountVerified') === 'true'){
      return true;
    }
    return false;
  }

  isContractAccepted(){
    console.log('called to check token')
    if(localStorage.getItem('isContractAccepted') === 'true'){
      return true;
    }
    return false;
  }

  getToken(){
    return localStorage.getItem('token');
  }
  getCurrentUserId(){
    return localStorage.getItem('currentUserId')
  }
  verifyUserAccount(data:string) {
    return this.httpreq.get(environment.baseUrl+'/api/v1/users/verifyUserAccount/'+data);
  }

  forgotPassword(data:any){
    return this.httpreq.post(environment.baseUrl+'/api/v1/users/forgotPassword', data);
  }

  resetPassword(data: any, token:string){
    const resetData = {
      password:data.password,
      token
    }
    return this.httpreq.patch(environment.baseUrl+'/api/v1/users/resetPassword', resetData);
  }

  updateUser(data: any){
    return this.httpreq.patch(environment.baseUrl+'/api/v1/users/'+this.getCurrentUserId(), data)
  }

  getProductListByUser(){
    return this.httpreq.get(environment.baseUrl+'/api/v1/users/'+this.getCurrentUserId()); 
  }

  updatePassword(data: any){
    const changePassword = {
      currentPassword:data.currentPassword,
      newPassword:data.newPassword
    }
    return this.httpreq.patch(environment.baseUrl+'/api/v1/users/updatePassword', changePassword); 
  }
  updateProduct(data:any, id:any){
    return this.httpreq.patch(environment.baseUrl+'/api/v1/products/'+id, data)
  }
  addProduct(data:any){
    return this.httpreq.post(environment.baseUrl+'/api/v1/products/', data)
  }
  deleteProduct(id:any){
    return this.httpreq.delete(environment.baseUrl+'/api/v1/products/'+id)
  }
  getProductDetails(id:any){
    return this.httpreq.get(environment.baseUrl+'/api/v1/products/'+id)
  }
}

// main logo need to change
// contract /onboarding page background need to change
// static header need to add in on boarding page
// contract page content need to list properly
// payment page validation
// deployment