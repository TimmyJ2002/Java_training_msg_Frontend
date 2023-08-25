import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  template: `
    <button (click)="logout()">Logout</button>
  `
})
export class LogoutComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe(
      (response) => {
       // console.log('Logged out successfully', response);
        this.authService.clearAccessToken();
      },
      (error) => {
        console.error('Error logging out:', error);
      }
    );
  }
}
