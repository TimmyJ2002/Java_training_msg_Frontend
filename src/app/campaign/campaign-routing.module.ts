import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignCreateComponent} from "./component/campaign-create/campaign-create.component";
import {CommonModule} from "@angular/common";
import {CampaignEditComponent} from "./component/campaign-edit/campaign-edit.component";
import {CampaignDeleteComponent} from "./component/campaign-delete/campaign-delete.component";
import {CampaignReportingComponent} from "./campaign-reporting/campaign-reporting.component";
import {CampaignEditListComponent} from "./component/campaign-edit-list/campaign-edit-list.component";
import {RightGuard} from "../../../util/Guards/rights_guards";

export const routes: Routes = [
  {path: 'campaign-reporting', component: CampaignReportingComponent},
  {path: 'campaign/create', component: CampaignCreateComponent, canActivate: [RightGuard], data: {right:['CAMP_MANAGEMENT']}},
  {path: 'campaign/update/:id', component: CampaignEditComponent, canActivate: [RightGuard], data: {right:['CAMP_MANAGEMENT']}},
  {path: 'campaign/delete', component: CampaignDeleteComponent, canActivate: [RightGuard], data: {right:['CAMP_MANAGEMENT']}},
  {path: 'campaign/list', component: CampaignEditListComponent, canActivate: [RightGuard], data: {right:['CAMP_MANAGEMENT']}},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CampaignRoutingModule { }
