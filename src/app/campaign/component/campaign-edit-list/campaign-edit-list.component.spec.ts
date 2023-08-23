import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignEditListComponent } from './campaign-edit-list.component';

describe('CampaignEditListComponent', () => {
  let component: CampaignEditListComponent;
  let fixture: ComponentFixture<CampaignEditListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignEditListComponent]
    });
    fixture = TestBed.createComponent(CampaignEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
