import { Component, Input } from '@angular/core';
import { OrderProduct } from 'src/app/helpers/orderProduct';
import { Product } from 'src/app/helpers/product';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(public sharedService: SharedService,
    private toastr: ToastrService) { }

  addToCart(item: Product): void {
    let product: OrderProduct = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageCode: item.imageCode,
      total : item.price * 1
    }
    this.sharedService.addProduct(product);
    this.toastr.success('Successfully added to your Cart', product.name);
  }
}
