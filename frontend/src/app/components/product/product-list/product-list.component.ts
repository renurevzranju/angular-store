import { Component, OnInit } from '@angular/core';
import { OrderProduct } from 'src/app/helpers/orderProduct';
import { Product } from 'src/app/helpers/product';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  categoryList: string[] = ["vegetables", "fruits", "bakery", "beverages", "fish & meat"];
  filterPriceValue: number = 100;
  cartQuantity: number = 1;
  filterCategory: string = this.sharedService.categoryFilter || "vegetables";

  constructor(private productService: ProductService,
    public sharedService: SharedService,
    private toastr: ToastrService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.filterProducts(this.filterCategory);
  }

  filterProducts(category: string) {
    this.filterCategory = category;
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.productList = products;
    });
  }

  addProductToCart(product: OrderProduct) {
    let userID = localStorage.getItem('user') || 0;
    let orderID = localStorage.getItem('orderID');

    if (orderID) {
      this.addProductToOrder(product);
    } else if(userID !== 0) {
      this.orderService.getActiveOrderDetailsForUser(userID as number).subscribe(order => {
        if (!order || order.id == undefined) {
          this.createNewOrder(Number(userID), product)
        }
        else {
          localStorage.setItem("orderID", order.id.toString());
          product.order_id = Number(order.id);
          this.addProductToOrder(product);
        }
      });
    } else {
      this.toastr.error("Something went wrong. Contact the administrator", "Error");
    }

  }

  createNewOrder(userID: number, product: OrderProduct) {
    this.orderService.createOrder(userID, product).subscribe(order => {
      this.toastr.success('Successfully added to your Cart', product.name);
      localStorage.setItem('orderID', order.id.toString());
      this.sharedService.setCartCount(true);
    }, error => {
      console.error(error);
      this.toastr.error('Unable to added the product to the cart', product.name);
    });
  }

  addProductToOrder(product: OrderProduct) {
    this.orderService.checkIfProductAlreadyExists(product).subscribe(response => {
      if (!response || response.id == undefined) {
        this.addProduct(product);
      }
      else {
        product.quantity = response.quantity + 1;
        product.id = response.id;
        this.updateProduct(product);
      }
    });
  }

  addProduct(product: OrderProduct) {
    this.orderService.addProduct(product).subscribe(op => {
      this.toastr.success('Successfully added to your Cart', product.name);
      this.sharedService.setCartCount(true);
    }, error => {
      console.error(error);
      this.toastr.error('Unable to added the product to the cart', product.name);
    })
  }

  updateProduct(product: OrderProduct) {
    this.orderService.updateProductQuantity(product).subscribe(response => {
      this.toastr.success('Successfully added to your Cart', product.name);
    }, error => {
      console.error(error);
      this.toastr.error('Unable to added the product to the cart', product.name);
    })
  }

  filterByPrice(){
    console.log(this.filterPriceValue);
  }

}
