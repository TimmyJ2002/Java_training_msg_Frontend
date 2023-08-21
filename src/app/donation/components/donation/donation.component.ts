import {Component} from '@angular/core';
import {Donator} from "../../../donator/models/donator";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CreateDonatorService} from "../../../donator/services/createdonator.service";
import {Campaign} from "../../../campaign/model/campaign";
import {CampaignService} from "../../../campaign/services/campaign.service";
import {Donation} from "../../models/donation";
import {DonationService} from "../../services/donation.service";
import {combineLatest, map, Observable, startWith, take} from "rxjs";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent {
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
    combineLatest([this.donatorService.getDonors(), this.campaignService.getCampaigns()])
      .pipe(take(1))
      .subscribe(([donors, campaigns]) => {

        this.filteredDonators = this.donatorControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterDonators(value || '')),
        );
        this.filteredCampaigns = this.campaignControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterCampaigns(value || '')),
        );
      })

  }

  private initDonationForm() {
    this.donationForm = this.formBuilder.group({
      amount: ['', [Validators.required, this.validateNumber(), Validators.pattern(/^(?!0\d)(\d+)$/)]],
      currency: ['', [Validators.required]],
      donator: [null, [Validators.required]],
      campaign: [null, [Validators.required]],
      notes: ['']
    })
  }

  validateNumber(): ValidatorFn {
    return (control: AbstractControl) => control.value === "" ? {isValid: true} : null;
  }

  onSubmit() {
    if (this.donationForm.valid) {
      const formValue = this.donationForm.getRawValue();
      console.log(formValue);
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

  filterDonators(value: string | Donator): Donator[] {

    if (typeof value === 'string'){
      const filterValueDonator = value.toLowerCase();

      return this.donatorList
        .filter(option =>
          option.firstName.toLowerCase().includes(filterValueDonator) ||
          option.lastName.toLowerCase().includes(filterValueDonator))
    }
    return [];

  }

  filterCampaigns(value: string): Campaign[] {
    const filterValue = value.toLowerCase();

    return this.campaignList
      .filter(campaign =>
        campaign.name.toLowerCase().includes(filterValue)
      )
  }

  // public donatorDisplayFn(donator: Donator) {
  //   return donator && donator.lastName + " " + donator.firstName;
  // }
  //
  // public campaignDisplayFn(campaign: Campaign) {
  //   return campaign && campaign.name;
  // }

}
