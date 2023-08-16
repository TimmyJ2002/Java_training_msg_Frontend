import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DonatorListComponent} from "./components/donator-list/donator-list.component";
import {EditDonatorComponent} from "./components/edit-donator/edit-donator.component";

export const donorRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DonatorListComponent },
      { path: 'edit', component: EditDonatorComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(donorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DonatorRoutingModule { }
