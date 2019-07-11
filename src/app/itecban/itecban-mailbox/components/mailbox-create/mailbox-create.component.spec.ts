/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { MailboxCreateComponent } from './mailbox-create.component';
import { MailboxService } from 'itecban-common/services-http/mailbox-service/mailbox.service';
import { ItecbanMailboxServiceMock } from '../../../itecban-common/mocks/service/itecban-mailbox-mock';
import { SharedServiceMock } from '../../../itecban-common/mocks/service/shared-service-mock';
import { ShareService } from 'itecban-common/services/share-service/share.service';

describe('MailboxCreateComponent', () => {
  let component: MailboxCreateComponent;
  let fixture: ComponentFixture<MailboxCreateComponent>;
  let mailboxServiceMock = new ItecbanMailboxServiceMock();
  let sharedMock = new SharedServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule,
        TranslateModule.forRoot()
        ],
      declarations: [ MailboxCreateComponent ],
      providers: [
         { provide: MailboxService, useValue: mailboxServiceMock  },
         { provide: Location},
         { provide: ShareService, useValue: sharedMock  }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
