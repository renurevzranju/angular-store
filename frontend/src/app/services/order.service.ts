import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderProduct } from '../models/orderProduct';
import { Order } from '../models/order';
import { environment as env } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  commonAPI: string = `${env.endpointURI}api/orders/`;

  /**
 * @constructor
 * @param {HttpClient} http To connect with the express server
 */
  constructor(private http: HttpClient) { }

  /**
 * Get the active order based on the user id
 * @param {number} user_id id of the user
 * @return {Order} Returns the order detail
 */
  getActiveOrderDetailsForUser(user_id: number): Observable<Order> {
    return this.http.get<Order>(`${this.commonAPI}getOrderByStatus/${user_id}/active`);
  }

  /**
 * Creates a new order
 * @param {number} user_id id of the user
 * @param {OrderProduct} product product details
 * @return {Order} Returns the Order detail
 */
  createOrder(user_id: number, product: OrderProduct): Observable<Order> {
    const body = {
      status: "active",
      products: [
        {
          product_id: product.product_id,
          quantity: product.quantity
        }
      ]
    }
    return this.http.post<Order>(`${this.commonAPI}create/${user_id}`, body).pipe(
      map(response => {
        return response as Order;
      })
    );
  }

  /**
 * Adds the product to the order
 * @param {OrderProduct} product product details
 * @return {OrderProduct} Returns the OrderProduct detail that was created
 */
  addProduct(product: OrderProduct): Observable<OrderProduct> {
    const body = {
      order_id: product.order_id,
      product_id: product.product_id,
      quantity: product.quantity
    }
    return this.http.post<OrderProduct>(`${this.commonAPI}addProduct`, body).pipe(
      map(response => {
        return response;
      })
    );
  }

  /**
 * Checks if the product is already in the order
 * @param {OrderProduct} product product details
 * @return {OrderProduct} Returns the OrderProduct detail
 */
  checkIfProductAlreadyExists(product: OrderProduct): Observable<OrderProduct> {
    return this.http.get<OrderProduct>(`${this.commonAPI}product/${product.order_id}/${product.product_id}`);
  }

  /**
 * Update the product quantity based on the id of the product
 * @param {OrderProduct} product product details
 * @return {OrderProduct} Returns the OrderProduct detail
 */
  updateProductQuantity(product: OrderProduct): Observable<OrderProduct> {
    const { id, quantity } = product;
    return this.http.put<OrderProduct>(`${this.commonAPI}updateQuantity`, { id, quantity })
  }

  /**
 * Get the all product based on the id of the order
 * @param {number} orderID id of the product
 * @return {OrderProduct} Returns the OrderProduct detail
 */
  getAllProducts(orderID: number): Observable<OrderProduct[]> {
    return this.http.get<OrderProduct[]>(`${this.commonAPI}cart/${orderID}`);
  }

  /**
 * Delete the product in the order based on the id of the order-product
 * @param {number} orderProductID id of the order-product
 * @return {number} Returns the no.of rows affected
 */
  deleteProductFromOrder(orderProductID: number): Observable<number> {
    return this.http.delete<number>(`${this.commonAPI}deleteProduct/${orderProductID}`);
  }

  /**
 * Update the status of the order
 * @param {Order} order order data to update
 * @return {Order} Returns the Order detail that was updated
 */
  placeOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.commonAPI}status`, order);
  }
}
