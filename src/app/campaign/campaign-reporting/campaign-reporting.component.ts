import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../campaign.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-campaign-reporting',
  templateUrl: './campaign-reporting.component.html',
  styleUrls: ['./campaign-reporting.component.css']
})
export class CampaignReportingComponent implements OnInit{

  campaigns: any[] = [];
  filteredCampaigns: any[] = [];
  searchQuery: string = '';
  ngOnInit(): void {
    this.campaignService.getAllCampaigns().subscribe(data => {
      this.campaigns = data;
      this.filteredCampaigns = data;
    });
  }

  applySearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredCampaigns = this.campaigns;
    } else {
      this.filteredCampaigns = this.campaigns.filter(campaign =>
        campaign.purpose.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        campaign.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  constructor(private campaignService: CampaignService,
              private languageService: LanguageService) { }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
  exportSelectedCampaigns() {
    // Perform further actions, such as exporting to CSV
    console.log(this.filteredCampaigns)
    this.campaignService.exportSelectedCampaigns(this.filteredCampaigns);
  }
}
