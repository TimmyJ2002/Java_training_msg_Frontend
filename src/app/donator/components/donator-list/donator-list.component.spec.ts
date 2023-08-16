import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorListComponent } from './donator-list.component';

describe('DonatorListComponent', () => {
  let component: DonatorListComponent;
  let fixture: ComponentFixture<DonatorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonatorListComponent]
    });
    fixture = TestBed.createComponent(DonatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
