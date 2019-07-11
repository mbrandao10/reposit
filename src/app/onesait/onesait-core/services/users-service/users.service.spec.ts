/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { UsersServiceMock } from '../../mocks/service/login-service-mock';

describe('UsersServiceService', () => {

  let mockService = new UsersServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService]
    });
  });

  it('should ...', () => {
    expect(mockService).toBeTruthy();
  });
});
