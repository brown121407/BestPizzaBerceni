import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientComponent } from "./components/ingredient/ingredient.component";
import { IngredientPageComponent } from "./components/ingredient-page/ingredient-page.component";
import { IngredientUpdateComponent } from "./components/ingredient-update/ingredient-update.component";

const routes: Routes = [
  { path: 'list', component: IngredientComponent},
  { path: 'new', component: IngredientPageComponent },
  { path: ':id', component: IngredientUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule { }
