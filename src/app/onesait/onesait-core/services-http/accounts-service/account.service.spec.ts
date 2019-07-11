/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountService } from './account.service';
import {ItecbanAccountServiceMock} from '../../mocks/service/itecban-accounts-mock';

describe('AccountService', () => {
  let mockService = new ItecbanAccountServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService]
    });
  });

  it('should ...',  () => {
    expect(mockService).toBeTruthy();
    expect(mockService.getAccounts).toBeTruthy();
    mockService.getAccounts().subscribe(function(result: any) {

    });
  });
});
