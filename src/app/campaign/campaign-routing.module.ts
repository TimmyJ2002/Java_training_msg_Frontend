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
