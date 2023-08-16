import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationReportingComponent } from './donation-reporting.component';

describe('DonationReportingComponent', () => {
  let component: DonationReportingComponent;
  let fixture: ComponentFixture<DonationReportingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonationReportingComponent]
    });
    fixture = TestBed.createComponent(DonationReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
