import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/helpers/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  quantity: number = 0;
  productData?: Product;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void{
    this._route.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      this.productId = paramMap.get('id') ? Number(paramMap.get('id')) : 0;
      this.getProductDetails(this.productId);
    });
  }

  getProductDetails(productId: number){
    this.quantity = 1;
    this.productData = {
      id: productId,
      name: "Papaya",
      price: 55,
      imageCode: "1",
      description: "Potatoes are nutrient-dense, non-fattening and have reasonable amount of calories. Include them in your regular meals so that the body receives a good supply of carbohydrates, dietary fibers and essential minerals ",
      category: "Fruits"
    }
  }
}
