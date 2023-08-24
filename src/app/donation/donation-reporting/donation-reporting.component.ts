import {Component, OnInit} from '@angular/core';
import {DonationService} from "./donation-service";
import {Donation} from "../models/donation";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {LanguageService} from "../../services/language.service";

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

  // New array to store selected donations
  selectedDonations: any[] = [];

  constructor(private donationService: DonationService, private authService: AuthService,
              private languageService: LanguageService,
              private router: Router) { }


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
    } else if (this.selectedFilterCriteria === 'Not approved') {
    this.donationService.filterByApproval2(true).subscribe(filteredDonations => {
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

    this.donationService.approveDonation(donation.id).subscribe(
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
      }
    );
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }


  editDonation(donation: Donation) {
    sessionStorage.setItem("donationToEdit", JSON.stringify(donation));
    this.router.navigateByUrl("/donation/updateDonation")
  }
  exportSelectedDonations() {
    // Perform further actions, such as exporting to CSV
    this.donationService.exportSelectedDonations(this.filteredDonations);
  }

}
