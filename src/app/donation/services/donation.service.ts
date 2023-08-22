import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Role} from "../../components/permission_management/models/role";
import {Donation} from "../models/donation";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  url:string = "http://localhost:8080/donations"
  donationsList$: BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);

  addDonation(amount: number,
              currency: string,
              donatorID: number,
              campaignID: number,
              notes: string) {
    return this.http.post<{amount: number,
      currency: string,
      donatorID: number,
      campaignID: number,
      notes: string}>(this.url + "/addDonation", {amount, currency, campaignID, donatorID, notes})
  }

  updateDonation(donationID: number,
                 amount: number,
                 currency: string,
                 donatorID: number,
                 campaignID: number,
                 notes: string){
    console.log({donationID, amount, currency, campaignID, donatorID, notes})
    return this.http.post<{donationID: number,
      amount: number,
      currency: string,
      donatorID: number,
      campaignID: number,
      notes: string}>(this.url + "/updateDonation", {donationID, amount, currency, donatorID, campaignID, notes});
  }

  constructor(private http: HttpClient) { }
}
