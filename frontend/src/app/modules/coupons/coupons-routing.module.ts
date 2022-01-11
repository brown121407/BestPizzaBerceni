import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponsListComponent } from "./components/coupons-list/coupons-list.component";
import { NewCouponComponent } from "./components/new-coupon/new-coupon.component";
import { UpdateCouponComponent } from "./components/update-coupon/update-coupon.component";
import { CustomerGuard } from "../account/guards/customer.guard";
import { ManagerGuard } from "../account/guards/manager.guard";

const routes: Routes = [
  {
    path: 'list',
    component: CouponsListComponent,
    canActivate: [CustomerGuard, ManagerGuard]
  },
  {
    path: 'new',
    component: NewCouponComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: ':id',
    component: UpdateCouponComponent,
    canActivate: [ManagerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
