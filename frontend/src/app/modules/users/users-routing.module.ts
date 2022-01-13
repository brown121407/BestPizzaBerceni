import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userComponent} from "./components/user/user.component";
import {UserUpdateComponent} from "./components/user-update/user-update.component";

const routes: Routes = [
  { path: 'list', component: userComponent},
  { path: ':id', component: UserUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
