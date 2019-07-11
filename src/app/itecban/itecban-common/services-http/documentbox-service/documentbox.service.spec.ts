/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentboxService } from './documentbox.service';

import { ItecbanDocumentBoxServiceMock } from '../../mocks/service/itecban-documentbox-mock';

describe('DocumentboxService', () => {
  let mockService = new ItecbanDocumentBoxServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentboxService]
    });
  });

  it('should ...', () => {
    expect(mockService).toBeTruthy();
    expect(mockService.getDocuments).toBeTruthy();
    mockService.getDocuments({}).subscribe(result => {
      expect(result['data']).toBeTruthy();
    });
  });
});
