import {Component, OnInit} from '@angular/core';
import {DonationService} from "./donation-service";
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-donation-reporting',
  templateUrl: './donation-reporting.component.html',
  styleUrls: ['./donation-reporting.component.css']
})

export class DonationReportingComponent implements OnInit{
  donations: any[] = [];
  filteredDonations: any[] = [];
  selectedFilterCriteria: string = '';
  selectedCurrency: string = '';
  searchQuery: string = '';
  status: boolean = false;

  constructor(private donationService: DonationService, private authService: AuthService) { }


  ngOnInit(): void {
    this.fetchDonations();
  }

  fetchDonations(): void {
    this.donationService.getAllDonations().subscribe((data) => {
      this.donations = data;
      this.filteredDonations = data;
    });
  }
  applyFilter() {
    if (this.selectedFilterCriteria === 'selectCriteria') {
      this.filteredDonations = this.donations; // Reset to all donations
    } else if (this.selectedFilterCriteria === 'currency') {
      this.donationService.filterByCurrency(this.selectedCurrency).subscribe(filteredDonations => {
        this.filteredDonations = filteredDonations;
      });
    } else if (this.selectedFilterCriteria === 'Approved') {
      this.donationService.filterByApproval(true).subscribe(filteredDonations => {
        this.filteredDonations = filteredDonations;
      });
    }
  }

  applySearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredDonations = this.donations;
    } else {
      this.filteredDonations = this.donations.filter(donation =>
        donation.notes.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  deleteDonation(id: string): void{
    this.status = this.donationService.deleteDonation(id);
    if(this.status) {
      this.donations = this.donations.filter(donation => donation.id !== id);
      this.filteredDonations = this.filteredDonations.filter(donation => donation.id !== id);
    }
  }


  approveDonation(donation: any): void {
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.donationService.approveDonation(donation.id, { headers }).subscribe(
      () => {
        console.log('Donation approved successfully');

        // Update the approval status locally
        const approvedDonationIndex = this.donations.findIndex((d) => d.id === donation.id);
        if (approvedDonationIndex !== -1) {
          this.donations[approvedDonationIndex].approved = true;
        }

        // Optionally, update filteredDonations as well
        const approvedFilteredIndex = this.filteredDonations.findIndex((d) => d.id === donation.id);
        if (approvedFilteredIndex !== -1) {
          this.filteredDonations[approvedFilteredIndex].approved = true;
        }
      },
      (error) => {
        console.error('Error approving donation:', error);
        // Handle error cases here
      }
    );
  }



}
