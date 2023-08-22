import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignCreateComponent} from "./component/campaign-create/campaign-create.component";
import {CommonModule} from "@angular/common";
import {CampaignEditComponent} from "./component/campaign-edit/campaign-edit.component";
import {CampaignDeleteComponent} from "./component/campaign-delete/campaign-delete.component";
import {CampaignReportingComponent} from "./campaign-reporting/campaign-reporting.component";
import {CampaignEditListComponent} from "./component/campaign-edit-list/campaign-edit-list.component";

export const routes: Routes = [
  { path: 'campaign-reporting', component: CampaignReportingComponent},
  {path: 'campaign/create', component: CampaignCreateComponent},
  {path: 'campaign/update/:id', component: CampaignEditComponent},
  {path: 'campaign/delete', component: CampaignDeleteComponent},
  {path: 'campaign/list', component: CampaignEditListComponent},

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
