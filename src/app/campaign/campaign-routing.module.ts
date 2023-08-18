
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignCreateComponent} from "./component/campaign-create/campaign-create.component";
import {CommonModule} from "@angular/common";
import {CampaignEditComponent} from "./component/campaign-edit/campaign-edit.component";
import {CampaignDeleteComponent} from "./component/campaign-delete/campaign-delete.component";

const routes: Routes = [
  {path: 'create', component: CampaignCreateComponent},
  {path: 'update', component: CampaignEditComponent},
  {path: 'delete', component: CampaignDeleteComponent}
];

@NgModule({
import {RouterModule, Routes} from "@angular/router";
import {CampaignReportingComponent} from "./campaign-reporting/campaign-reporting.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";


const routes: Routes = [
  { path: 'campaign-reporting', component: CampaignReportingComponent}
];

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
