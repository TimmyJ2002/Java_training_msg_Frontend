import { TestBed } from '@angular/core/testing';

import { CreateDonatorService } from './createdonator.service';

describe('CreateDonatorServiceService', () => {
  let service: CreateDonatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDonatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
