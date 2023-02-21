import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productList:any;
  selectedProducts = this.commonService.getItems();
  constructor(private commonService: CommonService, private router:Router) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.commonService.getProductListByUser().subscribe((res:any) =>{
      this.productList = res.data.user.productList;
      console.log(this.productList)
    }, (error) =>{
      console.log(error);
    })
  }
  
}
