import { TestBed, inject } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import { ItecbanPersonsServiceMock } from '../../../itecban-common/mocks/service/itecban-persons-mock';

describe('CustomersService', () => {

  let mockPersonsService = new ItecbanPersonsServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomersService]
    });
  });

  it('should ...', () => {
    expect(mockPersonsService).toBeTruthy();
  });
});
