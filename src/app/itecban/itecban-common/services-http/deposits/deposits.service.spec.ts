import { TestBed, inject } from '@angular/core/testing';

import { DepositsService } from './deposits.service';

describe('DebitcardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepositsService]
    });
  });

  it('should ...', inject([DepositsService], (service: DepositsService) => {
    expect(service).toBeTruthy();
  }));
});
