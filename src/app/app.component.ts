import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {LanguageService} from "./services/language.service";
import {Subscription} from "rxjs";
import {TranslateService} from '@ngx-translate/core';
import {translate} from "@angular/localize/tools";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'untitled';
  isLoggedIn: boolean = false;
  selectedLanguage: string = 'ro';
  languages = [
    { value: 'en', viewValue: 'English' },
    { value: 'ro', viewValue: 'Romanian' }
  ];
  rightsList: string[] = [];
  constructor(
    public authService: AuthService,
    private router: Router,
    private languageService: LanguageService, // Inject LanguageService
  ) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.isLoggedIn = false;
        console.log('Logged out successfully');
        this.authService.clearAccessToken();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error logging out:', error);
      }
    );
  }

  hasPermission(requiredPermissions: string[]) {
    this.getPermission();
    return (requiredPermissions).some((right) => this.rightsList.includes(right))
  }

  ngOnInit(): void {
    this.switchLanguage('en');
  }

  getPermission(): void {
    jwtDecode(sessionStorage.getItem("accessToken")!);
    let token = jwtDecode<{sub: string, permissions: string[]}>(sessionStorage.getItem("accessToken")!)
    this.rightsList = token.permissions;
  }

  switchLanguage(language: string) {
    console.log(this.languageService);
    this.languageService.setLanguage(language);
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }

}
