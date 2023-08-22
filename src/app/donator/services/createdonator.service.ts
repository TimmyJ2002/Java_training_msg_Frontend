import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Donator} from "../models/donator";

@Injectable({
  providedIn: 'root'
})
export class CreateDonatorService {

  private apiUrl = 'http://localhost:8080/donator/create'; // Adjust the URL as needed
  private editUrl = 'http://localhost:8080/donator/edit';
  private deleteUrl = 'http://localhost:8080/donator/delete';

  constructor(private http: HttpClient) {

  }
  addDonor(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  getDonors(): Observable<Donator[]> {
    return this.http.get<any[]>(this.editUrl);
  }
  getDonor(userId: number): Observable<Donator> {
    return this.http.get<Donator>(`${this.editUrl}/${userId}`);
  }
  saveDonator(donatorDetails: Donator): void {

    this.http.post((`${this.editUrl}/${donatorDetails.id}`),donatorDetails).subscribe(
      () => {
        console.log('Donator information updated successfully');
      },
      error => {
        console.error('Error updating donator information:', error);
      }
    );
  }
  deleteDonor(donor: Donator): boolean {
    if (confirm(`Are you sure you want to delete ${donor.firstName} ${donor.lastName}?`)) {
      console.log(donor);
      this.http.post(this.deleteUrl, donor).subscribe(() => {
        // Do something after successful deletion, such as updating the donor list
      });
      return true; //adik s-o sters cv
    }
    return false;
  }

}
