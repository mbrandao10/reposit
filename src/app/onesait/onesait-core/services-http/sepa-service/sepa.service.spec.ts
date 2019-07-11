import { TestBed } from '@angular/core/testing';

import { SepaService } from './sepa.service';

describe('SepaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SepaService = TestBed.get(SepaService);
    expect(service).toBeTruthy();
  });
});
