
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignCreateComponent} from "./component/campaign-create/campaign-create.component";
import {CommonModule} from "@angular/common";
import {CampaignEditComponent} from "./component/campaign-edit/campaign-edit.component";
import {CampaignDeleteComponent} from "./component/campaign-delete/campaign-delete.component";
import {CampaignReportingComponent} from "./campaign-reporting/campaign-reporting.component";

export const routes: Routes = [
  { path: 'campaign-reporting', component: CampaignReportingComponent},
  {path: 'create', component: CampaignCreateComponent},
  {path: 'update', component: CampaignEditComponent},
  {path: 'delete', component: CampaignDeleteComponent}
];

// @NgModule({
// import {RouterModule, Routes} from "@angular/router";
// import {CampaignReportingComponent} from "./campaign-reporting/campaign-reporting.component";
// import {NgModule} from "@angular/core";
// import {CommonModule} from "@angular/common";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class CampaignRoutingModule { }
