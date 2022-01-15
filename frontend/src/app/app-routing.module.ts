import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IngredientComponent} from "./modules/ingredients/components/ingredient/ingredient.component";
import {IngredientPageComponent} from "./modules/ingredients/components/ingredient-page/ingredient-page.component";
import {IngredientUpdateComponent} from "./modules/ingredients/components/ingredient-update/ingredient-update.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RefreshComponent } from "./components/refresh/refresh.component";
import { AuthGuard } from "./modules/account/guards/auth.guard";
import { PNFComponent } from "./modules/errors/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ingredients',
    loadChildren: () => import('./modules/ingredients/ingredients.module').then(m => m.IngredientsModule),
    canActivate: [AuthGuard]
  },
  { path: 'products',
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
  },
  { path: 'variants',
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'coupons',
    loadChildren: () => import('./modules/coupons/coupons.module').then(m => m.CouponsModule),
    canActivate: [AuthGuard]
  },
  { path: 'refresh', component: RefreshComponent },
  { path: 'products',
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: '**', pathMatch: 'full',
    component: PNFComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
