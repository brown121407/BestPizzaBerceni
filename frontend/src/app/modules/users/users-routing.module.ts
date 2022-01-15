import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userComponent} from "./components/user/user.component";
import {UserUpdateComponent} from "./components/user-update/user-update.component";
import {AddressAddComponent} from "./components/address-add/address-add.component";
import {AddressUpdateComponent} from "./components/address-update/address-update.component";

const routes: Routes = [
  { path: 'list', component: userComponent},
  { path: ':id', component: UserUpdateComponent},
  { path: ':idUser/address/new', component: AddressAddComponent},
  { path: ':idUser/address/:idAddress', component: AddressUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
