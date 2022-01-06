import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {MenuComponent} from "./components/menu/menu.component";
import {AuthGuard} from "./guards/auth.guard";
import {RefreshComponent} from "./components/refresh/refresh.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {CartComponent} from "./components/cart/cart.component";
import {IngredientComponent} from "./components/ingredient/ingredient.component";
import {IngredientPageComponent} from "./components/ingredient-page/ingredient-page.component";
import {IngredientUpdateComponent} from "./components/ingredient-update/ingredient-update.component";

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'refresh', component: RefreshComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'ingredient', component: IngredientComponent},
  { path: 'ingredient-page', component: IngredientPageComponent },
  { path: 'ingredient-update/:id', component: IngredientUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
