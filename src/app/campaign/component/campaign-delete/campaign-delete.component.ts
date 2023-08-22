import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../model/campaign";

@Component({
  selector: 'app-campaign-delete',
  templateUrl: './campaign-delete.component.html',
  styleUrls: ['./campaign-delete.component.css']
})
export class CampaignDeleteComponent implements OnInit {

  // @ts-ignore
  id: number;
  campaigns: any[] = [];
  campaign: Campaign | null = null;
  isSuccess: boolean = false;
  isFailure: boolean = false;

  constructor(private campaignService: CampaignService) {
  }

  ngOnInit(): void {
    this.loadCampaigns();
    this.isSuccess = false;
    this.isFailure = false;
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  deleteCampaign(campaign: Campaign) {
    if (confirm(`Are you sure you want to delete?`)) {
      this.campaignService.deleteCampaign(campaign.id).subscribe(
        (response) => {
          console.log('Campaign deleted:', response);
          this.isSuccess = true;
          this.loadCampaigns();
        },
        (error) => {
          console.error('Error deleting campaign: ', error);
          this.isFailure = true;
        }
      );
      this.clearBoolean();
    }
  }

  clearBoolean(){
    this.isSuccess = false;
    this.isFailure = false;
  }
}
