/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MailboxPageComponent } from './mailbox-page.component';
import { MailboxDetailComponent } from '../../components/mailbox-detail/mailbox-detail.component';
import { TranslateModule} from '@ngx-translate/core';


import { MailboxCreateComponent } from '../../components/mailbox-create/mailbox-create.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




describe('MailboxPageComponent', () => {
  let component: MailboxPageComponent;
  let fixture: ComponentFixture<MailboxPageComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TranslateModule, FormsModule, TranslateModule.forRoot()],
      declarations: [],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
