import { TestBed, inject } from '@angular/core/testing';

import { DocumentsUtilsService } from './documents-utils.service';

describe('DocumentsUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentsUtilsService]
    });
  });

  it('should ...', inject([DocumentsUtilsService], (service: DocumentsUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
