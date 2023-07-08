import { Injectable } from '@angular/core';
import { OrderProduct } from '../helpers/orderProduct';

@Injectable({
  providedIn: 'root'
})
export class SharedService{
  cart: OrderProduct[] = [];
  categoryFilter: string = "";

  constructor() { }

  addProduct(product: OrderProduct){
    this.cart.push(product);
  }

}
