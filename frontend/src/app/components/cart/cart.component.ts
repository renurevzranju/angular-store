import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderProduct } from 'src/app/helpers/orderProduct';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  isCartEmpty: boolean = true;
  displayedColumns: string[] = [
    'id',
    'imagecode',
    'name',
    'price',
    'quantity',
    'total',
    'delete',
  ];
  dataSource: any[] = [];
  activeOrderID = localStorage.getItem('orderID') || 0;
  totalCartValue: number = 0;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * @constructor
   * @param {SharedService} sharedService To track and increase Cart Count
   * @param {ToastrService} toastr Display success and error message
   * @param {OrderService} orderService API Interaction to persist the data
   */
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    public sharedService: SharedService
  ) {
    if (!this.activeOrderID) {
      this.getOrderID();
    }
  }

  /**
   * @ngOnInit
   * To populate the cart items in the table
   * @returns void
   */
  ngOnInit(): void {
    this.getCartProducts();
  }

  /**
   * Interacts with Express API and get the order in active status for the logged in user
   * User ID is required and fetched from local storage
   * @returns void
   */
  getOrderID(): void {
    let userID = localStorage.getItem('user') || 0;
    if (userID !== 0) {
      this.orderService
        .getActiveOrderDetailsForUser(userID as number)
        .subscribe(
          (order) => {
            if (order) {
              this.activeOrderID = order.id;
              localStorage.setItem('orderID', order.id.toString());
            } else {
              this.isCartEmpty = true;
            }
          },
          (err) => {
            this.isCartEmpty = true;
          }
        );
    }
  }

  /**
   * Interacts with Express API and get the all the products that are added to the cart
   * Updates the cart count in the header
   * Checks if the cart is empty and displays the respective view
   * @returns void
   */
  getCartProducts(): void {
    if (this.activeOrderID !== 0) {
      this.orderService
        .getAllProducts(this.activeOrderID as number)
        .subscribe((products) => {
          this.totalCartValue = 0;
          let data: OrderProduct[] = [];
          products.forEach((item) => {
            data.push({
              id: item.id,
              name: item.name,
              product_id: item.product_id,
              price: item.price,
              quantity: item.quantity,
              total: item.price * item.quantity,
              order_id: item.order_id,
              imagecode: item.imagecode,
            });
            this.totalCartValue += item.price * item.quantity;
          });
          this.sharedService.cartCount = data.length;
          this.dataSource = data;
          this.isCartEmpty = data.length == 0;
        });
    }
  }

  /**
   * Interacts with Express API and deletes the product from the order
   * Order Product ID is required
   * On success, the cart items are refreshed
   * @returns void
   */
  deleteProduct(orderProductID: number, name: string): void {
    this.orderService
      .deleteProductFromOrder(orderProductID)
      .subscribe((response) => {
        this.toastr.success(
          'Successfully deleted the product from the cart',
          name
        );
        this.getCartProducts();
      });
  }
}
