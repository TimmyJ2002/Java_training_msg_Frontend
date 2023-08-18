import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignReportingComponent } from './campaign-reporting.component';

describe('CampaignReportingComponent', () => {
  let component: CampaignReportingComponent;
  let fixture: ComponentFixture<CampaignReportingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignReportingComponent]
    });
    fixture = TestBed.createComponent(CampaignReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
