import { TestBed } from '@angular/core/testing';

import { UsersRestServiceService } from './users-rest-service.service';

describe('UsersRestServiceService', () => {
  let service: UsersRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
