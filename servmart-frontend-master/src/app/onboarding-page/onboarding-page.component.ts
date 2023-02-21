import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.scss']
})
export class OnboardingPageComponent implements OnInit {
  availableProducts = [
    {
      name:'Apple Mobiles',
      productName:'apple',
      productDesc: 'Click to select Apple Products',
      selected: false,
      imgLink: 'https://www.logopik.com/wp-content/uploads/edd/2018/07/Apple-Mobile-Logo.png'
    },
    {
      name:'Samsung Mobiles',
      productName:'samsung',
      productDesc: 'Click to select Samsung Products',
      selected: false,
      imgLink: 'https://img.pngio.com/samsung-hd-png-transparent-samsung-hdpng-images-pluspng-full-hd-pngs-for-galaxy-s-400_300.png'
    },
    {
      name:'OnePlus Mobiles',
      productName:'oneplus',
      productDesc: 'Click to select OnePlus Products',
      selected: false,
      imgLink: 'https://images.news18.com/ibnlive/uploads/2020/03/one-plus-new-logo.png?impolicy=website&width=534&height=356'
    }
  ]
  productList:any = [];
  brandFilteredProductList:any = [];
  selectedProductsList:any = [];
  constructor(private commonService: CommonService, private route: Router) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.commonService.getAllProducts().subscribe((res:any) =>{
      this.productList = res.data.products;
      this.brandFilteredProductList = this.productList;
    }, (error) =>{
      console.log(error);
      this.route.navigate(['/login']);
    })
  }

  showProducts(type:string, status:any){
    if(status == true) return this.removeProductSelection();
    this.makeSelected(type);
    let dataArrWithSet: any = [];
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].type === type) {
        dataArrWithSet.push(this.productList[i]);
      }
    }

    this.brandFilteredProductList = dataArrWithSet;
  }

  removeProductSelection(){
    this.brandFilteredProductList = [];
    this.availableProducts = this.availableProducts.map(product => {
      product.selected = false
      return product;
    });

    this.brandFilteredProductList = this.productList;
  }

  makeSelected(type: string){
    this.availableProducts = this.availableProducts.map(product => {
      if (product.productName == type){
        product.selected =true;
      } else {
        product.selected = false
      }
      return product;
    });
  }
  toggleSelection(selectedProduct:any){
    var idx = this.selectedProductsList.indexOf(selectedProduct);
    if (idx > -1) {
      this.selectedProductsList.splice(idx, 1);
    }
    else {
      this.selectedProductsList.push(selectedProduct);
    }
  }

  selectAllProducts(){
    for (let i = 0; i < this.brandFilteredProductList.length; i++) {
      this.selectedProductsList.push(this.brandFilteredProductList[i]);
    }
    this.onContinueClick();
  }

  onContinueClick(): void {
    this.commonService.updateUser({addProductToUserAccount:this.selectedProductsList}).subscribe((res:any) =>{
      this.route.navigate(['/product-detail']);
    }, (error) =>{
      console.log(error);
    })
  }

  editProduct(data:any){
    let dataToSend = {
      _id: data._id
    }
    this.route.navigate(['/addUpdateProduct', dataToSend]);
  }
  addProduct(){
    this.route.navigate(['/addUpdateProduct']);
  }
}
