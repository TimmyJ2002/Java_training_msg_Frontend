import {Component, OnInit} from '@angular/core';
import {Role} from "../../models/role";
import {PermissionManagementService} from "../../services/permission-management.service";
import {LanguageService} from "../../../../services/language.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.css'],
})
export class PermissionManagementComponent implements OnInit {

  rolesList: Role[] = [];
  displayedColumns: string[] = ['name'];
  selectedRole: Role | null = null;
  selectedRights: string[] = [];
  possibleRights: string[] = [
    'PERMISSION_MANAGEMENT',
    'USER_MANAGEMENT',
    'CAMP_MANAGEMENT',
    'BENEF_MANAGEMENT',
    'DONATION_MANAGEMENT',
    'DONATION_APPROVE',
    'DONATION_REPORTING',
    'CAMP_REPORTING',
    'CAMP_IMPORT',
    'CAMP_REPORT_RESTRICTED'
  ];
  selected: Boolean = false;

  ngOnInit(): void {
    this.permissionManagementService.loadRoles().subscribe((role) => {
      this.rolesList = role;
      });
  }

  onSelected() {
    this.selectedRights = [];
    this.selectedRole?.rights.forEach((right) => this.selectedRights.push(right.roleRight));
    this.selected = true;
  }

  onNgModelChange() {
  }

  updateRole() {
    if (this.selectedRole) {
      this.permissionManagementService.updateRole({
        ...this.selectedRole,
        rights: this.selectedRights.map(selectedRight => this.selectedRole?.rights.find((r) => r.roleRight === selectedRight) || {roleRight: selectedRight})
      }).subscribe(() => {
        this.permissionManagementService.loadRoles().subscribe((role) => {
          this.rolesList = role;
        });
        this._snackBar.open("Role's rights have been updated successfully!", "Close");
      },
      () => {
          this._snackBar.open("Role's rights could not be updated", "Close");
      })
    }
    this.selectedRights = [];

  }

  constructor(private permissionManagementService: PermissionManagementService,
              private languageService: LanguageService,
              private _snackBar: MatSnackBar) { }

  protected readonly screenLeft = screenLeft;

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  getTranslatedMessage(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
