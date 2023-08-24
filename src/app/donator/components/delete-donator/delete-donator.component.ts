import {Component, OnInit} from '@angular/core';
import {Donator} from "../../models/donator";
import {CreateDonatorService} from "../../services/createdonator.service";
import {Router} from "@angular/router";
import {LanguageService} from "../../../services/language.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-donator',
  templateUrl: './delete-donator.component.html',
  styleUrls: ['./delete-donator.component.css']
})
export class DeleteDonatorComponent implements OnInit{
  donors: any[] = [];
  donator: Donator | null = null;
  status: boolean = false;

  constructor(private donorService: CreateDonatorService,
              private languageService: LanguageService,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.status = false;
    this.loadActiveDonors();
  }
  loadActiveDonors(): void {
    this.donorService.getDonors().subscribe(donors => {
      this.donors = donors.filter(donator => donator.active); //nu stiu de ce nu merge cu isActive...ma rog, asa merge
    });
  }
  deleteDonor(donor: Donator): void{
    if (confirm(`Are you sure you want to delete ${donor.firstName} ${donor.lastName}?`)) {
      this.status = true;
      this.donorService.deleteDonor(donor);
      this._snackBar.open('Donor successfully deleted!', 'Close')
    } else {
      this.status = false;
    }
      if (this.status)
        this.donors = this.donors.filter(donator => donator.id !== donor.id);
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
