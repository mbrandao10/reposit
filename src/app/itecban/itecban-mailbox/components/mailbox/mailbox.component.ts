import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as _moment from 'moment';
import { SearchConfig, DeviceUtilsService, SEARCH_CONFIG_TYPE, List, HeaderService, DatesValidator } from 'onesait-core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MailboxService } from 'itecban-common';
// const moment = _moment;
@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html'
})
export class MailboxComponent implements OnInit, OnDestroy {

  @Output()  conversationReaded = new EventEmitter<any>();
  protected listMailBoxObservable: Subscription;
  protected listMailBox: List;
  private deviceUtilsServiceSubscription: Subscription;

  formConfig: SearchConfig;
  filterSearchForm: FormGroup;
  extractForm: FormGroup;
  ismobileResolution: boolean;
  mailsBox: List;
  loading: boolean;
  hasMoreData: boolean;

  viewArchived: boolean;
  viewFilter: boolean;

  options: any = {};
  optionsArchived: any = {
    viewArchived: true
  };

  searchForm: any;
  selectContent: any;
  searchParams: any;
  conversationId: string;
  view = 'list';
  showFilters = false;

  header: any;
  mailboxHeader: any = {
    title: 'ITECBAN-MAILBOX.ALL.MESSAGES',
    title1: 'ITECBAN-MAILBOX.MESSAGES',
    actions: [
      { name: 'ITECBAN-MAILBOX.ARCHIVE', action: 'viewArchiveCheckFn' },
      { name: 'ITECBAN-MAILBOX.VIEW.ARCHIVED', action: 'viewArchivedFn' }
    ]
  };
  mailboxArchivedHeader: any = {
    title: 'ITECBAN-MAILBOX.ARCHIVED.MESSAGES',
    actions: [
      { name: 'ITECBAN-MAILBOX.VIEW.ALL.MESSAGES', action: 'viewMailboxFn' }
    ]
  };

  constructor(protected headerService: HeaderService,
    private mailboxService: MailboxService,
    protected deviceUtilsService: DeviceUtilsService
    ) {
    this.headerService.setTitle('ITECBAN-PERSONS.MY.SPACE.MESSAGES');
    this.listMailBox = new List(this.mailboxService, 'getConversations');
    this.header = this.mailboxArchivedHeader;
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
   });
  }


  ngOnInit() {
    this.createFormControl();
  }

  createFormControl() {
    this.filterSearchForm = new FormGroup({
      typeId: new FormControl(''),
      dateFrom: new FormControl('', [DatesValidator.DateInitialValidator]),
      dateTo: new FormControl('', [DatesValidator.DateInitialValidator])
    }, DatesValidator.groupValidationSearch('ITECBAN-ACCOUNT'));
    this.extractForm = new FormGroup({
      typeId: new FormControl('', Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required)
    });
    this.prepareSearch();
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonText = 'ITECBAN-ACCOUNT.MOVEMENT.FILTER.SEARCH';
    this.formConfig.mobileText = 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.SEARCHER-TEXT';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-MAILBOX.ALL.MESSAGES';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.TEXT,
        label: 'MENU.PRODUCTS',
        class: 'col-xs-12 col-sm-3',
        formControlName: 'typeId',
        selectText: 'name',
        selectValue: 'id'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.FROM',
        class: 'col-xs-12 col-sm-3',
        formControlName: 'dateFrom'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.TO',
        class: 'col-xs-12 col-sm-3',
        formControlName: 'dateTo',
      }
    ];
    this.next();
  }

  next() {
    let args = [this.filterSearchForm.value];
    if (this.listMailBoxObservable) {
      this.listMailBoxObservable.unsubscribe();
    }
    this.loading = true;
    this.listMailBoxObservable = this.listMailBox
    .next(args)
    .subscribe(this.successMovements, this.errorMovements);
  }

  private successMovements = (res) => {
    this.loading = false;
    this.mailsBox = res.data;
    if (res.paging && res.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorMovements = (error) => {
    this.loading = false;
    console.log(error);
  }

  ngOnDestroy(): void {
    this.deviceUtilsServiceSubscription.unsubscribe();
  }

}
