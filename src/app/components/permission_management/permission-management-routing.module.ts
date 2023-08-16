import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermissionManagementComponent} from "./components/permission-management/permission-management.component";
import {RouterModule, Routes} from "@angular/router";
import {RightGuard} from "../../../../util/Guards/rights_guards";

const routes: Routes = [
  //{ path: 'rights', component: PermissionManagementComponent, canActivate: [RightGuard], data: {right:'PERMISSION_MANAGEMENT'}}
  { path: 'rights', component: PermissionManagementComponent}
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
export class PermissionManagementRoutingModule { }
