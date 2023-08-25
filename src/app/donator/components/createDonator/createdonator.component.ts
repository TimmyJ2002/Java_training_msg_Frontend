import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CreateDonatorService} from "../../services/createdonator.service";
import {LanguageService} from "../../../services/language.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-donator',
  templateUrl: './createdonator.component.html',
  styleUrls: ['./createdonator.component.css']
})
export class CreateDonatorComponent implements OnInit{
  isSuccess: boolean = false;
  missingFields: boolean = false;
  translatedMessage: string = '';
  donorForm= this.fb.group(
    {
      firstName: [''],
      lastName:[''],
      additionalName: [''],
      maidenName:['']
    });
  constructor(private fb: FormBuilder,
              private donatorService: CreateDonatorService,
              private languageService: LanguageService,
              private _snackBar: MatSnackBar) { }
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
          this._snackBar.open(this.getTranslatedMessage("@@donorCreatedSuccessfully"), this.getTranslatedMessage("@@close"));
        },
        (error) => {
          this._snackBar.open(this.getTranslatedMessage("@@donorCannotCreate"), this.getTranslatedMessage("@@close"));
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
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }

  ngOnInit() {
    this.languageService.selectedLanguage$.subscribe((language) => {
      // Fetch and set translated content based on the selected language
      this.translatedMessage = this.getTranslatedMessage(language);
    });
  }


}
