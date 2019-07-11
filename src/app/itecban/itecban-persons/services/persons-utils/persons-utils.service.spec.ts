import { TestBed, inject } from '@angular/core/testing';

import { PersonsUtilsService } from './persons-utils.service';
import { ItecbanPersonsServiceMock } from '../../../itecban-common/mocks/service/itecban-persons-mock';


describe('PersonsUtilsService', () => {

  let mockPersonsService = new ItecbanPersonsServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonsUtilsService]
    });
  });

  it('should ...', () => {
    expect(mockPersonsService).toBeTruthy();
  });
});
