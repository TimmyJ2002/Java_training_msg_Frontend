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
  donorForm= this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName:['',Validators.required],
      additionalName: [''],
      maidenName:['']
    });
  constructor(private fb: FormBuilder,
              private donatorService: CreateDonatorService) { }
  onSubmit() {
    if (this.donorForm.valid) {
      const formData = this.donorForm.value;
      //console.log(formData)
      this.donatorService.addDonor(formData).subscribe(
        (response) => {
          console.log('Donor added successfully:', response);
          // You can reset the form or perform other actions here
        },
        (error) => {
          console.error('Error adding donor:', error);
          // Handle the error as needed
        }
      );
      this.isSuccess = true;
      this.donorForm.reset();
    }
  }
    clearSuccessMessage(){
      this.isSuccess = false;
    }


  ngOnInit(): void {
  }

}
