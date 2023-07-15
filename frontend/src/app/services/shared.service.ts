import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  cartCount: number = 0;
  categoryFilter: string = '';
  cartCountChange: Subject<number> = new Subject<number>();

  /**
   * @constructor
   * Checks for cart count changes
   */
  constructor() {
    this.cartCountChange.subscribe((value) => {
      this.cartCount = value;
    });
  }

  /**
   * Updates the cart count to be displayed in the header - cart icon
   * @returns void
   */
  setCartCount(increase: boolean): void {
    let newVal = increase ? this.cartCount + 1 : this.cartCount - 1;
    this.cartCountChange.next(newVal);
  }
}
