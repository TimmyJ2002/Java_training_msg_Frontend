import {Component, OnInit} from '@angular/core';
import {DonationService} from "./donation-service";
import {Donation} from "../models/donation";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {LanguageService} from "../../services/language.service";
import jwtDecode from "jwt-decode";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  rightsList: string[] = [];

  constructor(private donationService: DonationService, private authService: AuthService,
              private languageService: LanguageService,
              private router: Router,
              private _snackBar: MatSnackBar) { }


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
    if (confirm(`Are you sure you want to delete the selected donation?`)) {
      this.status = true;
      this.donationService.deleteDonation(id);
      this._snackBar.open("Donation successfully deleted!", 'Close');
    } else {
      this.status = false;
      this._snackBar.open("Donation was not deleted!", 'Close');
    }
    if(this.status) {
      this.donations = this.donations.filter(donation => donation.id !== id);
      this.filteredDonations = this.filteredDonations.filter(donation => donation.id !== id);
    }
  }


  approveDonation(donation: any): void {

    this.donationService.approveDonation(donation.id).subscribe(
      () => {
        this._snackBar.open('Donation successfully approved!', 'Close')

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
        this._snackBar.open('Donation could not be approved', 'Close')
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

  getPermission(): void {
    jwtDecode(sessionStorage.getItem("accessToken")!);
    let token = jwtDecode<{sub: string, permissions: string[]}>(sessionStorage.getItem("accessToken")!)
    this.rightsList = token.permissions;
  }

  hasPermission(requiredPermissions: string[]) {
    this.getPermission();
    return (requiredPermissions).some((right) => this.rightsList.includes(right))
  }

}
