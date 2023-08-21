import {Component} from '@angular/core';
import {Donator} from "../../../donator/models/donator";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CreateDonatorService} from "../../../donator/services/createdonator.service";
import {Campaign} from "../../../campaign/model/campaign";
import {CampaignService} from "../../../campaign/services/campaign.service";
import {Donation} from "../../models/donation";
import {DonationService} from "../../services/donation.service";
import {combineLatest, take} from "rxjs";

interface AddDonationForm {
  amount: FormControl<string>;
  currency: FormControl<string>;
  donator?: FormControl<Donator | null>;
  campaign?: FormControl<Campaign | null>;
  notes: FormControl<string>;
}

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent {
  donationForm!: FormGroup<AddDonationForm>;
  donatorList: Donator[] = [];
  campaignList: Campaign[] = [];
  filteredDonators: Donator[] = [];
  filteredCampaigns: Campaign[] = [];

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
        this.donatorList = donors;
        this.campaignList = campaigns;
      })

  }

  private initDonationForm() {
    this.donationForm = this.formBuilder.group<AddDonationForm>({
      amount: new FormControl('',
        {
          validators: [Validators.required, this.validateNumber(), Validators.pattern(/^(?!0\d)(\d+)$/)],
          nonNullable: true
        }),
      currency: new FormControl('', {validators: Validators.required, nonNullable: true}),
      donator: new FormControl(null, {validators: Validators.required}),
      campaign: new FormControl(null, {validators: Validators.required}),
      notes: new FormControl('', {nonNullable: true}),
    })
  }

  validateNumber(): ValidatorFn {
    return (control: AbstractControl) => control.value === "" ? {isValid: true} : null;
  }

  onSubmit() {
    if (this.donationForm.valid) {
      const formValue = this.donationForm.getRawValue();

      const campaignID = formValue.campaign?.id;
      const donatorID = formValue.donator?.id;

      if (campaignID && donatorID) {
        delete formValue.donator;
        delete formValue.campaign;
        const donation: Donation = {
          ...formValue,
          amount: isNaN(Number.parseInt(formValue.amount)) ? undefined : Number.parseInt(formValue.amount),
          campaignID,
          donatorID
        };
        this.donationService.addDonation(donation).subscribe();
      }
    }
    this.donationForm.reset();
  }

  filterDonators(value: string): void {
    const filterValueDonator = value.toLowerCase();

    this.filteredDonators = this.donatorList
      .filter(option =>
        option.firstName.toLowerCase().includes(filterValueDonator) ||
        option.lastName.toLowerCase().includes(filterValueDonator));
  }

  filterCampaigns(value: string): void {
    const filterValue = value.toLowerCase();

    this.filteredCampaigns = this.campaignList
      .filter(campaign =>
        campaign.name.toLowerCase().includes(filterValue)
      )
  }

  donatorAutocompleteFormatterFn = (donator: Donator): string => donator ? `${donator.lastName} ${donator.firstName}` : '';
  campaignAutocompleteFormatterFn = (campaign: Campaign): string => campaign ? `${campaign.name}` : '';

}