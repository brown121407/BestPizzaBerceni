import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from "./components/cart/cart.component";
import { OrderListComponent } from "./components/order-list/order-list.component";
import { OrderComponent } from "./components/order/order.component";
import { CustomerGuard } from "../account/guards/customer.guard";
import { AdminGuard } from "../account/guards/admin.guard";

const routes: Routes = [
  {
    path: 'list',
    component: OrderListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [CustomerGuard]
  },
  {
    path: ':id',
    component: OrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
