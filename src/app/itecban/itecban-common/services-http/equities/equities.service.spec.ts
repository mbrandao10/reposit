import { TestBed } from '@angular/core/testing';

import { EquitiesService } from './equities.service';

describe('EquitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquitiesService = TestBed.get(EquitiesService);
    expect(service).toBeTruthy();
  });
});
