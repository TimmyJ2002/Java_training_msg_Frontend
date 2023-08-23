import { Injectable } from '@angular/core';
import {Campaign} from "../model/campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignUtilsService {
  private _campaignData: Campaign | null = null;

  get campaignData(): Campaign | null {
    return this._campaignData;
  }
  setCampaignData(campaign: Campaign): void {
    this._campaignData = campaign;
  }
}
