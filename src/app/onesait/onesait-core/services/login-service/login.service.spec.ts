/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { LoginServiceMock } from '../../mocks/service/login-service-mock';

describe('LoginServiceService', () => {

  let mockService = new LoginServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
  });

  it('should ...', () => {
    expect(mockService).toBeTruthy();
  });
});
