import { TestBed } from '@angular/core/testing';

import { NbExpressBillService } from './nb-express-bill.service';

describe('NbExpressBillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NbExpressBillService = TestBed.get(NbExpressBillService);
    expect(service).toBeTruthy();
  });
});
