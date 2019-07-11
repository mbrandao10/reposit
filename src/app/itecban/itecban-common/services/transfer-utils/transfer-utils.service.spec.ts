import { TestBed, inject } from '@angular/core/testing';

import { TransferUtilsService } from './transfer-utils.service';

describe('TransferUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferUtilsService]
    });
  });

  it('should ...', inject([TransferUtilsService], (service: TransferUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
