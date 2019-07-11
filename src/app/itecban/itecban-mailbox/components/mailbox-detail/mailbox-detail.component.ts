import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceUtilsService } from 'onesait-core';

@Component({
  selector: 'app-mailbox-detail',
  templateUrl: './mailbox-detail.component.html'
})
export class MailboxDetailComponent implements OnInit {

  @Input() conversationId: any;

  @Output() conversationDeleted = new EventEmitter<any>();
  @Output() conversationClosed = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter();

  // mailDetail: any;
  // messageLimitExceeded = false;
  // userInitials: any = '';
  // canReply: boolean;
  // conversation: any;
  // showRespond = false;
  loading: boolean;

  constructor(
    protected deviceUtilsService: DeviceUtilsService) {
  }

  ngOnInit() {}

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
 }

 close() {
  this.closeEvent.emit();
}

}
