import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {MenuComponent} from "./components/menu/menu.component";
import {AuthGuard} from "./guards/auth.guard";
import {RefreshComponent} from "./components/refresh/refresh.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'refresh', component: RefreshComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
