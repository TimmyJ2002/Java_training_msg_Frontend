import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit{

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.changePasswordForm = this.fb.group({
      password: [''],
      passwordConfirm: ['']
    });
  }

  onSubmit() {
    const newPassword = this.changePasswordForm.value.password;
    const passwordConfirm = this.changePasswordForm.value.passwordConfirm;
    const userId = 1; // Replace with the actual user's ID

    if (newPassword !== passwordConfirm) {
      // Passwords don't match, show error or handle accordingly
      alert("Passwords don't match!");
      return;
    }

    this.authService.changePassword(userId, newPassword).subscribe(
      (response) => {
        console.log('Password changed successfully:', response.message);

        // Update the login count
        this.authService.updateUserLoginCount(userId, 0).subscribe(
          () => {
            console.log('Login count updated successfully');
            // Handle the successful login count update if needed
          },
          (error) => {
            console.error('Error updating login count:', error);
            // Handle error if needed
          }
        );

        // Handle success (e.g., show a success message, navigate to a new page, etc.)
      },
      (error) => {
        console.error('Error changing password:', error);
        // Handle error (e.g., show an error message, handle specific errors, etc.)
      }
    );
  }


  ngOnInit(): void {
  }

}
