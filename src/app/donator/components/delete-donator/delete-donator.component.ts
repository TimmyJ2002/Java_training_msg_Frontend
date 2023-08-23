import {Component, OnInit} from '@angular/core';
import {Donator} from "../../models/donator";
import {CreateDonatorService} from "../../services/createdonator.service";
import {Router} from "@angular/router";
import {LanguageService} from "../../../services/language.service";

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
              private languageService: LanguageService) {}

  ngOnInit(): void {
    this.status = false;
    this.loadActiveDonors();
  }
  loadActiveDonors(): void {
    this.donorService.getDonors().subscribe(donors => {
      this.donors = donors.filter(donator => donator.active); //nu stiu de ce nu merge cu isActive...ma rog, asa merge
      console.log(donors)
    });
  }
  deleteDonor(d: Donator): void{
    this.status = this.donorService.deleteDonor(d);
    if(this.status)
      this.donors = this.donors.filter(donator => donator.id !== d.id);
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
