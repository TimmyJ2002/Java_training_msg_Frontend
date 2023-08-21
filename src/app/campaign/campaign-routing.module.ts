import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignCreateComponent} from "./component/campaign-create/campaign-create.component";
import {CommonModule} from "@angular/common";
import {CampaignEditComponent} from "./component/campaign-edit/campaign-edit.component";
import {CampaignDeleteComponent} from "./component/campaign-delete/campaign-delete.component";
import {CampaignEditListComponent} from "./component/campaign-edit-list/campaign-edit-list.component";

const routes: Routes = [
  {path: 'create', component: CampaignCreateComponent},
  {path: 'update/:id', component: CampaignEditComponent},
  {path: 'delete', component: CampaignDeleteComponent},
  {path: 'list', component: CampaignEditListComponent},

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
