import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderProduct } from 'src/app/helpers/orderProduct';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart = [];
  isCartEmpty: boolean = true;
  displayedColumns: string[] = ['id', "imagecode", 'name', 'price', 'quantity', "total", "delete"];
  dataSource: any[] = [];
  activeOrderID = localStorage.getItem('orderID') || 0;
  totalCartValue: number = 0;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private orderService: OrderService,
    private toastr: ToastrService,
    public sharedService: SharedService) {
    if (!this.activeOrderID) {
      this.getOrderID();
    }
  }

  ngOnInit() {
    this.cart = [];
    this.getCartProducts();
  }

  getOrderID() {
    let userID = localStorage.getItem('user') || 0;
    if(userID !== 0){
      this.orderService.getActiveOrderDetailsForUser(userID as number).subscribe(order => {
        if(order){
          this.activeOrderID = order.id;
          localStorage.setItem('orderID', order.id.toString());
        }
        else{
          this.isCartEmpty = true;
        }
      },
      err=> {
        this.isCartEmpty = true;
      });
    }
  }

  getCartProducts() {
    if(this.activeOrderID !== 0){
      this.orderService.getAllProducts(this.activeOrderID as number).subscribe(products => {
        this.totalCartValue = 0;
        let data: OrderProduct[] = [];
        products.forEach(item => {
          data.push({
            id: item.id,
            name: item.name,
            product_id: item.product_id,
            price: item.price,
            quantity:item.quantity,
            total: item.price * item.quantity,
            order_id: item.order_id,
            imagecode: item.imagecode
          });
          this.totalCartValue += (item.price * item.quantity);
        });
        this.sharedService.cartValue = this.totalCartValue;
        this.sharedService.cartCount = data.length;
        this.dataSource = data;
        this.isCartEmpty = data.length == 0;
      });
    }
  }

  deleteProduct(orderProductID: number, name: string){
    this.orderService.deleteProductFromOrder(orderProductID).subscribe(response => {
        this.toastr.success("Successfully deleted the product from the cart", name);
        this.getCartProducts();
    });
  }
}
