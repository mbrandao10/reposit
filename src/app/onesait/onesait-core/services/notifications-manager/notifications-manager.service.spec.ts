import { TestBed } from '@angular/core/testing';

import { NotificationsManagerService } from './notifications-manager.service';

describe('NotificationsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationsManagerService = TestBed.get(NotificationsManagerService);
    expect(service).toBeTruthy();
  });
});
