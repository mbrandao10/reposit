import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentboxService, DocumentElement } from 'itecban-common';
import { UtilsService, List, SearchConfig, SEARCH_CONFIG_TYPE, AppConfigService, DeviceUtilsService, HeaderService, DatesValidator, FormatAccountPipe, AccountsValidator, ShareService } from 'onesait-core';
import { AccountService } from 'onesait-core';
import { Subscription, forkJoin } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericIdNameElement } from 'onesait-api';
import * as _moment from 'moment';
const moment = _moment;



@Component({
  selector: 'app-documentbox-list',
  templateUrl: './documentbox-list.component.html'
})
export class DocumentboxListComponent implements OnInit, OnDestroy {

  // @Input() searchParams: any;
  protected listDocumentsObservable: Subscription;
  protected listDocuments: List;
  private deviceUtilsServiceSubscription: Subscription;

  accounts: GenericIdNameElement[] = [];
  categories: GenericIdNameElement[] = [];
  formConfig: SearchConfig;
  filterSearchForm: FormGroup;
  accountFormatView: string;
  hasMoreData: boolean;
  documents: DocumentElement[];
  loading: boolean;
  ismobileResolution: boolean;
  movementDoc: any;
  dateToInitial: string;
  dateFromInitial: string;

  constructor(
    private documentboxService: DocumentboxService,
    private formatAccountPipe: FormatAccountPipe,
    private utilsService: UtilsService,
    private accountService: AccountService,
    private appConfigService: AppConfigService,
    private shareService: ShareService,
    protected headerService: HeaderService,
    protected deviceUtilsService: DeviceUtilsService) {
    this.headerService.setTitle('ITECBAN-PERSONS.MY.SPACE.DOCUMENTS');
    this.listDocuments = new List(this.documentboxService, 'getDocuments');
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
  }

  ngOnInit() {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.createFormControl();
    this.loadComboSearch();
  }

  createFormControl() {
    this.filterSearchForm = new FormGroup({
      contractId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      typeId: new FormControl(''),
      dateFrom: new FormControl('', [DatesValidator.DateInitialValidator, Validators.required]),
      dateTo: new FormControl('', [DatesValidator.DateEndValidator, Validators.required])
    }, AccountsValidator.groupValidationSearch('ITECBAN-ACCOUNT'));
  }

