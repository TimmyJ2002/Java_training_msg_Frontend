import {Component, OnInit} from '@angular/core';
import {Role} from "../../models/role";
import {PermissionManagementService} from "../../services/permission-management.service";
import {RoleRight} from "../../models/right";

@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.css'],
})
export class PermissionManagementComponent implements OnInit {

  rolesList: Role[] = [];
  displayedColumns: string[] = ['id', 'name'];
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

  saveRights() {
    var exists = false;
    this.selectedRole?.rights.forEach((right) => {
      if (!this.selectedRights.includes(right.roleRight)) {
        this.permissionManagementService.removeRight(this.selectedRole?.id, right.roleRight).subscribe();
      }
    })
    this.selectedRights.forEach((right) => {
      exists = false;
      if (this.selectedRole?.rights) {
        this.selectedRole.rights.forEach((existingRoleRight) => {
          if (right == existingRoleRight.roleRight) exists = true;
        });
        if (!exists) {
          this.permissionManagementService.addRight(this.selectedRole?.id, right).subscribe();
        }
      }
    });
  }

  constructor(private permissionManagementService: PermissionManagementService) { }

  protected readonly screenLeft = screenLeft;

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
