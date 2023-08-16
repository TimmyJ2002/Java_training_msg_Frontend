import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
// import {PermissionManagementRoutingModule} from "./components/permission_management/permission-management-routing.module";
import {CreateDonatorComponent} from "./donator/components/createDonator/createdonator.component";
import {DonatorListComponent} from "./donator/components/donator-list/donator-list.component";
import {EditDonatorComponent} from "./donator/components/edit-donator/edit-donator.component";
import {
  PermissionManagementRoutingModule
} from "./components/permission_management/permission-management-routing.module";
import {DonationRoutingModule} from "./donation/donation-routing.module";
import {UserCreationComponent} from "./user/components/user-creation/user-creation.component";
// import {DonationRoutingModule} from "./donation/donation-routing.module";


const routes: Routes = [
  { path: 'donator/create', component: CreateDonatorComponent },
  { path: 'donator/edit', component: DonatorListComponent },
  { path: 'donator/edit/:id', component: EditDonatorComponent,  },
  { path: 'donator/delete', component: CreateDonatorComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: '**', redirectTo: 'login', pathMatch: 'full'}
  { path: 'create-user', component: UserCreationComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PermissionManagementRoutingModule,
    DonationRoutingModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
