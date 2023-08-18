import {Component, OnInit} from '@angular/core';
import {DonationService} from "./donation-service";

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

  constructor(private donationService: DonationService) { }

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
  deleteDonation(id: string): void{
    this.status = this.donationService.deleteDonation(id);
    if(this.status) {
      this.donations = this.donations.filter(donation => donation.id !== id);
      this.filteredDonations = this.filteredDonations.filter(donation => donation.id !== id);
    }
  }

}
