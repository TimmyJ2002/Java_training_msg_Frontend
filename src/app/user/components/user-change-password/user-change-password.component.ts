import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit{

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private languageService: LanguageService) {
    this.changePasswordForm = this.fb.group({
      password: [''],
      passwordConfirm: ['']
    });
  }

  onSubmit() {
    const newPassword = this.changePasswordForm.value.password;
    const passwordConfirm = this.changePasswordForm.value.passwordConfirm;

    if (newPassword !== passwordConfirm) {
      // Passwords don't match, show error or handle accordingly
      alert(this.getTranslatedMessage("@@passNoMatch"));
      return;
    }

    this.authService.changePassword(newPassword).subscribe(
      (response) => {
       // console.log('Password changed successfully:', response.message);

        // Update the login count
        this.authService.updateUserLoginCount(0).subscribe(
          () => {
           // console.log('Login count updated successfully');
            this.router.navigate(['/users']);
          },
          (error) => {
            console.error('Error updating login count:', error);
            alert("Error updating logincount ");
          }
        );
        alert(this.getTranslatedMessage("@@passEditSuccessfully"));
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error changing password:', error);
        alert(this.getTranslatedMessage("@@passCannotEdit"));
      }
    );
  }


  ngOnInit(): void {
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
