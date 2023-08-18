import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../model/campaign";
import {Router} from "@angular/router";

@Component({
  selector: 'app-campaign-delete',
  templateUrl: './campaign-delete.component.html',
  styleUrls: ['./campaign-delete.component.css']
})
export class CampaignDeleteComponent implements OnInit{

  // @ts-ignore
  id: number;
  isSuccess: boolean = false;
  isDuplicate: boolean = false;
  campaignForm: FormGroup;
  campaigns: any[] = [];
  selectedCampaign : Campaign | null = null;
  campaign: Campaign | null = null;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private campaignService: CampaignService) {
    this.campaignForm = this.formBuilder.group( {
      name:[''],
      purpose: ['']
    });
  }

  // onSubmit() {
  //   if (this.campaignForm.valid) {
  //     const campaignData = this.campaignForm.value;
  //     this.campaignService.deleteCampaign(campaignData).subscribe(
  //       (response) => {
  //         console.log('Campaign deleted: ', response);
  //       },
  //       (error) => {
  //         console.error('Error deleting campaign: ', error);
  //       }
  //     );
  //   }
  // }

  ngOnInit(): void {
    this.loadCampaigns();
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
