import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { userComponent } from "./components/user/user.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { AddressAddComponent } from './components/address-add/address-add.component';
import { AddressUpdateComponent } from './components/address-update/address-update.component';
import { FullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  declarations: [
    userComponent,
    UserUpdateComponent,
    AddressAddComponent,
    AddressUpdateComponent,
    FullNamePipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule
  ]
})
export class UsersModule { }
