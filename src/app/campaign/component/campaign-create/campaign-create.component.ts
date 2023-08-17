import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CampaignService} from "../../services/campaign.service";

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {

  isSuccess: boolean = false;
  isDuplicate: boolean = false;
  campaignForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private campaignService: CampaignService) {
    this.campaignForm = this.formBuilder.group( {
      name:['', Validators.required],
      purpose: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      const campaignData = this.campaignForm.value;
      this.campaignService.createCampaign(campaignData).subscribe(
        (response) => {
          console.log('Campaign created:', response);
          this.isSuccess = true;
        },
        (error) => {
          console.error('Error creating campaign: ', error);
          this.isDuplicate = true;
        }
      );
      this.campaignForm.reset();
      this.clearBoolean();
    }
  }

  clearBoolean(){
    this.isSuccess = false;
    this.isDuplicate = false;
  }

  ngOnInit(): void {
  }

}
