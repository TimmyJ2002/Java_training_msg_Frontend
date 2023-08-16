import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserChangePasswordComponent} from "./components/user-change-password/user-change-password.component";
import {UserCreationComponent} from "./components/user-creation/user-creation.component";


const routes: Routes = [
  { path: 'users', component: UserListComponent},
  // { path: 'users/:id', component: UserDetailsComponent},
  { path: 'change-password', component: UserChangePasswordComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create-user', component: UserCreationComponent}

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
