import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientComponent } from "./components/ingredient/ingredient.component";
import { IngredientPageComponent } from "./components/ingredient-page/ingredient-page.component";
import { IngredientUpdateComponent } from "./components/ingredient-update/ingredient-update.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";


@NgModule({
  declarations: [
    IngredientComponent,
    IngredientPageComponent,
    IngredientUpdateComponent
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule
  ]
})
export class IngredientsModule { }
