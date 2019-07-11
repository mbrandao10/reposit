import { Component, OnDestroy, Input, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AccountService, SearchConfig, SEARCH_CONFIG_TYPE, ModalComponent, Json2PdfFieldDefinition, InfoHeaderService, DeviceUtilsService, InputValidatorOptions, DatesValidator, AccountsValidator, RouterHelperService } from 'onesait-core';
import { ShareService, UtilsService, List } from 'onesait-core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountMovement, GenericListResponse, DatesFromTo } from 'onesait-api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as _moment from 'moment';
const moment = _moment;

/**
 * Component for render a list of movements
 */
@Component({
  selector: 'app-account-movements',
  templateUrl: './account-movements.component.html'
})

export class AccountMovementsComponent implements OnInit, OnDestroy {
  protected listMovementsObservable: Subscription;
  listMovements: List;

  fadeNone = false;

  movements: GenericListResponse<AccountMovement>;
  loading: boolean;
  viewFilter: boolean;
  date: Date = new Date();
  firsDayMonth: Date = new Date(
    this.date.getFullYear(),
    this.date.getMonth(),
    1,
    12
  );
  noData = false;
  showFilters = false;
  ismobileResolution: boolean;
  private deviceUtilsServiceSubscription: Subscription;

  /**
   * Input parameter, Id of the account, used to ask the movement detail
   */
  @Input() accountId: any;
  @ViewChild('modal') modal: ModalComponent;
  selectedItem: any;
  selectedId: any;
  filterSearchForm: FormGroup;
  extractForm: FormGroup;
  formConfig: SearchConfig;
  hasMoreData: boolean;
  datesSearch: DatesFromTo;



  inputValidatorOptionsIni: InputValidatorOptions;
  inputValidatorOptionsEnd: InputValidatorOptions;

  constructor(
    protected accountService: AccountService,
    protected shareService: ShareService,
    protected utilsService: UtilsService,
    protected renderer: Renderer2,
    protected router: Router,
    protected infoHeaderService: InfoHeaderService,
    protected translateService: TranslateService,
    protected routerHelperService: RouterHelperService,
    protected deviceUtilsService: DeviceUtilsService
  ) {
    this.deviceUtilsServiceSubscription = deviceUtilsService
      .changeScreenSize()
      .subscribe(_screenSize => {
        this.ismobileResolution = deviceUtilsService.isMobileResolution;
      });
  }

  ngOnInit() {
    this.createFormControl();
    this.createFormValidation();
    this.listMovements = new List(this.accountService, 'getMovements');
    this.loading = true;
    this.viewFilter = false;
    this.prepareSearch();
    this.getMovements();
  }

  createFormControl() {
    this.filterSearchForm = new FormGroup({
      dateFrom: new FormControl('', [AccountsValidator.DateInitialValidator, DatesValidator.DateInvalidDateValidator]),
      dateTo: new FormControl('', [DatesValidator.DateInvalidDateValidator, AccountsValidator.DateEndValidator])
    }, AccountsValidator.groupValidationSearch('ITECBAN-ACCOUNT'));

    this.extractForm = new FormGroup({
      dateFrom: new FormControl('', [Validators.required, AccountsValidator.DateInitialValidator]),
      dateTo: new FormControl('', [Validators.required, AccountsValidator.DateEndValidator])
    }, AccountsValidator.groupValidationSearch('ITECBAN-ACCOUNT'));
  }

