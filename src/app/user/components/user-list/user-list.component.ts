import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  users: User[] = [];
  editUserId: number | null = null;
  userEditData: { [userId: number]: Partial<User> } = {};

  constructor(private userService:UserService,
              private languageService: LanguageService) {
  }
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
    });
  }

  editOrSaveUser(user: User): void {
    if (this.editUserId === user.id) {
      this.saveUser(user);
    } else {
      this.editUserId = user.id;
      // Initialize userEditData with the properties you want to edit
      this.userEditData[user.id] = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber
      };
    }
  }



  saveUser(user: User): void {
    const editedUserData = this.userEditData[user.id];
    console.log('Saving user with ID:', user.id);
    console.log('Edited user data:', editedUserData);

    this.userService.updateUser(user.id, editedUserData)
      .subscribe(
        (response) => {
          console.log('Response:', response);
          // Update the local data in the users array
          const updatedUserIndex = this.users.findIndex(u => u.id === user.id);
          if (updatedUserIndex !== -1) {
            this.users[updatedUserIndex] = { ...this.users[updatedUserIndex], ...editedUserData };
          }
          this.editUserId = null;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }




  toggleActivation(user: User): void {
    // Toggle the isActive property
    user.active = !user.active;

    // Update the user data in the API
    this.userService.updateUser(user.id, user)
      .subscribe(
        (response) => {
          console.log('Response:', response);
        },
        (error) => {
          console.error('Error:', error);
          // Revert the change if there was an error
          user.active = !user.active;
        }
      );
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }

}
