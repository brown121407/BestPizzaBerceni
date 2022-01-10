import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import {MatCardModule} from "@angular/material/card";
import { ProductAddComponent } from './components/product-add/product-add.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import { ProductUpdateComponent } from './components/product-update/product-update/product-update.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ProductVariantAddComponent } from './components/product-variant-add/product-variant-add.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    ProductVariantAddComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ]
})
export class ProductsModule { }
