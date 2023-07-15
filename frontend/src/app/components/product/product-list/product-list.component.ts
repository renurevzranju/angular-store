import { Component, OnInit } from '@angular/core';
import { OrderProduct } from 'src/app/models/orderProduct';
import { Product } from 'src/app/models/product';
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

  /**
 * @constructor
 * @param {ProductService} productService API service to fetch product based on category
 * @param {OrderService} orderService API service to persist order data
 * @param {SharedService} sharedService Shared service to update the cart count
 * @param {ToastrService} toastr Success and error message service
 */
  constructor(private productService: ProductService,
    public sharedService: SharedService,
    private toastr: ToastrService,
    private orderService: OrderService) { }

  /**
* @ngOnInit
* Gets the Product based on the category
* @returns void Returns nothing
*/
  ngOnInit(): void {
    this.filterProducts(this.filterCategory);
  }

  /**
 * Based on the category filter the product by calling the API
 * @returns void Returns nothing
 */
  filterProducts(category: string): void {
    this.filterCategory = category;
    this.sharedService.categoryFilter = category;
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.productList = products;
    });
  }

  /**
 * Calls this method on click of Add to Cart button
 * If Active Order ID exists, then add the product to the order
 * else create a new order with the product
 * Display error message if UserID does not exist
 * @returns void Returns nothing
 */
  addProductToCart(product: OrderProduct): void {
    const userID = localStorage.getItem('user') || 0;
    const orderID = localStorage.getItem('orderID');

    if (orderID) {
      this.addProductToOrder(product);
    } else if (userID !== 0) {
      this.orderService.getActiveOrderDetailsForUser(userID as unknown as number).subscribe(order => {
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
      this.toastr.error("Something went wrong. Contact the administrator or Re-Login to the application", "Error");
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
      this.toastr.success('Successfully added to your Cart', product.name);
    }, error => {
      console.error(error);
      this.toastr.error('Unable to added the product to the cart', product.name);
    })
  }

  /**
 * Simple Change Event function
 * @returns void Returns nothing
 */
  filterByPrice(): void {
    console.log(this.filterPriceValue);
  }

}
