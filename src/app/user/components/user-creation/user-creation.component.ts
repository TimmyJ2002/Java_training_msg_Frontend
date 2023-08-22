import {Component, OnInit} from '@angular/core';

import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {
  FormBuilder, FormControl,
  FormGroup, FormGroupDirective, NgForm,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from "@angular/material/core";
import {Role} from "../../../components/permission_management/models/role";
import {
  PermissionManagementService
} from "../../../components/permission_management/services/permission-management.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css'],

})
export class UserCreationComponent implements OnInit {
    userForm!: FormGroup;
    errorMessage: any;
    successMessage: any;
    rolesList: Role[] = [];
    roles: string[] = [];
    isCreatingUser =  false;


    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private permissionManagementService: PermissionManagementService
    ) {
    }

    ngOnInit(): void {
        this.initUserForm();
        this.permissionManagementService.loadRoles().subscribe((role) => {
            this.rolesList = role;
            // console.log(this.rolesList); //temporary
            this.userForm.get('roles')?.valueChanges.subscribe((roles: string[]) => {
                this.roles = roles;
            });
        });
    }




  private initUserForm(): void {
        this.userForm = this.formBuilder.group({
            firstName: ['', [
                Validators.required,
                Validators.maxLength(50), // Change the length limit as needed
                Validators.pattern(/^[a-zA-Z\s]*$/) // Allows only alphabetic characters and spaces
            ]],
            lastName: ['', [
                Validators.required,
                Validators.maxLength(50), // Change the length limit as needed
                Validators.pattern(/^[a-zA-Z\s]*$/) // Allows only alphabetic characters and spaces
            ]],
            email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            mobileNumber: ['', [Validators.required, Validators.pattern(/^(00407\d{8}|07\d{8}|\+407\d{8})$/)]],

            roles: [[], [Validators.required, Validators.minLength(1)]]
        });
    }

    onSubmit(): void {

        if (this.userForm.invalid) {
            return;
        }
        this.isCreatingUser = true;
        this.successMessage = "";
        this.errorMessage = "";

        const user: User = this.userForm.value;


        this.userService.createUser(user).subscribe(
            () => {
                console.log('User created successfully');
                this.successMessage = 'User created successfully! ' + "User with username: " + +"was created";

                this.userForm.reset();
            },
            (error) => {
                console.error('Failed to create User:', error);
                this.errorMessage = error;
                this.userForm.reset();
            }
        ).add(() => {
            this.isCreatingUser = false;
        });
    }
}