  loadComboSearch() {
    let observableData: any = [];
    observableData.push(this.accountService.getAccounts());
    observableData.push(this.documentboxService.getCategories());
    this.loading = true;

    forkJoin(observableData).subscribe((result: any) => {
      result[0].data.forEach(element => {
        this.accounts.push({
          name: this.formatAccountPipe.transform(element.formats, this.accountFormatView),
          id: element.id
        });
      });
      this.categories = result[1].data;
      this.accounts.unshift({ name: '', id: '' });
      this.categories.unshift({ name: '', id: '' });
      this.loading = false;
      this.prepareSearch();

    }, () => {
      this.loading = false;
    });
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonText = 'ITECBAN-DOCUMENTS.SEARCH.BUTTON';
    this.formConfig.mobileText = 'ITECBAN-DOCUMENTS.SEARCH.MOBILE-TITLE';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-DOCUMENTS.SEARCH.MOBILE-TITLE';
    this.formConfig.buttonDivClass = 'col-xs-12 col-sm-4 col-md-4 mb-1 mt-1';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ITECBAN-DOCUMENTS.SEARCH.ACCOUNTS',
        class: 'col-xs-12 col-sm-6 col-md-6',
        formControlName: 'contractId',
        elements: this.accounts,
        selectText: 'name',
        selectValue: 'id'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ITECBAN-DOCUMENTS.SEARCH.CATEGORYDOC',
        class: 'col-xs-12 col-sm-6 col-md-6',
        formControlName: 'categoryId',
        elements: this.categories,
        selectText: 'name',
        selectValue: 'id'
      },
      // {
      //   type: SEARCH_CONFIG_TYPE.SELECT,
      //   label: 'ITECBAN-PERSONS.MY.SPACE.TYPEDOC',
      //   // class: 'col-xs-12 col-sm-4 col-md-3',
      //   class: 'col-xs-12 col-sm-4',
      //   formControlName: 'typeId',
      //   elements: [],
      //   selectText: 'name',
      //   selectValue: 'id'
      // },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.FROM',
        class: 'col-xs-12 col-sm-4 col-md-4',
        formControlName: 'dateFrom',
        maxDate: new Date()
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.TO',
        class: 'col-xs-12 col-sm-4 col-md-4',
        formControlName: 'dateTo',
        maxDate: new Date()
      }
    ];

    this.preloadMovement();
  }

  preloadMovement() {
    if (this.shareService.getData('movement')) {
      this.movementDoc = this.shareService.getData('movement');
      this.shareService.removeData('movement');
      this.filterSearchForm.controls.contractId.setValue(this.movementDoc.accountId);
      this.filterSearchForm.controls.categoryId.setValue(this.categories[1].id); // TODOS
      let dateFrom = moment(this.movementDoc.dateFrom).format('DD-MM-YYYY');
      let dateTo = moment(this.movementDoc.dateTo).format('DD-MM-YYYY');
      this.filterSearchForm.controls.dateFrom.setValue(dateFrom);
      this.filterSearchForm.controls.dateTo.setValue(dateTo);
      this.refreshModel();
      this.getDocuments();
    } else {
      let date = new Date();
      let dateToInitial = date.getDate() + date.getTime();
      let dateFromInitial = date.getDate() + date.getTime() - 604800000;

      this.dateFromInitial = moment(dateFromInitial).format('YYYY-MM-DD');
      this.dateToInitial = moment(dateToInitial).format('YYYY-MM-DD');
      this.filterSearchForm.controls.categoryId.setValue(this.categories[1].id);
      let dateFrom = moment(dateFromInitial).format('DD-MM-YYYY');
      let dateTo = moment(dateToInitial).format('DD-MM-YYYY');

      this.filterSearchForm.controls.dateFrom.setValue(dateFrom);
      this.filterSearchForm.controls.dateTo.setValue(dateTo);

      this.refreshModel();
    }
  }

  refreshModel() {
    this.filterSearchForm.get('dateFrom').clearValidators();
    this.filterSearchForm.get('dateFrom').updateValueAndValidity();
    this.filterSearchForm.get('dateTo').clearValidators();
    this.filterSearchForm.get('dateTo').updateValueAndValidity();
    this.filterSearchForm.get('categoryId').clearValidators();
    this.filterSearchForm.get('categoryId').updateValueAndValidity();
  }

  getDocuments() {
    this.listDocuments.reset();
    this.next();
  }

  next() {
    let args: any;

    args = [this.filterSearchForm.value];

    if (this.filterSearchForm.get('dateFrom').value && this.filterSearchForm.get('dateFrom').dirty) {
      args[0].dateFrom = this.utilsService.dateToRFC3339(this.filterSearchForm.get('dateFrom').value);
    } else if (this.movementDoc) {
      args[0].dateFrom = moment(this.movementDoc.dateFrom).format('YYYY-MM-DD');
    } else {
      args[0].dateFrom = this.dateFromInitial;
    }

    if (this.filterSearchForm.get('dateTo').value && this.filterSearchForm.get('dateTo').dirty) {
      args[0].dateTo = this.utilsService.dateToRFC3339(this.filterSearchForm.get('dateTo').value);
    } else if (this.movementDoc) {
      args[0].dateTo = moment(this.movementDoc.dateTo).format('YYYY-MM-DD');
    } else {
      args[0].dateTo = this.dateToInitial;
    }



    if (this.listDocumentsObservable) {
      this.listDocumentsObservable.unsubscribe();
    }
    this.loading = true;
    this.listDocumentsObservable = this.listDocuments.next(args).subscribe(this.successMovements, this.errorMovements);
  }

  private successMovements = (res) => {
    this.loading = false;
    this.documents = res.data;
    if (res.paging && res.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorMovements = (error) => {
    this.loading = false;
    this.documents = undefined;
    console.log(error);
  }

  downloadDetail(document: any) {
    this.loading = true;
    this.documentboxService.getDocument(document.id).subscribe(results => {
      this.utilsService.downloadBlob(results, document.id);
      this.loading = false;
      let index = this.documents.findIndex((item) => item.id === document.id);

      this.documents[index].isRead = true;
    }, () => {
      this.loading = false;
    });
  }


  ngOnDestroy(): void {
    this.deviceUtilsServiceSubscription.unsubscribe();
    this.filterSearchForm.reset();
  }
}
