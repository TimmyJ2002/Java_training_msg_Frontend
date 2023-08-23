import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CreateDonatorComponent} from "./donator/components/createDonator/createdonator.component";
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
import {CampaignEditComponent} from "./campaign/component/campaign-edit/campaign-edit.component";
import {CampaignDeleteComponent} from "./campaign/component/campaign-delete/campaign-delete.component";
import {CampaignReportingComponent} from "./campaign/campaign-reporting/campaign-reporting.component";
import {CampaignCreateComponent} from "./campaign/component/campaign-create/campaign-create.component";
import {Interceptor} from "../../util/interceptors/interceptor";
import { EditDonationComponent } from './donation/components/edit-donation/edit-donation.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { CampaignEditListComponent } from './campaign/component/campaign-edit-list/campaign-edit-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {NotificationModule} from "./notification/notification.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PermissionManagementComponent,
    CreateDonatorComponent,
    LogoutComponent,
    DonationReportingComponent,
    CampaignEditComponent,
    CampaignDeleteComponent,
    CampaignEditListComponent,
    CampaignCreateComponent,
    EditDonationComponent,
    CampaignReportingComponent,
    CampaignCreateComponent,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    NotificationModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
