import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campaign} from "../model/campaign";

@Injectable({
  providedIn: 'root'
})

export class CampaignService {
  createURL =  'http://localhost:8080/campaign/create';
  getURL = 'http://localhost:8080/campaign'
  updateURL = 'http://localhost:8080/campaign/update';

  constructor(private http: HttpClient) {}

  getCampaign(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`http://localhost:8080/campaign/{id}`);
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<any[]>(this.getURL);
  }

  createCampaign(data: any): Observable<any> {
    return this.http.post<String>(this.createURL, data);
  }

  updateCampaign(campaign: Campaign): void {
    this.http.post((`${this.updateURL}/${campaign.id}`), campaign);
  }

 // deleteCampaign()
}
