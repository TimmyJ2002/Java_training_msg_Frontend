import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDonatorComponent } from './delete-donator.component';

describe('DeleteDonatorComponent', () => {
  let component: DeleteDonatorComponent;
  let fixture: ComponentFixture<DeleteDonatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDonatorComponent]
    });
    fixture = TestBed.createComponent(DeleteDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
