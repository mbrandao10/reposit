import { TestBed, inject } from '@angular/core/testing';
import { DirectdebitsService } from './directdebits.service';

describe('DirectdebitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectdebitsService]
    });
  });

  it('should ...', inject([DirectdebitsService], (service: DirectdebitsService) => {
    expect(service).toBeTruthy();
  }));
});
