import { TestBed, inject } from '@angular/core/testing';

import { SchoolingService } from './schooling.service';

describe('SchoolingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolingService]
    });
  });

  it('should be created', inject([SchoolingService], (service: SchoolingService) => {
    expect(service).toBeTruthy();
  }));
});
