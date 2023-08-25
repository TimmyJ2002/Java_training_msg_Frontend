import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // User is logged in, prevent navigation to the login page
      this.router.navigate(['/donation-reporting']); // Redirect to a different
      return false;
    }
    return true; // User is not logged in, allow navigation to the login page
  }
}
