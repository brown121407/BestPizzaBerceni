import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientComponent } from "./components/ingredient/ingredient.component";
import { IngredientPageComponent } from "./components/ingredient-page/ingredient-page.component";
import { IngredientUpdateComponent } from "./components/ingredient-update/ingredient-update.component";
import { ManagerGuard } from "../account/guards/manager.guard";
import { StoreEmployeeGuard } from "../account/guards/store-employee.guard";

const routes: Routes = [
  { path: 'list', component: IngredientComponent, canActivate: [StoreEmployeeGuard] },
  { path: 'new', component: IngredientPageComponent, canActivate: [ManagerGuard] },
  { path: ':id', component: IngredientUpdateComponent, canActivate: [ManagerGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule { }
