import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  userList: User[] = [];

  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
    this.userService.getUsers().subscribe((users) => this.userList = users);
  }
/*
  editUser(userToEdit: User) {
    userToEdit.username = ((userToEdit.username) + 1).toString();

    this.userService.updateUser(userToEdit).subscribe(
      (updatedUser: User) => {
        console.log('User updated:', updatedUser);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }*/
}
