import { Injectable } from '@angular/core';
import { OrderProduct } from '../helpers/orderProduct';
import { User } from '../helpers/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService{
  cart: OrderProduct[] = [];
  categoryFilter: string = "";
  userData: User = {
    id: 0,
    user_name: '',
    email: ''
  };
  accessToken: string = "";

  constructor() { }

  addProduct(product: OrderProduct){
    this.cart.push(product);
  }

  setUserData(data: string){
    if(data){
      var user = JSON.parse(data);
      this.userData = {
        user_name:  user.name,
        email: user.email
      }
    }
  }

}
