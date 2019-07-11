import { TestBed, inject } from '@angular/core/testing';

import { JsonUtilsService } from './json-utils.service';

describe('JsonUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonUtilsService]
    });
  });

  it('should ...', inject([JsonUtilsService], (service: JsonUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
