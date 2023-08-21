import {Component, OnInit} from '@angular/core';
import {Campaign} from "../../model/campaign";
import {CampaignService} from "../../services/campaign.service";
import {Router} from "@angular/router";
import {CampaignUtilsService} from "../../services/campaign-utils.service";

@Component({
  selector: 'app-campaign-edit-list',
  templateUrl: './campaign-edit-list.component.html',
  styleUrls: ['./campaign-edit-list.component.css']
})
export class CampaignEditListComponent implements OnInit {

  campaigns: any[] = [];
  campaign: Campaign | null = null;

  constructor(private campaignService: CampaignService,
              private router: Router, private campaignUtilsService: CampaignUtilsService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  navigateToEditCampaign(campaign: Campaign) {
    this.campaign = campaign;
    this.campaignUtilsService.setCampaignData(campaign);
    this.router.navigate(['/campaign/update', campaign.id]);
  }
}
