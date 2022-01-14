import { TestBed } from '@angular/core/testing';

import { NausService } from './naus.service';

describe('NausService', () => {
  let service: NausService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NausService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
