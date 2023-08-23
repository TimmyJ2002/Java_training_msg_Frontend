import {Component, OnInit} from '@angular/core';
import {CreateDonatorService} from "../../services/createdonator.service";
import {Router} from "@angular/router";
import {Donator} from "../../models/donator";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-donator-list',
  templateUrl: './donator-list.component.html',
  styleUrls: ['./donator-list.component.css']
})
export class DonatorListComponent implements OnInit{
  donors: any[] = [];
  selectedDonator: Donator | null = null; // To store the selected donator
  donator: Donator | null = null;

  constructor(private donorService: CreateDonatorService,
              private router: Router,
              private languageService: LanguageService) {}

  ngOnInit(): void {
    this.loadActiveDonors();
  }

  loadDonors(): void {
    this.donorService.getDonors().subscribe(donors => {
      this.donors = donors;
    });
  }
  loadActiveDonors(): void {
    this.donorService.getDonors().subscribe(donors => {
      this.donors = donors.filter(donator => donator.isActive); //nu stiu de ce nu merge cu isActive...ma rog, asa merge
    });
  }
  navigateToEditDonator(donor: Donator): void {
    this.donator = donor;
    this.router.navigate(['donator/edit', donor.id]);
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }

}
