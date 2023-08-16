import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListComponent} from "../components/user-list/user-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserRoutingModule} from "../user-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {UserCreationComponent} from "../components/user-creation/user-creation.component";
import {UserChangePasswordComponent} from "../components/user-change-password/user-change-password.component";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";




@NgModule({
  declarations: [
    UserListComponent,
    UserCreationComponent,
    UserChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [
    UserRoutingModule
  ]
})
export class UserModule { }
