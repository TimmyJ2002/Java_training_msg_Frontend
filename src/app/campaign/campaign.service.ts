import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private baseUrl = 'http://localhost:8080/campaign';
  constructor(private http: HttpClient) { }

  getAllCampaigns() {
    return this.http.get<any[]>(this.baseUrl);
  }
}
