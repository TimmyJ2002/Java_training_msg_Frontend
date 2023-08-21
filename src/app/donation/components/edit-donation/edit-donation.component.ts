import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Donator} from "../../../donator/models/donator";
import {Campaign} from "../../../campaign/model/campaign";
import {map, Observable, startWith} from "rxjs";
import {CreateDonatorService} from "../../../donator/services/createdonator.service";
import {CampaignService} from "../../../campaign/services/campaign.service";
import {DonationService} from "../../services/donation.service";
import {Donation} from "../../models/donation";

@Component({
  selector: 'app-edit-donation',
  templateUrl: './edit-donation.component.html',
  styleUrls: ['./edit-donation.component.css']
})
export class EditDonationComponent {
  donationForm!: FormGroup;
  donatorList: Donator[] = [];
  campaignList: Campaign[] = [];
  donatorControl = new FormControl('');
  campaignControl = new FormControl('');
  filteredDonators: Observable<Donator[]> | null = null;
  filteredCampaigns: Observable<Campaign[]> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private donatorService: CreateDonatorService,
    private campaignService: CampaignService,
    private donationService: DonationService
  ) {
  }

  ngOnInit(): void {
    this.initDonationForm();
    this.donatorService.getDonors().subscribe((donator) => {
      this.donatorList = donator;
    });
    this.campaignService.getCampaigns().subscribe((campaign) => {
      this.campaignList = campaign;
    })
    this.filteredDonators = this.donatorControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDonators(value || '')),
    );
    this.filteredCampaigns = this.campaignControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCampaigns(value || '')),
    );
  }

  private initDonationForm() {
    this.donationForm = this.formBuilder.group({
      amount: ['', [Validators.required, this.validateNumber(), Validators.pattern(/^(?!0\d)(\d+)$/)]],
      currency: ['', [Validators.required]],
      donator: ['', [Validators.required]],
      campaign: ['', [Validators.required]],
      notes: ['']
    })
  }

  validateNumber(): ValidatorFn {
    return (control: AbstractControl) => control.value === "" ? {isValid: true} : null;
  }

  onSubmit() {
    if (this.donationForm.valid) {
      const donation: Donation = {
        amount: this.donationForm.get('amount')?.value,
        currency: this.donationForm.get('currency')?.value,
        campaignID: this.donationForm.get('campaign')?.value.id,
        donatorID: this.donationForm.get('donator')?.value.id,
        notes: this.donationForm.get('notes')?.value
      };
      this.donationService.addDonation(donation).subscribe();
    }
    this.initDonationForm();
  }

  private _filterDonators(value: string | Donator): Donator[] {

    if (typeof value === 'string'){
      const filterValueDonator = value.toLowerCase();

      return this.donatorList
        .filter(option =>
          option.firstName.toLowerCase().includes(filterValueDonator) ||
          option.lastName.toLowerCase().includes(filterValueDonator)
        )
        .map(option => option);
    } else return [];

  }

  private _filterCampaigns(value: string): Campaign[] {
    const filterValue = value.toLowerCase();

    return this.campaignList
      .filter(campaign =>
        campaign.name.toLowerCase().includes(filterValue)
      )
      .map(campaign => campaign);
  }

  public donatorDisplayFn(donator: Donator) {
    return donator && donator.lastName + " " + donator.firstName;
  }

  public campaignDisplayFn(campaign: Campaign) {
    return campaign && campaign.name;
  }

  public onDonatorChange(value: Donator) {
    this.donationForm.controls['donator'].setValue(value);
  }

  public onCampaignChange(value: Campaign) {
    this.donationForm.controls['campaign'].setValue(value);
  }


}
