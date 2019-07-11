/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { MailboxListComponent } from './mailbox-list.component';
import { MailboxDetailComponent } from '../mailbox-detail/mailbox-detail.component';
import { MailboxCreateComponent } from '../mailbox-create/mailbox-create.component';

import { MailboxService } from 'itecban-common/services-http/mailbox-service/mailbox.service';

import { ItecbanMailboxServiceMock } from '../../../itecban-common/mocks/service/itecban-mailbox-mock';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



describe('MailboxListComponent', () => {
  let component: MailboxListComponent;
  let fixture: ComponentFixture<MailboxListComponent>;
  let mailboxServiceMock = new ItecbanMailboxServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        TranslateModule,
        TranslateModule.forRoot()],
      declarations: [ MailboxListComponent, MailboxCreateComponent ],
      providers: [
         { provide: MailboxService, useValue: mailboxServiceMock  }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxListComponent);
    component = fixture.componentInstance;
    component.conversationId = '15';
    component.options = {};
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    mailboxServiceMock.getConversations({}).subscribe(result => {
      expect(result['data']).toBeTruthy();
      expect(result['data'].length).toBeGreaterThanOrEqual(0);
    });
  });


});
