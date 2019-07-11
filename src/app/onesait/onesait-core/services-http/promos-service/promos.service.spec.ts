import { TestBed } from '@angular/core/testing';

import { PromosService } from './promos.service';

describe('PromosServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromosService = TestBed.get(PromosService);
    expect(service).toBeTruthy();
  });
});
