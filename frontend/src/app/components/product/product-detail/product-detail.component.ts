import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/helpers/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderProduct } from 'src/app/helpers/orderProduct';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  quantity: number = 0;
  productData: Product = {
    id: 0,
    imagecode: "vegs.png",
    name: "",
    price: 0,
    category: "",
    description: ""
  };
  activeOrderID: number = 0;
  productOrderData: OrderProduct = {
    price: 0,
    quantity: 1
  }
  productAlreadyInCart: boolean = false;

  constructor(private _route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private toastr: ToastrService,
    public sharedService: SharedService) {}

  ngOnInit(): void{
    this._route.paramMap.subscribe(paramMap => {
      this.productId = paramMap.get('id') ? Number(paramMap.get('id')) : 0;
      this.getProductDetails(String(this.productId));
      this.getActiveOrderID();
    });
  }

  getProductDetails(productId: string){
    this.quantity = 1;
    this.productService.getProductsByID(productId).subscribe(product => {
      this.productData = product;
      this.productOrderData.product_id = product.id;
      this.productOrderData.name = product.name;
      this.productOrderData.price = product.price;
    });
  }

  changeQuantity(action : string) {
    if(action === "minus"){
      this.quantity > 1 ? this.quantity -= 1 : null;
    }
    else{
      this.quantity < 10 ? this.quantity += 1 : null;
    }
  }

  addToCart(){
    this.productOrderData.quantity = this.quantity;
    let userID = localStorage.getItem('user') || 0;
    if (this.activeOrderID != 0) {
      this.addProductToOrder(this.productOrderData);
    } else {
      this.createNewOrder(Number(userID), this.productOrderData);
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
    if (!this.productAlreadyInCart) {
      this.addProduct(product);
    }
    else {
      this.productOrderData.quantity = this.quantity;
      this.updateProduct(product);
    }
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
      this.toastr.success('Successfully updated the Cart', product.name);
    }, error => {
      console.error(error);
      this.toastr.error('Unable to update the product to the cart', product.name);
    })
  }


  checkIfProductAddedToCart() {
    this.orderService.checkIfProductAlreadyExists(this.productOrderData).subscribe(response => {
      if (!response || response.id == undefined) {
        this.quantity =  0;
        this.productAlreadyInCart= false;
      }
      else {
        this.quantity = response.quantity;
        this.productOrderData.quantity = response.quantity;
        this.productOrderData.id = response.id;
        this.productAlreadyInCart= true;
      }
    });
  }

  getActiveOrderID(){
    let userID = localStorage.getItem('user') || 0;
    this.orderService.getActiveOrderDetailsForUser(userID as number).subscribe(order => {
      console.log(order);
      if (order && order.id) {
        this.activeOrderID = order.id;
        this.productOrderData.order_id = order.id;
        localStorage.setItem("orderID", order.id.toString());
        this.checkIfProductAddedToCart();
      }
    });
  }
}
