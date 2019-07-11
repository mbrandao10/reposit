import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchConfig, SEARCH_CONFIG_TYPE, AppConfigService, FormatAccountPipe, TransferService, List, DeviceUtilsService, InputValidatorOptions, AccountsValidator, DatesValidator } from 'onesait-core';
import { AccountElement, GenericIdNameElement, TransferOutput, CreditElement, InterTransferSearch } from 'onesait-api';
import { Subscription } from 'rxjs';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'osb-transfer-historic-inter',
  templateUrl: './transfer-historic-inter.component.html'
})
export class TransferHistoricInterComponent implements OnInit {

  protected listTransfersObservable: Subscription;
  protected listTransfers: List;

  inputValidatorOptionsIni: InputValidatorOptions;
  inputValidatorOptionsEnd: InputValidatorOptions;

  loading: boolean;
  filterSearchForm: FormGroup;
  formConfig: SearchConfig;
  transferModes: GenericIdNameElement[];
  accountsToSelect: GenericIdNameElement[] = [];
  accountFormatView: string;
  transfers: TransferOutput[];
  selectedItem: '';
  hasMoreData: boolean;
  interTransferSearch: InterTransferSearch;

  @Input() accounts: AccountElement[];
  @Input() credits: CreditElement[];

  constructor(
    private transferService: TransferService,
    private appConfigService: AppConfigService,
    private formatAccountPipe: FormatAccountPipe,
    private deviceUtilsService: DeviceUtilsService
  ) {

  }

  ngOnInit() {
    this.listTransfers = new List(this.transferService, 'get');
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.createFormValidation();
    this.createFormControl();
    this.loadDataForm();
    // this.getAccounts();
    // this.getTransfers();
  }

  loadDataForm() {
    this.accountsToSelect.push({name: '', id: ''});
    if (this.accounts) {
      this.accounts.forEach(element => {
        this.accountsToSelect.push({
          name: this.formatAccountPipe.transform(element.formats, this.accountFormatView),
          id: element.id
        });
      });
    }
    if (this.credits && this.credits.length > 0) {
      this.credits.forEach(element => {
        this.accountsToSelect.push({
          name: this.formatAccountPipe.transform(element.formats, this.accountFormatView),
          id: element.id
        });
      });
    }
  }

  createFormValidation() {
    this.inputValidatorOptionsIni = <InputValidatorOptions>{
      errorText: {
        INVALIDDATE: 'Fecha inicial superior a la del día'
      }
    };
    this.inputValidatorOptionsEnd = <InputValidatorOptions>{
      errorText: {
        INVALIDDATE: 'Fecha fin mayor a la del día'
      }
    };
  }

  isMobileResolution(): boolean {
    return this.deviceUtilsService.isMobileResolution;
  }
  // getAccounts() {
  //   this.loading = true;
  //   this.accountService.getAccounts().subscribe(results => {
  //     this.accounts = results.data;
  //     this.loading = false;

  //     this.accounts.forEach(element => {
  //       this.accountsToSelect.push({
  //         name: this.formatAccountPipe.transform(element.formats, this.accountFormatView),
  //         id: element.id});
  //     });
  //   }, (e) => {
  //     console.log(e);
  //     this.loading = true;
  //   });
  // }

  createFormControl() {
    let fechaIni = new Date;
    fechaIni.setDate(fechaIni.getDate() - 5);
    this.filterSearchForm = new FormGroup({
      accountId: new FormControl('', Validators.required),
      dateFrom: new FormControl(fechaIni,  [Validators.required, DatesValidator.DateInvalidDateValidator]),
      dateTo: new FormControl(new Date, [Validators.required, DatesValidator.DateInvalidDateValidator]),
      type: new FormControl('issued')
    }, AccountsValidator.groupValidationSearch('ITECBAN-ACCOUNT'));
    this.prepareSearch();
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonFloatRight = true;
    this.formConfig.buttonText = 'ONESAIT-TRANSFERS.HISTORIC.FILTER.SEARCH';
    this.formConfig.mobileText = 'ONESAIT-TRANSFERS.INTERNATIONAL.TEXT';
    this.formConfig.mobileSearcherTitle = 'ONESAIT-TRANSFERS.INTERNATIONAL.TEXT';
    this.formConfig.buttonDivClass = 'col-xs-12 col-sm-12 col-md-2  mb-1 mt-1';

    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-TRANSFERS.HISTORIC.FILTER.ACCOUNT-SELECT',
        class: 'col-xs-12 col-sm-6 col-md-4',
        formControlName: 'accountId',
        elements: this.accountsToSelect,
        selectText: 'name',
        selectValue: 'id'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.FROM',
        class: 'col-xs-12 col-sm-3 col-md-3',
        formControlName: 'dateFrom',
        // opts: this.inputValidatorOptionsIni
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.TO',
        class: 'col-xs-12 col-sm-3 col-md-3',
        formControlName: 'dateTo',
        maxDate: new Date(),
        // opts: this.inputValidatorOptionsEnd
      }
    ];
  }

  getTransfers() {
    this.listTransfers.reset();

    this.interTransferSearch = { dateTo: '', dateFrom: '', accountId: '', mode: 'INTERNATIONAL' };
    if (this.filterSearchForm.value.dateTo) {
      this.interTransferSearch.dateTo = moment(this.filterSearchForm.value.dateTo).format('YYYY-MM-DD');
    }
    if (this.filterSearchForm.value.dateFrom) {
      this.interTransferSearch.dateFrom = moment(this.filterSearchForm.value.dateFrom).format('YYYY-MM-DD');
    }
    if (this.filterSearchForm.value.accountId) {
      this.interTransferSearch.accountId = this.filterSearchForm.value.accountId;
    }
    if (this.filterSearchForm.value.type) {
      this.interTransferSearch.type = this.filterSearchForm.value.type;
    }

    if (this.filterSearchForm.value.dateTo === '') {
      this.filterSearchForm.get('dateTo').setErrors({ 'required': true });
    }

    this.next();
  }

  next() {
    this.loading = true;

    let args = [this.interTransferSearch];

    if (this.listTransfersObservable) {
      this.listTransfersObservable.unsubscribe();
    }
    this.listTransfersObservable = this.listTransfers.next(args).subscribe(results => {
      this.loading = false;
      this.transfers = results.data;
      if (results.paging && results.paging.hasMorePages) {
        this.hasMoreData = true;
      } else {
        this.hasMoreData = false;
      }
    }, (e) => {
      this.loading = false;
      this.transfers = null;
      console.log(e);
    });

  }

  viewDetail(transfer) {
    if (this.selectedItem === transfer.id) {
      this.selectedItem = '';
    } else {
      this.selectedItem = transfer.id;
    }
  }

  close(): void {
    this.selectedItem = null;
  }

}
