import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import {CartComponent} from "./components/cart/cart.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { OrderComponent } from './components/order/order.component';
import { OrderRoutingModule } from "./order-routing.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { CartItemPricePipe } from './pipes/cart-item-price.pipe';
import { OrderItemPricePipe } from './pipes/order-item-price.pipe';

@NgModule({
  declarations: [
    CartComponent,
    OrderListComponent,
    OrderComponent,
    CartItemPricePipe,
    OrderItemPricePipe
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        MatFormFieldModule,
        MatCardModule,
        FormsModule,
        MatChipsModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatRadioModule
    ],
  exports: [
    CartComponent,
    OrderListComponent
  ]
})
export class OrderModule { }
