import { Component, OnInit } from '@angular/core';
import { OrderProduct } from 'src/app/helpers/orderProduct';

const ELEMENT_DATA: OrderProduct[] = [
  {id: 1, name: 'Hydrogen', price: 1.0079, quantity: 2, total: 1 * 2, imageCode: "1"},
  {id: 2, name: 'Helium', price: 4.0026, quantity: 1, total: 4 * 1, imageCode: "2"},
  {id: 3, name: 'Lithium', price: 6.941, quantity: 3, total: 6 * 3, imageCode: "3"},
  {id: 4, name: 'Beryllium', price: 9.0122, quantity: 1, total: 9 * 1, imageCode: "4"},
  {id: 5, name: 'Boron', price: 10.811, quantity: 2, total: 10 * 2, imageCode: "5"},
];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart = [];
  isCartEmpty: boolean = false;
  displayedColumns: string[] = ['id', "imageCode", 'name', 'price', 'quantity', "total"];
  dataSource = ELEMENT_DATA;
  constructor(){}

  ngOnInit(){
    this.cart = [];
  }
}
