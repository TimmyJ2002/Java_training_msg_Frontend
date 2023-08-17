import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {CreateDonatorComponent} from "./donator/components/createDonator/createdonator.component";
import {DonatorListComponent} from './donator/components/donator-list/donator-list.component';
import {LogoutComponent} from './components/logout/logout.component';
// import { UserDetailsComponent } from './user/components/user-details/user-details.component';
import {
  PermissionManagementComponent
} from './components/permission_management/components/permission-management/permission-management.component';
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {DonationReportingComponent} from './donation/donation-reporting/donation-reporting.component';
import {UserModule} from "./user/user/user.module";
import {DonatorModule} from "./donator/donator.module";
import {
  PermissionManagementModule
} from "./components/permission_management/permission-management/permission-management.module";
import {DonationModule} from "./donation/donation/donation.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PermissionManagementComponent,
    CreateDonatorComponent,
    LogoutComponent,
    DonationReportingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    DonatorModule,
    DonationModule,
    PermissionManagementModule,
    BrowserAnimationsModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
