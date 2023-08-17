import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCreateComponent } from './campaign-create.component';

describe('CampaignCreateComponent', () => {
  let component: CampaignCreateComponent;
  let fixture: ComponentFixture<CampaignCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignCreateComponent]
    });
    fixture = TestBed.createComponent(CampaignCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
