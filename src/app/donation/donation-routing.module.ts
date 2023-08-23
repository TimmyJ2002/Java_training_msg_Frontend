import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DonationReportingComponent} from "./donation-reporting/donation-reporting.component";
import {DonationComponent} from "./components/donation/donation.component";
import {EditDonationComponent} from "./components/edit-donation/edit-donation.component";
import {RightGuard} from "../../../util/Guards/rights_guards";


const routes: Routes = [
  { path: 'donation-reporting', component: DonationReportingComponent, canActivate: [RightGuard], data: {right:['DONATION_REPORTING', 'DONATION_APPROVE', 'DONATION_MANAGEMENT']}},
  { path: 'donation/addDonation', component: DonationComponent, canActivate: [RightGuard], data: {right:['DONATION_MANAGEMENT']}},
  { path: 'donation/updateDonation', component: EditDonationComponent, canActivate: [RightGuard], data: {right:['DONATION_MANAGEMENT']}}
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
export class DonationRoutingModule { }
