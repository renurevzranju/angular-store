import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';

import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatTableModule,
    MatRadioModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
