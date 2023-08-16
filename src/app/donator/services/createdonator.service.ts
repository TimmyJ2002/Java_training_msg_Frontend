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

  constructor(private http: HttpClient) {

  }
  addDonor(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  getDonors(): Observable<any[]> {
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

}
