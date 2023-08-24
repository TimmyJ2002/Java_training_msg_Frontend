import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DonatorRoutingModule} from "./donator-routing.module";
import {EditDonatorComponent} from "./components/edit-donator/edit-donator.component";
import {DonatorListComponent} from "./components/donator-list/donator-list.component";
import {DeleteDonatorComponent} from "./components/delete-donator/delete-donator.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    EditDonatorComponent,
    DonatorListComponent,
    DeleteDonatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DonatorRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports: [DonatorRoutingModule]
})
export class DonatorModule {
}
