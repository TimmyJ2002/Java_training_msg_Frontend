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
    console.log(credentials)
    this.authService.login(credentials).subscribe(
      (response) => {
        const accessToken = response.accessToken;
        if (accessToken) {
          this.authService.saveAccessToken(accessToken);
          console.log('Access Token:', accessToken);
          this.loginForm.reset();
          this.showPopup = true;
        }
        this.router.navigate(['/donation-reporting'])
      },
      (error) => {
        console.log(error)
        if (error.error.message == "Account is inactive"){
          this._snackBar.open('Account is inactive', this.getTranslatedMessage("@@close"), {duration: 3000});
        } else if (error.error.message == 'Your account has been deactivated') {
          this._snackBar.open('Your account has been deactivated, because you entered the wrong password for 5 times', this.getTranslatedMessage("@@close"), {duration: 3000});
        } else {
          this._snackBar.open('Wrong username or password', this.getTranslatedMessage("@@close"), {duration: 3000})
        }
      }
    );
  }
  ngOnInit(): void {
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }

}
