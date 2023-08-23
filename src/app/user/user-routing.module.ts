import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserChangePasswordComponent} from "./components/user-change-password/user-change-password.component";
import {UserCreationComponent} from "./components/user-creation/user-creation.component";
import {RightGuard} from "../../../util/Guards/rights_guards";


const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [RightGuard], data: {right:['USER_MANAGEMENT']}},
  // { path: 'users/:id', component: UserDetailsComponent},
  { path: 'change-password', component: UserChangePasswordComponent},
  { path: 'login', component: LoginComponent},
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
