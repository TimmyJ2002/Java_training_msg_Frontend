import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../model/campaign";
import {LanguageService} from "../../../services/language.service";

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
  translatedMessage: string = '';

  constructor(private campaignService: CampaignService,
              private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.loadCampaigns();
    this.isSuccess = false;
    this.isFailure = false;
    this.languageService.selectedLanguage$.subscribe((language) => {
      // Fetch and set translated content based on the selected language
      this.translatedMessage = this.getTranslatedMessage(language);
    });
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  deleteCampaign(campaign: Campaign) {
    if (confirm(this.getTranslatedMessage('@@deleteMessage'))) {
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

  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
