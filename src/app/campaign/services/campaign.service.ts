import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Campaign} from "../model/campaign";

@Injectable({
  providedIn: 'root'
})

export class CampaignService {
  createURL = 'http://localhost:8080/campaign/create';
  getURL = 'http://localhost:8080/campaign';
  deleteURL = 'http://localhost:8080/campaign/delete'
  updateURL = 'http://localhost:8080/campaign/update';

  constructor(private http: HttpClient) {
  }

  getCampaign(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`http://localhost:8080/campaign/{id}`);
  }

  getCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(this.getURL);
  }

  createCampaign(data: any): Observable<any> {
    return this.http.post<String>(this.createURL, data);
  }

  updateCampaign(id: number, data: any): Observable<any> {
    return this.http.post<any>((`${this.updateURL}/${id}`), data);
  }

  deleteCampaign(id: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteURL}/${id}`);
  }
}
