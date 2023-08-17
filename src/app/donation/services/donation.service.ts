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

  addDonation(donation: Donation) {

    // const token = sessionStorage.getItem('accessToken'); // Replace with your sessionStorage key
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Donation>(this.url + "/addDonation", donation)
}

  constructor(private http: HttpClient) { }
}
