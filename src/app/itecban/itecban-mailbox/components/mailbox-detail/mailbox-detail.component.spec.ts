/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { MailboxDetailComponent } from './mailbox-detail.component';

describe('MailboxDetailComponent', () => {
  let component: MailboxDetailComponent;
  let fixture: ComponentFixture<MailboxDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule,
        TranslateModule.forRoot()
         ],
      declarations: [ ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxDetailComponent);
    component = fixture.componentInstance;
    component.conversationId = '15';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /*it('should delete', () => {
    component.deleteConversation();
    expect(component).toBeTruthy();
  });*/
});