  createFormValidation() {
    this.inputValidatorOptionsIni = <InputValidatorOptions>{
      errorText: {
        INVALIDDATE: 'ONESAIT-CORE.INPUT-VALIDATOR.INITDATEMORE'
      }
    };
    this.inputValidatorOptionsEnd = <InputValidatorOptions>{
      errorText: {
        INVALIDDATE: 'ONESAIT-CORE.INPUT-VALIDATOR.ENDDATEMORE'
      }
    };
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonText = 'ITECBAN-ACCOUNT.MOVEMENT.FILTER.SEARCH';
    this.formConfig.mobileText = 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.SEARCHER-TEXT';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.SEARCHER-TITLE';
    this.formConfig.buttonDivClass = 'col-xs-12 col-sm-4 col-md-4  mb-1 mt-1';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.FROM',
        class: 'col-xs-12 col-sm-4 col-md-4',
        formControlName: 'dateFrom',
        opts: this.inputValidatorOptionsIni
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.TO',
        class: 'col-xs-12 col-sm-4 col-md-4',
        formControlName: 'dateTo',
        maxDate: new Date(),
        opts: this.inputValidatorOptionsEnd
      }
    ];
  }

  getMovements() {
    this.listMovements.reset();
    this.datesSearch = { dateTo: '', dateFrom: '' };
    if (this.filterSearchForm.value.dateFrom) {
      // this.filterSearchForm.value.dateFrom = moment(this.filterSearchForm.value.dateFrom).format('YYYYMMDD');
      this.datesSearch.dateFrom = moment(this.filterSearchForm.value.dateFrom).format('YYYYMMDD');
    }
    if (this.filterSearchForm.value.dateTo) {
      // this.filterSearchForm.value.dateTo = moment(this.filterSearchForm.value.dateTo).format('YYYYMMDD');
      this.datesSearch.dateTo = moment(this.filterSearchForm.value.dateTo).format('YYYYMMDD');
    }

    if (this.filterSearchForm.value.dateTo === '') {
      this.filterSearchForm.get('dateTo').setErrors({ 'required': true });
    }
    this.next();
  }

  next() {
    let args = [this.accountId, this.datesSearch];
    if (this.listMovementsObservable) {
      this.listMovementsObservable.unsubscribe();
    }
    this.loading = true;
    this.listMovementsObservable = this.listMovements.next(args).subscribe(this.successMovements, this.errorMovements);
  }

  private successMovements = myResult => {
    this.loading = false;
    this.movements = myResult.data;

    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorMovements = error => {
    this.loading = false;
    this.movements = null;  // #ITECNB-638 - para limpiar contenido de la tabla
    console.log(error);
  }

  goFade() {
    this.fadeNone = true;
  }

  /**
   * Select a movement for viewing the detail
   * @param item movement to show
   */
  viewDetail(item: any) {
    // if (item.type.id === '128') {
      let args = {
        accountId: this.accountId,
        dateFrom: item.operationDate,
        dateTo: item.operationDate
      };
      // [this.accountId, this.datesSearch.dateFrom, this.datesSearch.dateTo];
      this.shareService.setData('movement', args);
      let link = RouterHelperService.getPathFromId('my-space-page-tab:documentbox');
      this.router.navigate([link]);
    // }
  }

  ngOnDestroy() {
    this.listMovementsObservable.unsubscribe();
    this.deviceUtilsServiceSubscription.unsubscribe();
  }

  showHideFilter() {
    if (this.viewFilter) {
      this.viewFilter = false;
    } else if (!this.viewFilter) {
      this.viewFilter = true;
    }
  }

  showApplyFilters(show: any) {
    this.showFilters = show;
  }

  openExtractModal() {
    this.extractForm.reset();
    // this.extractForm.get('dateFrom').setValue(this.filterSearchForm.value.dateFrom);
    if (this.filterSearchForm.value.dateFrom) {
      if (this.filterSearchForm.valid) {
        this.extractForm.get('dateFrom').setValue(this.filterSearchForm.value.dateFrom);
        // moment(this.filterSearchForm.value.dateFrom).format('DD-MM-YYYY')
      }
    }
    if (this.filterSearchForm.value.dateTo) {
      if (this.filterSearchForm.valid) {
        this.extractForm.get('dateTo').setValue(this.filterSearchForm.value.dateTo);
        // moment(this.filterSearchForm.value.dateTo).format('DD-MM-YYYY')
      }
    }
    this.modal.open();
  }

  cancelExtractModal() {
    this.extractForm.reset();
    this.modal.close();
  }

  acceptExtractModal() {
    if (this.extractForm.value.dateFrom) {
      this.extractForm.value.dateFrom = moment(this.extractForm.value.dateFrom).format('YYYYMMDD');
    }
    if (this.extractForm.value.dateTo) {
      this.extractForm.value.dateTo = moment(this.extractForm.value.dateTo).format('YYYYMMDD');
    }
    this.loading = true;
    this.accountService.postStatements(this.accountId, this.extractForm.value.dateFrom, this.extractForm.value.dateTo, 'PDF').subscribe(result => {
      console.log(result);
      this.loading = false;
      this.infoHeaderService.showInfoHeader(this.translateService.instant('ITECBAN-ACCOUNT.MOVEMENT.EXTRACT.OK'));
      this.cancelExtractModal();
    }, e => {
      this.loading = false;
      console.log(e);
    });
  }

  handler(): void {
    const bsDatepicker = 'bs-datepicker-container';
    const datePicker = document.querySelectorAll(bsDatepicker);
    for (let i = 0; i < datePicker.length; i++) {
      this.renderer.setStyle(datePicker[i], 'z-index', 99999);

    }
  }

  downloadExcel() {
    // const cCode = (this.movements[0].amount.currency.code);
    let movementsFieldDef: Json2PdfFieldDefinition[] = [
      {
        field: 'arrow',
        fieldTranslateKey: '',
        fieldType: {
          type: 'string'
        }
      },
      {
        field: 'operationDate',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.OPERATION.DATE',
        fieldType: {
          type: 'date'
        }
      },
      {
        field: 'valueDate',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.VALUEDATE',
        fieldType: {
          type: 'date'
        }
      },
      {
        field: 'reason',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.CONCEPT',
        fieldType: {
          type: 'string'
        }
      },
      {
        field: 'amount.amount',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.AMOUNT',
        fieldType: {
          type: 'amount'
          // currencyCode: cCode
        }
      },
      {
        field: 'balance.amount',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.BALANCE',
        fieldType: {
          type: 'amount'
          // currencyCode: cCode
        }
      },
      {
        field: 'amount.currency.code',
        fieldTranslateKey: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.MOVEMENTS-FIELD-DEF.CURRENCY',
        fieldType: {
          type: 'currencyOnly'
        }
      }
    ];


    // Primer parametro => lista de datos a exportar
    // Segundo parametro => columnas a crear (con literales, origen de datos, formato del dato)
    // Tercer parametro => nombre con el que se descarga el documento
    this.utilsService.downloadJsonTo2Csv(
      this.movements,
      movementsFieldDef,
      this.accountId
    );
  }

  // clearList() {
  //   this.movements = null;
  // }
}
