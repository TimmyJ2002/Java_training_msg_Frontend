import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, throwError} from "rxjs";
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
      notes: string}>(this.url + "/addDonation", {amount, currency, donatorID, campaignID, notes}).pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred';
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            errorMessage = 'Bad request';
          } else {
            errorMessage = `HTTP Error: ${error.status}`;
          }
        }
        return throwError(errorMessage);
      })
    );
  }

  updateDonation(donationID: number,
                 amount: number,
                 currency: string,
                 donatorID: number,
                 campaignID: number,
                 notes: string){
    return this.http.post<{donationID: number,
      amount: number,
      currency: string,
      donatorID: number,
      campaignID: number,
      notes: string}>(this.url + "/updateDonation", {donationID, amount, currency, donatorID, campaignID, notes}).pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred';
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            errorMessage = 'Bad request';
          } else {
            errorMessage = `HTTP Error: ${error.status}`;
          }
        }
        return throwError(errorMessage);
      })
    );
  }

  constructor(private http: HttpClient) { }
}
