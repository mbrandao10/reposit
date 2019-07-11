import { TestBed } from '@angular/core/testing';

import { FactoringService } from './factoring.service';

describe('FactoringServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactoringService = TestBed.get(FactoringService);
    expect(service).toBeTruthy();
  });
});
