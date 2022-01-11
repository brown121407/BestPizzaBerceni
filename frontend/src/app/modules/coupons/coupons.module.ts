import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponsListComponent } from './components/coupons-list/coupons-list.component';
import { NewCouponComponent } from './components/new-coupon/new-coupon.component';
import { UpdateCouponComponent } from './components/update-coupon/update-coupon.component';
import { CouponsRoutingModule } from "./coupons-routing.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    CouponsListComponent,
    NewCouponComponent,
    UpdateCouponComponent
  ],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    MatButtonModule
  ]
})
export class CouponsModule { }
