import { Component, OnInit } from '@angular/core';
import { User } from "../../model/user";
import { UserService } from "../../services/user.service";
import { LanguageService } from "../../../services/language.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Role } from "../../../components/permission_management/models/role";
import { Validators, FormControl } from '@angular/forms'; // Import Validators and FormControl

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  editUserId: number | null = null;
  userEditData: { [userId: number]: { [field: string]: FormControl } } = {};


  constructor(
    private userService: UserService,
    private languageService: LanguageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      // Sort the users array
      this.users = users.sort((a, b) => {
        // Place deactivated users at the bottom
        if (a.active === b.active) {
          return 0;
        } else if (a.active) {
          return -1;
        } else {
          return 1;
        }
      });

      // Initialize userEditData based on fetched users' data
      this.users.forEach(user => {
        this.userEditData[user.id] = {
          firstName: new FormControl(user.firstName, [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z\s]*$/)
          ]),
          lastName: new FormControl(user.lastName, [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z\s]*$/)
          ]),
          email: new FormControl(user.email, [
            Validators.required,
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
          ]),
          mobileNumber: new FormControl(user.mobileNumber, [
            Validators.required,
            Validators.pattern(/^(00407\d{8}|07\d{8}|\+407\d{8})$/)
          ])
        };
      });
    });
  }

  editOrSaveUser(user: User): void {
    if (this.editUserId === user.id) {
      this.saveUser(user);
    } else {
      this.editUserId = user.id;
    }
  }

  saveUser(user: User): void {
    const editedUserData = this.userEditData[user.id];

    // Check for invalid fields
    let hasInvalidFields = false;
    const invalidFieldNames = [];

    for (const fieldName in editedUserData) {
      if (editedUserData[fieldName].invalid) {
        hasInvalidFields = true;
        invalidFieldNames.push(fieldName);
      }
    }

    if (hasInvalidFields) {
      console.log('Invalid fields detected.');

      this._snackBar.open('Invalid fields detected. Please correct them.', 'Close', {
        duration: 3000
      });

      // Mark invalid fields as touched
      invalidFieldNames.forEach(fieldName => {
        console.log('Marking field as touched:', fieldName); // Add this line
        editedUserData[fieldName].markAsTouched();
      });
      return;
    }

    console.log('Saving user with ID:', user.id);

    // Extract values from form controls
    const editedUser = {
      firstName: editedUserData['firstName'].value,
      lastName: editedUserData['lastName'].value,
      email: editedUserData['email'].value,
      mobileNumber: editedUserData['mobileNumber'].value
    };

    console.log('Edited user data:', editedUser);

    this.userService.updateUser(user.id, editedUser) // Use editedUser, not editedUserData
      .subscribe(
        (response) => {
          this._snackBar.open(this.getTranslatedMessage("@@userEdited"), this.getTranslatedMessage("@@close"));
          // Update the local data in the users array
          const updatedUserIndex = this.users.findIndex(u => u.id === user.id);
          if (updatedUserIndex !== -1) {
            this.users[updatedUserIndex] = { ...this.users[updatedUserIndex], ...editedUser };
          }
          this.editUserId = null;
        },
        (error) => {
          this._snackBar.open(this.getTranslatedMessage("@@userCannotEdit"), this.getTranslatedMessage("@@close"));
        }
      );
  }

  getRoleNames(roles: Role[]): string {
    return roles.map(role => role.name).join(', ');
  }

  toggleActivation(user: User): void {
    // Toggle the isActive property
    user.active = !user.active;

    // Update the user data in the API
    this.userService.updateUser(user.id, user)
      .subscribe(
        (response) => {
          if (user.active) {
            this._snackBar.open("User successfully activated!", "Close");
          } else {
            this._snackBar.open("User successfully deactivated!", "Close");
          }
        },
        (error) => {
          if (user.active) {
            this._snackBar.open("User could not be activated!", "Close");
          } else {
            this._snackBar.open("User could not be deactivated!", "Close");
          }
          // Revert the change if there was an error
          user.active = !user.active;
        }
      );
  }

  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
