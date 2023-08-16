import {Component, OnInit} from '@angular/core';

import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {
  FormBuilder, FormControl,
  FormGroup, FormGroupDirective, NgForm,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from "@angular/material/core";


class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit{
  userForm!: FormGroup;
  errorMessage: any;
  successMessage: any;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.initUserForm();
  }

  private initUserForm(): void{
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
      mobileNumber: ['', [Validators.required, Validators.pattern(/^(00407\d{8}|07\d{8}|\+407\d{8})$/)]]
      // TODO:roles and other things i need to add later + Validators
    });

/*
  this.userForm = this.formBuilder.group({
    emailFormControl : new FormControl('', [
      Validators.required,
      Validators.email]),
    phoneNumberControl : new FormControl('',[Validators.required, Validators.pattern(/^(00407\d{8}|07\d{8}|\+407\d{8})$/)]),
    matcher : new MyErrorStateMatcher()
  });
*/


}

onSubmit(): void {
if (this.userForm.invalid) {
  return;
}
this.successMessage = "";
this.errorMessage = "";

const user: User = this.userForm.value;

this.userService.createUser(user).subscribe(
  () => {
    console.log('User created successfully');
    this.successMessage = 'User created successfully!';

    this.userForm.reset();
  },
  (error) => {
    console.error('Failed to create User:', error);
    this.errorMessage = error;
    this.userForm.reset();
  }
);
}

/*emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneNumberControl = new FormControl('',[Validators.required, Validators.pattern(/^(00407\d{8}|07\d{8}|\+407\d{8})$/)]);

matcher = new MyErrorStateMatcher();*/

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

}
