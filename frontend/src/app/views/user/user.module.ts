import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {PoliticComponent} from "../../shared/politic/politic.component";


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    PoliticComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
