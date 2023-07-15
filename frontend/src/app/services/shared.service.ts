import { Injectable } from '@angular/core';
import { OrderProduct } from '../helpers/orderProduct';
import { User } from '../helpers/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService{
  cartCount: number = 0;
  categoryFilter: string = "";
  userData: User = {
    id: 0,
    user_name: '',
    email: ''
  };
  cartValue: number = 0;

  cartCountChange: Subject<number> = new Subject<number>();

  constructor() {
    this.cartCountChange.subscribe((value) => {
      this.cartCount = value;
  });
  }

  setUserData(data: string){
    if(data){
      var user = JSON.parse(data);
      this.userData = {
        id: user.id,
        user_name:  user.name,
        email: user.email
      }
    }
  }

  setCartCount(increase: boolean){
    let newVal = increase ? this.cartCount+1: this.cartCount-1;
    this.cartCountChange.next(newVal);
  }

  setCartValue(value: number){
    this.cartValue = value;
  }

}
