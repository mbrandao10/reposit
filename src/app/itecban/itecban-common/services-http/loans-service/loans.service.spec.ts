import { TestBed, inject } from '@angular/core/testing';

import { LoansService } from './loans.service';

describe('LoansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoansService]
    });
  });

  it('should ...', inject([LoansService], (service: LoansService) => {
    expect(service).toBeTruthy();
  }));
});
