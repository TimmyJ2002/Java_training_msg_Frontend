import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private baseUrl = 'http://localhost:8080/donations';

  constructor(private http: HttpClient) { }

  getAllDonations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getFilteredDonations(filterCriteria: string): Observable<any[]> {
    return this.getAllDonations().pipe(
      map(donations => donations.filter(donation => donation[filterCriteria] === true))
    );
  }

  filterByCurrency(currency: string): Observable<any[]> {
    return this.getAllDonations().pipe(
      map(donations => donations.filter(donation => donation.currency === currency))
    );
  }

  filterByApproval(approved: boolean): Observable<any[]> {
    return this.getAllDonations().pipe(
      map(donations => donations.filter(donation => donation.approved === approved))
    );
  }

  deleteDonation(id_donation: string): boolean {
    if (confirm(`Are you sure you want to delete the selected donation?`)) {
      console.log(id_donation);
      const params = new HttpParams().set('id', id_donation);
      this.http.post(this.baseUrl, null, { params }).subscribe(() => {
        // Do something after successful deletion, such as updating the donation list
      });
      return true; //adik s-o sters cv
    }
    return false;
  }

}
