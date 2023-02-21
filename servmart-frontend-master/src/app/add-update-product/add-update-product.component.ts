import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent implements OnInit {
  addEditProduct: FormGroup;
  submitted = false;
  productData:any
  productTypeArray:any
  showImgUrlPicture:boolean = false;
  editMode:boolean = true;
  editProductId:any = '';
  loading:boolean = false;
  deleteLoading:boolean = false;
  showCropper:boolean = false;
  croppedImg: any = '';
  constructor(
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editProductId = this.activatedRoute.snapshot.paramMap.get('_id');
    if(this.editProductId != null){
      this.editMode = true;
      this.productData = {};
      this.getProductDetails(this.editProductId);
    }else{
      this.editMode = false;
      this.productData = {}
    }
    this.addEditProduct = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        type: ['', [Validators.required]],
        oldPrice: ['', Validators.required],
        newPrice: ['', Validators.required],
        imgLink: ['', Validators.required],
      }
    );
    this.productTypeArray = ["apple", "samsung", "oneplus"]
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addEditProduct.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addEditProduct.invalid) {
      return;
    }
    //console.log(JSON.stringify(this.addEditProduct.value, null, 2));
    if(this.editMode){
      //console.log(this.editProductId)
      this.loading = true;
      this.commonService.updateProduct(this.addEditProduct.value, this.editProductId).subscribe((res:any) =>{
        console.log(res);
        setTimeout(()=>{
          this.loading =false;
          this.router.navigate(['/onboarding-page'])
          this.openSnackBar('Updated')
        }, 1500);
      }, (error) =>{
        console.log(error);
      })
    }else{
      this.loading = true;
      this.commonService.addProduct(this.addEditProduct.value).subscribe((res:any) =>{
        console.log(res);
        setTimeout(()=>{
          this.loading =false;
          this.router.navigate(['/onboarding-page'])
          this.openSnackBar('Added')
        }, 1500);
      }, (error) =>{
        console.log(error);
      })
    }
  }

  deleteProduct(){
    this.deleteLoading = true;
    this.commonService.deleteProduct(this.editProductId).subscribe((res:any) =>{
      console.log(res);
      setTimeout(()=>{
        this.deleteLoading =false;
        this.router.navigate(['/onboarding-page'])
        this.openSnackBar('Deleted')
      }, 1500);
    }, (error) =>{
      console.log(error);
    })
  }

  getProductDetails(id:any){
    this.commonService.getProductDetails(this.editProductId).subscribe((res:any) =>{
     this.productData =  res.data.products;
    }, (error) =>{
      console.log(error);
    })
  }

  onReset(): void {
    this.submitted = false;
    this.addEditProduct.reset();
    this.productData = {}
  }
  previewImg(url:string):void {
    this.showImgUrlPicture = true;
  }

  goToHomePage(){
    this.router.navigate(['/home']); // navigate to home page
  }
  goToOnboardingPage(){
    this.router.navigate(['/onboarding-page']); // navigate to onboarding page
  }

  openSnackBar(data:any) {
    this._snackBar.open('Product ' + data + ' Successfully', 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
  uploadImage(){
    this.showCropper = true;
  }
  saveCroppedImage(){
    this.showCropper = false;
  }
  getCroppedImageLink($event:any){
    this.showCropper = false;
    this.croppedImg = $event;
    this.productData.imgLink = this.croppedImg;
  }
}
