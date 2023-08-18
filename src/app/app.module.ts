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
import {CampaignEditComponent} from "./campaign/component/campaign-edit/campaign-edit.component";
import {CampaignDeleteComponent} from "./campaign/component/campaign-delete/campaign-delete.component";
import {CampaignRoutingModule} from "./campaign/campaign-routing.module";
import {CampaignCreateComponent} from "./campaign/component/campaign-create/campaign-create.component";
import {UserListComponent} from "./user/components/user-list/user-list.component";
import {CampaignRoutingModule} from "./campaign/campaign-routing.module";
import {CampaignReportingComponent} from "./campaign/campaign-reporting/campaign-reporting.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PermissionManagementComponent,
    CreateDonatorComponent,
    LogoutComponent,
    DonationReportingComponent,
    CampaignEditComponent,
    CampaignDeleteComponent
    CampaignReportingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    DonatorModule,
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
