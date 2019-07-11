/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MailboxService } from './mailbox.service';

import { RequestService } from 'itecban-common/itecban-common.module';
import { ItecbanMailboxServiceMock } from '../../mocks/service/itecban-mailbox-mock';


describe('MailboxService', () => {
  let mailboxService = new ItecbanMailboxServiceMock();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailboxService]
    });
  });

  it('should ...', () => {
    expect(mailboxService).toBeTruthy();
    expect(mailboxService.getConversations).toBeTruthy();
    mailboxService.getConversations({}).subscribe(result => {
      expect(result['data']).toBeTruthy();
    });

  });
});
