import { TestBed, inject } from '@angular/core/testing';

import { DebinService } from './debin.service';

describe('DebinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebinService]
    });
  });

  it('should ...', inject([DebinService], (service: DebinService) => {
    expect(service).toBeTruthy();
  }));
});
