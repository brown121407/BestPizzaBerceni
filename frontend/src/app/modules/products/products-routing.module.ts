import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import {ProductAddComponent} from "./components/product-add/product-add.component";

const routes: Routes = [
  {
    path: 'list',
    component: ProductsComponent,
  },
  {
    path: 'new',
    component: ProductAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
