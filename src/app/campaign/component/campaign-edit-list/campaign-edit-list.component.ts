import {Component, OnInit} from '@angular/core';
import {Campaign} from "../../model/campaign";
import {CampaignService} from "../../services/campaign.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CampaignUtilsService} from "../../services/campaign-utils.service";

@Component({
  selector: 'app-campaign-edit-list',
  templateUrl: './campaign-edit-list.component.html',
  styleUrls: ['./campaign-edit-list.component.css']
})
export class CampaignEditListComponent implements OnInit {

  campaigns: any[] = [];
  campaign: Campaign | null = null;
  successMessage: string | null = null;
  editedCampaignId: number | null = null;

  constructor(private campaignService: CampaignService,
              private router: Router, private campaignUtilsService: CampaignUtilsService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadCampaigns();
    this.route.queryParams.subscribe((params) => {
      this.successMessage = params['successMessage'] || null;
    });
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  navigateToEditCampaign(campaign: Campaign) {
    this.editedCampaignId = campaign.id;
    this.campaignUtilsService.setCampaignData(campaign);
    this.router.navigate(['/campaign/update', campaign.id]);
  }
}
