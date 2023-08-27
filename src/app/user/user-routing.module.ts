import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserChangePasswordComponent} from "./components/user-change-password/user-change-password.component";
import {UserCreationComponent} from "./components/user-creation/user-creation.component";
import {RightGuard} from "../../../util/Guards/rights_guards";
import {AuthGuard} from "../components/login/auth.guard";
import {ChangePasswordGuard} from "./components/user-change-password/change-password.guard";


const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [RightGuard], data: {right:['USER_MANAGEMENT']}},
  { path: 'change-password', component: UserChangePasswordComponent,  canActivate: [ChangePasswordGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'create-user', component: UserCreationComponent, canActivate: [RightGuard], data: {right:['USER_MANAGEMENT']}}

]

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
export class UserRoutingModule { }
