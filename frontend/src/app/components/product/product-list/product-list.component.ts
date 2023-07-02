import { Component, OnInit } from '@angular/core';

export interface ProductList {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: ProductList[] = [];
  categoryList: string[] = ["Vegetables", "Fruits", "Snacks", "Personal Care"];
  filterPriceValue: number = 100;
  cartQuantity:number = 1;

  constructor() {}

  ngOnInit(): void {
    this.productList.push({
      id: 1,
      name: "Potato",
      price: 33,
      category: "Vegetables",
      description: "Potatoes are nutrient-dense, non-fattening and have reasonable amount of calories. Include them in your regular meals so that the body receives a good supply of carbohydrates, dietary fibers and essential minerals such as copper, magnesium, and iron. In India, potatoes are probably the second-most consumed vegetables after onions."
    });
    this.productList.push({
      id: 2,
      name: "Tomato",
      price: 55.6,
      category: "Vegetables",
      description: "Potatoes are nutrient-dense, non-fattening and have reasonable amount of calories. Include them in your regular meals so that the body receives a good supply of carbohydrates, dietary fibers and essential minerals such as copper, magnesium, and iron. In India, potatoes are probably the second-most consumed vegetables after onions."
    })
    this.productList.push({
      id: 3,
      name: "Papaya",
      price: 89.65,
      category: "Vegetables",
      description: "Potatoes are nutrient-dense, non-fattening and have reasonable amount of calories. Include them in your regular meals so that the body receives a good supply of carbohydrates, dietary fibers and essential minerals such as copper, magnesium, and iron. In India, potatoes are probably the second-most consumed vegetables after onions."
    })
  }

  productDetails(id: number) {

  }
}
