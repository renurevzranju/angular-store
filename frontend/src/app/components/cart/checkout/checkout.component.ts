import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderProduct } from 'src/app/models/orderProduct';
import { OrderService } from 'src/app/services/order.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  panelOpenState: boolean = false;
  billingForm: FormGroup;
  countries: String[] = ["Australia", "Canada", "China", "India", "Morocco", "Saudi Arabia", "United Kingdom (UK)", "United States (US)"];
  paymentModes = [
    {
      method: "cod",
      name: "Cash on delivery",
      description: "Pay with cash upon delivery."
    },
    {
      method: "paypal",
      name: "PayPal",
      description: "Pay via PayPal; you can pay with your credit card if you don\’t have a PayPal account."
    }
  ];
  paymentMode: string = "cod";
  orderPlaced: boolean = false;
  userName: string = "";
  userProfileJson = {};
  cartValue: number = 0;
  cartItems: OrderProduct[] = [];

  /**
   * @constructor
   * @param {FormBuilder} fb Angular Reactive Form Builder.
   * @param {SharedService} sharedService To track and increase Cart Count
   * @param {AuthService} auth User Details like name and email from Auth0
   * @param {ToastrService} toastr Display success and error message
   * @param {OrderService} orderService API Interaction to persist the data
  */
  constructor(private fb: FormBuilder,
    public sharedService: SharedService,
    private auth: AuthService,
    private orderService: OrderService,
    private toastr: ToastrService) {

    const emailRegex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex: RegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    this.billingForm = fb.group({
      email: ["", [Validators.required, Validators.pattern(emailRegex)]],
      firstName: [null, Validators.required],
      lastName: [null],
      phoneNo: [null, [Validators.required, Validators.pattern(phoneRegex)]],
      country: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      address: [null, Validators.required],
      zip: [null, Validators.required],
      validate: '',
    });
    this.auth.user$.subscribe((profile) => {
      if (profile) {
        const response = profile;
        this.userProfileJson = JSON.stringify(response, null, 2);
        this.billingForm.get("email")?.patchValue(response.email);
        this.billingForm.get("firstName")?.patchValue(response.name);
        this.userName = response.name as string;
      }
    });
  }

  /**
   * @ngOnInit
   * To populate the cart items for users to verify before checkout
   * @returns void
  */
  ngOnInit(): void {
    this.getCartItems();
  }

  /**
   * Interacts with Express API and fetches the cart items
   * @returns void
  */
  getCartItems(): void {
    const orderID = localStorage.getItem('orderID') || 0;
    if (orderID != 0) {
      this.orderService.getAllProducts(orderID as unknown as number).subscribe(products => {
        let totalCartValue = 0;
        let data: OrderProduct[] = [];
        products.forEach(item => {
          data.push({
            id: item.id,
            name: item.name,
            product_id: item.product_id,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
            order_id: item.order_id,
            imagecode: item.imagecode
          });
          totalCartValue += (item.price * item.quantity);
        });
        this.cartValue = totalCartValue;
        this.cartItems = data;
        this.sharedService.cartCount = data.length;
      });
    }
  }

  /**
   * Interacts with Express API and updates the status of the order to completed
   * Gets the OrderID and UserID from local storage
   * @returns void
  */
  placeOrder(): void {
    const orderID = localStorage.getItem('orderID') || 0;
    const userID = localStorage.getItem('user') || 0;
    const order: Order = {
      id: orderID as number,
      status: "completed",
      user_id: Number(userID)
    }
    if (orderID != 0 && userID != 0) {
      this.orderService.placeOrder(order).subscribe(response => {
        localStorage.removeItem("orderID");
        this.orderPlaced = true;
        this.sharedService.cartCount = 0;
        this.billingForm.reset();
      });
    }
    else {
      this.toastr.error("Something went wrong. Contact the administrator", "Error");
    }
  }
}
