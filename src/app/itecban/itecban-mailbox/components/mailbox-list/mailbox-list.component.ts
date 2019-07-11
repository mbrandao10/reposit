import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

// import { MailboxService } from 'itecban-common';

import * as _ from 'underscore';
import { List, DeviceUtilsService } from 'onesait-core';

@Component({
  selector: 'app-mailbox-list',
  templateUrl: './mailbox-list.component.html'
})
export class MailboxListComponent implements OnInit, OnChanges {

  @Input()
  searchParams: any;

  /**
   * options.viewArchived  indica si tenemos que ver los archivados o no
   * options.viewArchiveCheck visualiza los checks para archivar o no
   */
  @Input()  mailsBox: List;

  @Output()
  conversationSelected = new EventEmitter<any>();

  // conversations: any;
  conversationId: any;
  // conversationsTypes: any;
  view = 'list';
  loading: boolean;

  constructor(protected deviceUtilsService: DeviceUtilsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  viewDetail(conversation: any) {
    if (conversation.id !== this.conversationId) {
      this.loading = false;
      this.conversationId = conversation.id;
    } else {
      this.conversationId = null;
    }
    // this.conversationSelected.emit(conversation);
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
 }

 close() {
  this.conversationId = null;
}

}
