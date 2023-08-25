import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CampaignService} from "../../services/campaign.service";
import {LanguageService} from "../../../services/language.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {

  campaignForm: FormGroup;
  isSuccess: boolean = false;
  isDuplicate: boolean = false;
  translatedMessage: string = '';


  constructor(private formBuilder: FormBuilder,
              private campaignService: CampaignService,
              private languageService: LanguageService,
              private _snackBar: MatSnackBar) {
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      purpose: ['', Validators.required]
    });
  }

  onSubmit(formData: any, formDirective: FormGroupDirective) {
    this.campaignForm.markAllAsTouched();
    if (this.campaignForm.valid) {
      const campaignData = this.campaignForm.value;
        this.campaignService.createCampaign(campaignData).subscribe(
          (response) => {
            this._snackBar.open(this.getTranslatedMessage("@@createCampaignSuccessfull"), this.getTranslatedMessage("@@close"))
            this.isSuccess = true;
            formDirective.resetForm();
            this.campaignForm.reset();
          },
          (error) => {
            this._snackBar.open(this.getTranslatedMessage("@@cannotCreateCampaign"), this.getTranslatedMessage("@@close"))
            this.isDuplicate = true;
          }
        );
      }
    else {
      this.campaignForm.markAllAsTouched();
    }
      this.clearBoolean();
  }

  clearBoolean(){
    this.isSuccess = false;
    this.isDuplicate = false;
  }

  ngOnInit(): void {
    this.languageService.selectedLanguage$.subscribe((language) => {
      this.translatedMessage = this.getTranslatedMessage(language);
    });
  }

  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
