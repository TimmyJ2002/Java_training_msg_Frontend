import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorComponent } from './createdonator.component';

describe('DonatorComponent', () => {
  let component: DonatorComponent;
  let fixture: ComponentFixture<DonatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonatorComponent]
    });
    fixture = TestBed.createComponent(DonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
