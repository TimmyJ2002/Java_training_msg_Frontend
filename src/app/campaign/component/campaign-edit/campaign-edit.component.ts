import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CampaignService} from "../../services/campaign.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Campaign} from "../../model/campaign";
import {CampaignUtilsService} from "../../services/campaign-utils.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
  campaign: Campaign | null = null;

  campaignDetails: Campaign = new Campaign(-1, "Name", "Purpose");

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private campaignService: CampaignService,
              private campaignUtilsService: CampaignUtilsService) {
    this.campaignForm = this.formBuilder.group( {
      name:[''],
      purpose: ['']
    });
  }

  ngOnInit(): void {
    this.campaign = this.campaignUtilsService.campaignData;
    if (this.campaign) {
      this.campaignDetails = this.campaign;
    }
  }

  navigateToSeeCampaign() {
    this.router.navigate(['/campaign/list']);
  }

  updateCampaign() {
    this.campaignService.updateCampaign(this.campaignDetails.id, this.campaignDetails).subscribe(
      (response) => {
        console.log('Campaign updated:', response);
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/campaign/list'], {
            queryParams: { successMessage: 'Campaign successfully edited!' },
          });
        }, 500);
      },
      (error) => {
        console.error('Error updating campaign: ', error);
        this.isDuplicate = true;
      }
    );
    this.clearBoolean();
  }

  clearBoolean(){
    this.isSuccess = false;
    this.isDuplicate = false;
  }
}
