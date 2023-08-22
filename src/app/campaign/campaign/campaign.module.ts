import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CampaignRoutingModule} from "../campaign-routing.module";
import {CampaignCreateComponent} from "../component/campaign-create/campaign-create.component";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    CampaignCreateComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        CampaignRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
  exports: [
  ]
})
export class CampaignModule { }
