import { TestBed, inject } from '@angular/core/testing';

import { DoctorServicesService } from './doctor-services.service';

describe('DoctorServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorServicesService]
    });
  });

  it('should be created', inject([DoctorServicesService], (service: DoctorServicesService) => {
    expect(service).toBeTruthy();
  }));
});
