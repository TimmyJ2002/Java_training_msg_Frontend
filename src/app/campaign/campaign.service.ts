import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExportUtils} from "../../../util/export/exportUtils";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private baseUrl = 'http://localhost:8080/campaign';
  constructor(private http: HttpClient,
              private exporting: ExportUtils) { }

  getAllCampaigns() {
    return this.http.get<any[]>(this.baseUrl);
  }
  exportSelectedCampaigns(selectedDonations: any[]){
    let headerList=["id","name","purpose"]
    let newHeaders = ["ID:", "Name", "Purpose"];
    let fileName = "campaign-reporting.csv";
    this.exporting.exportSelected(selectedDonations,headerList,newHeaders, fileName);
  }
}
