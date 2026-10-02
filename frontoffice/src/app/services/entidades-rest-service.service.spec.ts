import { TestBed } from '@angular/core/testing';

import { EntidadesRestServiceService } from './entidades-rest-service.service';

describe('EntidadesRestServiceService', () => {
  let service: EntidadesRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadesRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
