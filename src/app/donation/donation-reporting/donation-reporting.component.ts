import {Component, OnInit} from '@angular/core';
import {DonationService} from "./donation-service";
import {Donation} from "../models/donation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-donation-reporting',
  templateUrl: './donation-reporting.component.html',
  styleUrls: ['./donation-reporting.component.css']
})

export class DonationReportingComponent implements OnInit{
  donations: Donation[] = [];
  filteredDonations: any[] = [];
  selectedFilterCriteria: string = '';
  selectedCurrency: string = '';
  searchQuery: string = '';

  constructor(private donationService: DonationService,
              private router: Router) { }

  ngOnInit(): void {
    this.donationService.getAllDonations().subscribe(data => {
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

  editDonation(donation: Donation) {
    sessionStorage.setItem("donationToEdit", JSON.stringify(donation));
    this.router.navigateByUrl("/donation/updateDonation")
  }

}
