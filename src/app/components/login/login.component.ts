import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LanguageService} from "../../services/language.service";
import {AppComponent} from "../../app.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  showPopup: boolean = false;
  pulseAnimation: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private languageService: LanguageService,
              private _snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response) => {
        const accessToken = response.accessToken;
        if (accessToken) {
          this.authService.saveAccessToken(accessToken);
          console.log('Access Token:', accessToken);
          this.loginForm.reset();
          this.showPopup = true;
        }
      },
      (error) => {
        this._snackBar.open('Wrong username or password', 'Close');
      }
    );
  }

  hidePopup() {
    this.showPopup = false;
    this.router.navigate(['/donation-reporting']);
  }
  ngOnInit(): void {
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }

}
