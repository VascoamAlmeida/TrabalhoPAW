import { TestBed } from '@angular/core/testing';

import { ValesRestServiceService } from './vales-rest-service.service';

describe('ValesRestServiceService', () => {
  let service: ValesRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValesRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
