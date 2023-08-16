import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppModule} from "../app.module";
import {DonatorRoutingModule} from "./donator-routing.module";
import {CreateDonatorComponent} from "./components/createDonator/createdonator.component";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DonatorRoutingModule,
    ReactiveFormsModule,
    AppModule,
  ],
  exports: [
  ]
})
export class DonatorModule { }
