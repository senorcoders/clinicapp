import { TestBed, inject } from '@angular/core/testing';

import { CheckupsService } from './checkups.service';

describe('CheckupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckupsService]
    });
  });

  it('should be created', inject([CheckupsService], (service: CheckupsService) => {
    expect(service).toBeTruthy();
  }));
});
