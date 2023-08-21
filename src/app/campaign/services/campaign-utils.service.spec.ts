import { TestBed } from '@angular/core/testing';

import { CampaignUtilsService } from './campaign-utils.service';

describe('CampaignUtilsService', () => {
  let service: CampaignUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
