import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Donator} from "../../models/donator";
import {CreateDonatorService} from "../../services/createdonator.service";
import {LanguageService} from "../../../services/language.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-donator',
  templateUrl: './edit-donator.component.html',
  styleUrls: ['./edit-donator.component.css']
})
export class EditDonatorComponent implements OnInit {
  // @ts-ignore
  id: number;
  missingFields: boolean = false;

  constructor(private route: ActivatedRoute,
              private donatorService: CreateDonatorService,
              private router: Router,
              private languageService:LanguageService,
              private _snackBar: MatSnackBar) {
  }

  donatorDetails: Donator = new Donator(-1,"Firstname","Lastname","Additionalname","Maidenname", true);
  ngOnInit() {
    this.missingFields = false;
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const donorId = +params.get('id');
      this.donatorService.getDonor(donorId).subscribe((donatorData: Donator) => {
        this.donatorDetails = donatorData;
      });
    });
  }
  saveDonator(): void {
    if (this.donatorDetails.firstName !== '' && this.donatorDetails.lastName !== '') {
      this.donatorService.saveDonator(this.donatorDetails);
      this._snackBar.open('Donor successfully added!', 'Close')
      this.missingFields = false;
    } else {
      this.missingFields = true;
    }
  }
  navigateToEditDonator(): void {
    this.router.navigate(['/donator/edit']); // Navigate to the desired URL
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
