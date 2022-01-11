import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponsListComponent } from './components/coupons-list/coupons-list.component';
import { NewCouponComponent } from './components/new-coupon/new-coupon.component';
import { UpdateCouponComponent } from './components/update-coupon/update-coupon.component';
import { CouponsRoutingModule } from "./coupons-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    CouponsListComponent,
    NewCouponComponent,
    UpdateCouponComponent
  ],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ]
})
export class CouponsModule { }
