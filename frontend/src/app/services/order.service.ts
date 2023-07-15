import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderProduct } from '../helpers/orderProduct';
import { Order } from '../helpers/order';
import { environment as env } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  commonAPI: string = `${env.endpointURI}api/orders/`;

  constructor(private http: HttpClient) { }

  getActiveOrderDetailsForUser(user_id: number): Observable<Order>{
    return this.http.get<Order>(this.commonAPI + "getOrderByStatus/" + user_id + "/active");
  }

  createOrder(user_id: number, product: OrderProduct): Observable<Order>{
    const body = {
      status: "active",
      products: [
        {
          product_id: product.product_id,
          quantity: product.quantity
        }
      ]
    }
    return this.http.post<Order>(this.commonAPI + "create/"+ user_id , body).pipe(
      map(response => {
        console.log(response);
        return response as Order;
      })
    );
  }

  addProduct(product: OrderProduct): Observable<OrderProduct> {
    const body = {
      order_id: product.order_id,
      product_id: product.product_id,
      quantity: product.quantity
    }
    return this.http.post<OrderProduct>(this.commonAPI + "addProduct", body).pipe(
      map(response => {
        return response;
      })
    );
  }

  checkIfProductAlreadyExists(product: OrderProduct): Observable<OrderProduct> {
    return this.http.get<OrderProduct>(this.commonAPI + "product/"+ product.order_id + "/"+ product.product_id);
  }

  updateProductQuantity(product: OrderProduct): Observable<OrderProduct>{
    const {id, quantity} = product;
    return this.http.put<OrderProduct>(this.commonAPI + "updateQuantity", {id, quantity} )
  }

  getAllProducts(orderID: number): Observable<OrderProduct[]>{
    return this.http.get<OrderProduct[]>(this.commonAPI + "cart/"+ orderID);
  }

  deleteProductFromOrder(orderProductID: number): Observable<number>{
    return this.http.delete<number>(this.commonAPI + "deleteProduct/" + orderProductID);
  }

  placeOrder(order: Order): Observable<Order>{
    return this.http.put<Order>(this.commonAPI + "status", order);
  }
}
