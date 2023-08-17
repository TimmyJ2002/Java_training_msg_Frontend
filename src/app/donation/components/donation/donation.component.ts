import { Component } from '@angular/core';
import {Donator} from "../../../donator/models/donator";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../user/services/user.service";
import {
  PermissionManagementService
} from "../../../components/permission_management/services/permission-management.service";
import {CreateDonatorService} from "../../../donator/services/createdonator.service";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent {
  donationForm!: FormGroup;
  donatorList: Donator[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private donatorService: CreateDonatorService
  ) {
  }

  ngOnInit(): void {
    this.initUserForm();
    this.donatorService.getDonors().subscribe((donator) => {
      this.donatorList = donator;
    });
  }

  private initUserForm() {
    this.donationForm = this.formBuilder.group({
      // amount: ['', [Validators.required]]
    })
  }

  onSubmit() {
    console.log("yay")
  }
}
