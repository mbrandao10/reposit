import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Location} from '@angular/common';
import { MailboxCreatePageComponent } from './mailbox-create-page.component';
import { MailboxCreateComponent } from '../../components/mailbox-create/mailbox-create.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MailboxCreatePageComponent', () => {
  let component: MailboxCreatePageComponent;
  let fixture: ComponentFixture<MailboxCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        FormsModule,
        TranslateModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        MailboxCreatePageComponent
          ],
      providers: [
        {provide: Location}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
