import { TestBed } from '@angular/core/testing';

import { CashpoolingService } from './cashpooling.service';

describe('CashpoolingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashpoolingService = TestBed.get(CashpoolingService);
    expect(service).toBeTruthy();
  });
});
