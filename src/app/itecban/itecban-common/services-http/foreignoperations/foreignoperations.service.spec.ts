import { TestBed } from '@angular/core/testing';

import { ForeignoperationsService } from './foreignoperations.service';

describe('ForeignoperationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForeignoperationsService = TestBed.get(ForeignoperationsService);
    expect(service).toBeTruthy();
  });
});
