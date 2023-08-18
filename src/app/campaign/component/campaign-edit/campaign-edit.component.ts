import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CampaignService} from "../../services/campaign.service";
import {Router} from "@angular/router";
import {Campaign} from "../../model/campaign";

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {
  // @ts-ignore
  id: number;
  isSuccess: boolean = false;
  isDuplicate: boolean = false;
  campaignForm: FormGroup;
  campaigns: any[] = [];
  campaign: Campaign | null = null;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private campaignService: CampaignService) {
    this.campaignForm = this.formBuilder.group( {
      name:[''],
      purpose: ['']
    });
  }

  clearBoolean(){
    this.isSuccess = false;
    this.isDuplicate = false;
  }

  ngOnInit(): void {
    this.loadCampaigns();
  }

  onSubmit() {
    // if (this.campaignForm.valid) {
    //   const campaignData = this.campaignForm.value;
    //   this.campaignService.updateCampaign(campaignData).subscribe(
    //     (response) => {
    //       console.log('Campaign updated:', response);
    //       this.isSuccess = true;
    //     },
    //     (error) => {
    //       console.error('Error updating campaign: ', error);
    //       this.isDuplicate = true;
    //     }
    //   );
    //   this.campaignForm.reset();
    //   this.clearBoolean();
    // }
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }


  toSeeCampaign(campaign: Campaign): void {
    this.campaign = campaign;
    this.router.navigate(['/campaign', campaign.id]);
  }
}
