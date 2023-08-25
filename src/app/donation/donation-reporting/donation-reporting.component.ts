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
  displayedColumns: string[] = ['donationID', 'amount', 'currency', 'campaign', 'donator', 'approved', 'notes'];
  selectedDonation: Donation;
  isApproved: boolean = false;

  // New array to store selected donations
  selectedDonations: any[] = [];

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
  deleteDonation(ID: number): void{
    let id = ID.toString();
    if (confirm(`Are you sure you want to delete the selected donation?`)) {
      this.status = true;
      this.donationService.deleteDonation(id);
      this._snackBar.open(this.getTranslatedMessage("@@donationDeletedSuccessfully"), this.getTranslatedMessage("@@close"));
    } else {
      this.status = false;
      this._snackBar.open(this.getTranslatedMessage("@@donationCannotDelete"), this.getTranslatedMessage("@@close"));
    }
    if(this.status) {
      this.donations = this.donations.filter(donation => donation.id !== id);
      this.filteredDonations = this.filteredDonations.filter(donation => donation.id !== id);
    }
  }


  approveDonation(donation: any): void {
    this.donationService.approveDonation(donation.id).subscribe(
      () => {
        this._snackBar.open(this.getTranslatedMessage("@@donationApproved"), this.getTranslatedMessage("@@close"))

        // Update the approval status locally
        const approvedDonationIndex = this.donations.findIndex((d) => d.id === donation.id);
        if (approvedDonationIndex !== -1) {
          this.donations[approvedDonationIndex].approved = true;
          this.selectedDonation.approved = true;
          this.onSelected();
        }

        // Optionally, update filteredDonations as well
        const approvedFilteredIndex = this.filteredDonations.findIndex((d) => d.id === donation.id);
        if (approvedFilteredIndex !== -1) {
          this.filteredDonations[approvedFilteredIndex].approved = true;
        }
      },
      (error) => {
        this._snackBar.open(this.getTranslatedMessage("@donationCannotApprove"), this.getTranslatedMessage("@@close"))
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

  getPermission(): void {
    jwtDecode(sessionStorage.getItem("accessToken")!);
    let token = jwtDecode<{sub: string, permissions: string[]}>(sessionStorage.getItem("accessToken")!)
    this.rightsList = token.permissions;
  }

  hasPermission(requiredPermissions: string[]) {
    this.getPermission();
    return (requiredPermissions).some((right) => this.rightsList.includes(right))
  }

  onSelected() {
    this.isApproved = this.selectedDonation.approved!;
    const approveBtn = document.getElementById('approveButton') as HTMLButtonElement;
    const editBtn = document.getElementById('editButton') as HTMLButtonElement;
    const deleteBtn = document.getElementById('deleteButton') as HTMLButtonElement;
    if (!this.isApproved) {
      approveBtn?.removeAttribute('disabled');
      editBtn?.removeAttribute('disabled');
      deleteBtn?.removeAttribute('disabled');
    } else {
      approveBtn?.setAttribute('disabled', '');
      editBtn?.setAttribute('disabled', '');
      deleteBtn?.setAttribute('disabled', '');
    }
  }
}
