import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { MailboxComponent } from './mailbox.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MailboxComponent', () => {
  let component: MailboxComponent;
  let fixture: ComponentFixture<MailboxComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MailboxComponent],
      imports: [
        TranslateModule,
        TranslateModule.forRoot(),
        FormsModule
      ],
      providers: [

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
