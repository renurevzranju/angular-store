import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/helpers/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  categoryList: string[] = ["vegetables", "fruits", "bakery", "beverages", "fish & meat"];
  filterPriceValue: number = 100;
  cartQuantity:number = 1;
  filterCategory: string = "vegetables";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.filterProducts(this.filterCategory);
  }

  filterProducts(category: string) {
    this.filterCategory= category;
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.productList = products;
    });
  }
}
