import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HttpClientModule } from "@angular/common/http";
import { AccountRoutingModule } from "./account-routing.module";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { JwtModule } from "@auth0/angular-jwt";
import { AppModule, tokenGetter } from "../../app.module";
import { ErrorDirective } from "./directives/error.directive";
import { UiModule } from "../ui/ui.module";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ErrorDirective
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    UiModule,
  ],
  exports: [
    ErrorDirective
  ]
})
export class AccountModule { }
