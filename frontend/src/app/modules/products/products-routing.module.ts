import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {IngredientUpdateComponent} from "../ingredients/components/ingredient-update/ingredient-update.component";
import {ProductUpdateComponent} from "./components/product-update/product-update/product-update.component";
import {ProductVariantAddComponent} from "./components/product-variant-add/product-variant-add.component";

const routes: Routes = [
  { path: 'list',
    component: ProductsComponent
  },
  { path: 'new',
    component: ProductAddComponent
  },
  { path: ':id',
    component: ProductUpdateComponent
  },
  { path:':idProd/variants/new',
    component: ProductVariantAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
