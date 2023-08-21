import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DonationReportingComponent} from "./donation-reporting/donation-reporting.component";
import {DonationComponent} from "./components/donation/donation.component";
import {EditDonationComponent} from "./components/edit-donation/edit-donation.component";


const routes: Routes = [
  { path: 'donation-reporting', component: DonationReportingComponent},
  { path: 'donation/addDonation', component: DonationComponent},
  { path: 'donation/updateDonation', component: EditDonationComponent}
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
