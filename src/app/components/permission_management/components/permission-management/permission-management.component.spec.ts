import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionManagementComponent } from './permission-management.component';

describe('PermissionManagementComponent', () => {
  let component: PermissionManagementComponent;
  let fixture: ComponentFixture<PermissionManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionManagementComponent]
    });
    fixture = TestBed.createComponent(PermissionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
