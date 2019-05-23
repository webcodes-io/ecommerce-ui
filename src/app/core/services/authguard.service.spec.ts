import { TestBed, inject } from '@angular/core/testing';

import { AuthguardService } from './authguard.service';

describe('Authguard.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguardService]
    });
  });

  it('should be created', inject([AuthguardService], (service: AuthguardService) => {
    expect(service).toBeTruthy();
  }));
});