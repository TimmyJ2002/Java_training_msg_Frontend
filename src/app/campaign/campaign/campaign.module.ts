import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CampaignRoutingModule} from "../campaign-routing.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CampaignRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class CampaignModule { }
