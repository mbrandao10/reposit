import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import * as _ from 'underscore';
import { MailboxService } from 'itecban-common';
import { AppConfigService, ShareService } from 'onesait-core';

@Component({
  selector: 'app-mailbox-create',
  templateUrl: './mailbox-create.component.html'
})
export class MailboxCreateComponent implements OnInit {

  @Output() mailSended: EventEmitter<any> = new EventEmitter<any>();

  @Input() isRespond: boolean;
  @Input() conversationId: string;

  files: any = [];
  mail: any = {};
  types: any;
  loading: boolean;
  maxNumberOfDocumentsAttached: any;


  constructor(
    private mailboxService: MailboxService,
    private location: Location,
    private shareService: ShareService,
    private appConfigService: AppConfigService
  ) {
    this.maxNumberOfDocumentsAttached = this.appConfigService.getConfig().maxNumberOfDocumentsAttached;
  }

  ngOnInit() {
    // this.mail = this.mailContentMovement;
    this.mailboxService.getConversationsTypes().subscribe(result => {
      this.types = result.data;
    });
    if (this.shareService.getData('mailContent')) {
      this.mail = this.shareService.getDataAndClear('mailContent');
    }
    // this.mail.type='';
  }

  getForm() {
    let formData = new FormData();
    formData.append('body', this.mail.body);
    formData.append('subject', this.mail.subject);
    formData.append('type', this.mail.type);
    for (let i = 0; i < this.files.length; i++) {
      formData.append('file' + i, this.files[i]);
    }
    return formData;
  }

  send() {
    this.loading = true;
    let formData = this.getForm();
    if (this.isRespond) {
      if (this.conversationId) {
        this.mailboxService.saveConversationRespond(this.conversationId, formData).subscribe(() => {
          if (this.mailSended) {
            this.mailSended.emit();
            this.mail = {};
            this.files = [];
          }
          this.loading = false;
        }, () => this.loading = false);
      }
    } else {
      this.mailboxService.saveConversation(formData).subscribe(() => {
        if (this.mailSended) {
          this.mailSended.emit();
        }
        this.loading = false;
      }, () => this.loading = false);
    }
  }

  back() {
    this.location.back();
  }

  fileChange(event: any) {
    this.files.push(event.srcElement.files[0]);
    event.srcElement.value = '';
  }

  removeAttachment(file: any) {
    this.files = _.without(this.files, file);
  }

}
