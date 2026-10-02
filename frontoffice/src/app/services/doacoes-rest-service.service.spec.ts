import { TestBed } from '@angular/core/testing';

import { DoacoesRestServiceService } from './doacoes-rest-service.service';

describe('DoacoesRestServiceService', () => {
  let service: DoacoesRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoacoesRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
