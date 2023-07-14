import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/helpers/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  quantity: number = 0;
  productData?: Product;

  constructor(private _route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void{
    this._route.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.productId = paramMap.get('id') ? Number(paramMap.get('id')) : 0;
      this.getProductDetails(String(this.productId));
    });
  }

  getProductDetails(productId: string){
    this.quantity = 1;
    this.productService.getProductsByID(productId).subscribe(product => {
      this.productData = product;
    })
  }
}
