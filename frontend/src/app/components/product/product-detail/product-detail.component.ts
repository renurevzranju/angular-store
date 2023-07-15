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

  /**
     * @constructor
     * @param {ActivatedRoute} _route Fetch the URL parameters to get product detail
     * @param {ProductService} productService API service to fetch product details
     * @param {OrderService} orderService API service to fetch order details
     * @param {SharedService} sharedService Shared service to update the cart count
     * @param {ToastrService} toastr Success and error message service
     * @returns void Returns nothing
     */
  constructor(private _route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private toastr: ToastrService,
    public sharedService: SharedService) { }

  /**
 * @ngOnInit
 * Gets the Product details based on the product id from the URL
 * Gets the Active Order details based on the User ID
 * @returns void Returns nothing
 */
  ngOnInit(): void {
    this._route.paramMap.subscribe(paramMap => {
      const productId = paramMap.get('id') ? Number(paramMap.get('id')) : 0;
      this.getProductDetails(productId);
      this.getActiveOrderID();
    });
  }

  /**
 * Calls the API to get the product details based on the productID
 * @returns void Returns nothing
 */
  getProductDetails(productId: number): void {
    this.quantity = 1;
    if (productId != 0) {
      this.productService.getProductsByID(productId).subscribe(product => {
        this.productData = product;
        this.productOrderData.product_id = product.id;
        this.productOrderData.name = product.name;
        this.productOrderData.price = product.price;
      });
    }
  }

  /**
 * Increment/Decrement the quantity of the product
 * @returns void Returns nothing
 */
  changeQuantity(action: string): void {
    if (action === "minus") {
      this.quantity > 1 ? this.quantity -= 1 : null;
    }
    else {
      this.quantity < 10 ? this.quantity += 1 : null;
    }
  }

  /**
 * Calls this method on click of Add to Cart button
 * If Active Order ID exists, then add the product to the order
 * else create a new order with the product
 * Display error message if UserID does not exist
 * @returns void Returns nothing
 */
  addToCart(): void {
    this.productOrderData.quantity = this.quantity;
    const userID = localStorage.getItem('user') || 0;
    if (this.activeOrderID != 0) {
      this.addProductToOrder(this.productOrderData);
    }
    else if (userID != 0) {
      this.createNewOrder(Number(userID), this.productOrderData);
    }
    else {
      this.toastr.error("Something went wrong. Contact the administrator or Re-login to avoid this error", "Error");
    }
  }

  /**
 * Creates a new order along with the product
 * Display success message on valid response, else error message
 * Store the order id in the local storage
 * @returns void Returns nothing
 */
  createNewOrder(userID: number, product: OrderProduct): void {
    this.orderService.createOrder(userID, product).subscribe(order => {
      this.toastr.success('Successfully added to your Cart', product.name);
      localStorage.setItem('orderID', order.id.toString());
      this.sharedService.setCartCount(true);
    }, error => {
      console.error(error);
      this.toastr.error('Unable to added the product to the cart', product.name);
    });
  }

  /**
 * If the product exists in the cart, then update the quantity of the product
 * else, add the product to the cart
 * @returns void Returns nothing
 */
  addProductToOrder(product: OrderProduct): void {
    if (!this.productAlreadyInCart) {
      this.addProduct(product);
    }
    else {
      this.productOrderData.quantity = this.quantity;
      this.updateProduct(product);
    }
  }

  /**
 * Calls API to add product to the order
 * @returns void Returns nothing
 */
  addProduct(product: OrderProduct): void {
    this.orderService.addProduct(product).subscribe(op => {
      this.toastr.success('Successfully added to your Cart', product.name);
      this.sharedService.setCartCount(true);
    }, error => {
      console.error(error);
      this.toastr.error('Unable to added the product to the cart', product.name);
    })
  }

  /**
   * Calls API to update the product quantity
 * @returns void Returns nothing
 */
  updateProduct(product: OrderProduct): void {
    this.orderService.updateProductQuantity(product).subscribe(response => {
      this.toastr.success('Successfully updated the Cart', product.name);
    }, error => {
      console.error(error);
      this.toastr.error('Unable to update the product to the cart', product.name);
    })
  }

  /**
   * Checks if the product is already in the cart
   * @returns void Returns nothing
   */
  checkIfProductAddedToCart(): void {
    this.orderService.checkIfProductAlreadyExists(this.productOrderData).subscribe(response => {
      if (!response || response.id == undefined) {
        this.quantity = 1;
        this.productAlreadyInCart = false;
      }
      else {
        this.quantity = response.quantity;
        this.productOrderData.quantity = response.quantity;
        this.productOrderData.id = response.id;
        this.productAlreadyInCart = true;
      }
    });
  }

  /**
 * Calls the API to get the active order ID for the user
 * User ID is required and fetched from the local storage
 * @returns void Returns nothing
 */
  getActiveOrderID(): void {
    const userID = localStorage.getItem('user') || 0;
    if (userID != 0) {
      this.orderService.getActiveOrderDetailsForUser(userID as unknown as number).subscribe(order => {
        if (order && order.id) {
          this.activeOrderID = order.id;
          this.productOrderData.order_id = order.id;
          localStorage.setItem("orderID", order.id.toString());
          this.checkIfProductAddedToCart();
        }
      });
    }
    else {
      this.toastr.error("Something went wrong. Contact the administrator", "Error");
    }

  }
}
