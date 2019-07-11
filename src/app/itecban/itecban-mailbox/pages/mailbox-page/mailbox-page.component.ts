import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MailboxService } from 'itecban-common';
import { ShareService } from 'onesait-core';

@Component({
  selector: 'app-mailbox-page',
  templateUrl: './mailbox-page.component.html'
})
export class MailboxPageComponent implements OnInit {

  protected paramsObservable: any;
  protected screenParam: any;
  view = 'mailbox';
  mailContentMovement: any;
  searchForm: any;
  mailboxCounter: number;
  searchParams: any;

  constructor(
    private mailboxService: MailboxService,
    private datePipe: DatePipe,
    private shareService: ShareService) { }


  ngOnInit() {
    this.initPage();
    this.initMobile();
    this.view = this.shareService.getDataAndClear('view');
    this.mailContentMovement = this.shareService.getDataAndClear('mailContent');
  }

  initPage() {
    this.searchForm = {};
    this.searchForm.dateFrom = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.searchForm.dateTo = this.searchForm.dateFrom;
    this.mailboxService.getConversationsCounter({ disableErrors: true }).subscribe(result => {
      this.mailboxCounter = result.data.numOfNewConversations;
    });
  }

  initMobile() { }

  newConversation() {
    this.view = 'newMailbox';
  }

  getSearchParams() {
    let params: any = {};
    let dateJson = {
      dateFrom: this.searchForm.dateFrom,
      dateTo: this.searchForm.dateTo
    };
    if (this.searchForm.keywords) {
      params.keywords = this.searchForm.keywords;
    }
    params.byDates = JSON.stringify(dateJson);
    return params;
  }

  search() {
    this.searchParams = this.getSearchParams();
    this.view = 'showSearch';
  }

  mailSended() {
    this.view = 'mailbox';
  }

}
