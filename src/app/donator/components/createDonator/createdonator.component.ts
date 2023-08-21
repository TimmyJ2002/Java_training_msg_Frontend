import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CreateDonatorService} from "../../services/createdonator.service";


@Component({
  selector: 'app-donator',
  templateUrl: './createdonator.component.html',
  styleUrls: ['./createdonator.component.css']
})
export class CreateDonatorComponent implements OnInit{
  isSuccess: boolean = false;
  missingFields: boolean = false;
  donorForm= this.fb.group(
    {
      firstName: [''],
      lastName:[''],
      additionalName: [''],
      maidenName:['']
    });
  constructor(private fb: FormBuilder,
              private donatorService: CreateDonatorService) { }
  onSubmit() {
    if (this.donorForm.value.firstName === '' || this.donorForm.value.lastName === '') {
      this.missingFields = true;
      return; // Exit the function without proceeding further
    }
    // If the form is valid and no missing fields, proceed with adding the donor
    if (this.donorForm.valid) {
      const formData = this.donorForm.value;
      //console.log(formData)
      this.donatorService.addDonor(formData).subscribe(
        (response) => {
          console.log('Donor added successfully:', response);
        },
        (error) => {
          console.error('Error adding donor:', error);
        }
      );
      this.isSuccess = true;
      this.donorForm.reset();
      this.missingFields = false; // Reset the missingFields flag
    }
  }

    clearSuccessMessage(){
      this.isSuccess = false;
      this.missingFields = false;
    }


  ngOnInit(): void {
  }

}
