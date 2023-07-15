import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderProduct } from 'src/app/helpers/orderProduct';
import { Product } from 'src/app/helpers/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  constructor() { }

  /**
 * On click of the Cart icon, product data is emitted to the parent component to display success message
 * @returns void Returns nothing
 */
  addProductToCart(item: Product) {
    const orderID = localStorage.getItem('orderID');
    const product: OrderProduct = {
      order_id: orderID ? Number(orderID) : 0,
      product_id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imagecode: item.imagecode,
      total: item.price * 1
    }
    this.addToCart.emit(product);
  }
}
