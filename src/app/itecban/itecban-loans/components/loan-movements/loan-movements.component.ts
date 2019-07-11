import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SearchConfig, SEARCH_CONFIG_TYPE, DeviceUtilsService, InputValidatorOptions, DatesValidator, AccountsValidator } from 'onesait-core';
import { List } from 'onesait-core';
import { FormGroup, FormControl } from '@angular/forms';
import { GenericListResponse, DatesFromTo } from 'onesait-api';
import { Subscription } from 'rxjs';
import * as _moment from 'moment';
import { LoansService, LoanMovement } from 'itecban-common';
const moment = _moment;

/**
 * Component for render a list of movements
 */
@Component({
  selector: 'osb-loan-movements',
  templateUrl: './loan-movements.component.html'
})

export class LoanMovementsComponent implements OnInit, OnDestroy {

  @Input() idLoan: string;

  formConfig: SearchConfig;
  filterSearchForm: FormGroup;
  inputValidatorOptionsIni: InputValidatorOptions;
  inputValidatorOptionsEnd: InputValidatorOptions;
  listMovements: List;
  datesSearch: DatesFromTo;
  loading: boolean;
  movements: GenericListResponse<LoanMovement>;
  hasMoreData: boolean;
  ismobileResolution: boolean;

  private deviceUtilsServiceSubscription: Subscription;
  protected listMovementsObservable: Subscription;

  constructor(
    protected loanService: LoansService,
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
    this.listMovements = new List(this.loanService, 'getMovements');
    this.prepareSearch();
    this.getMovements();
  }

  createFormControl() {
    this.filterSearchForm = new FormGroup({
      dateFrom: new FormControl('', [AccountsValidator.DateInitialValidator, DatesValidator.DateInvalidDateValidator]),
      dateTo: new FormControl('', [DatesValidator.DateInvalidDateValidator, AccountsValidator.DateEndValidator])
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
    this.formConfig.buttonText = 'ITECBAN-LOANS.MOVEMENTS.FILTER.SEARCH';
    this.formConfig.mobileText = 'ITECBAN-LOANS.MOVEMENTS.FILTER.SEARCH';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-LOANS.MOVEMENTS.FILTER.SEARCHER-TITLE';
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
      this.datesSearch.dateFrom = moment(this.filterSearchForm.value.dateFrom).format('YYYYMMDD');
    }
    if (this.filterSearchForm.value.dateTo) {
      this.datesSearch.dateTo = moment(this.filterSearchForm.value.dateTo).format('YYYYMMDD');
    }
    // if (this.filterSearchForm.value.dateTo === '') {
    //   this.filterSearchForm.get('dateTo').setErrors({ 'required': true });
    // }
    this.next();
  }

  next() {
    let args = [this.idLoan, this.datesSearch];
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
    this.movements = null;
    console.log(error);
  }

  ngOnDestroy() {
    this.listMovementsObservable.unsubscribe();
    this.deviceUtilsServiceSubscription.unsubscribe();
  }
}
