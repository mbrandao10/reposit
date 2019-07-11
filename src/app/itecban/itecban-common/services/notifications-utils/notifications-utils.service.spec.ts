import { TestBed, inject } from '@angular/core/testing';

import { NotificationsUtilsService } from './notifications-utils.service';

describe('NotificationsUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsUtilsService]
    });
  });

  it('should ...', inject([NotificationsUtilsService], (service: NotificationsUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
