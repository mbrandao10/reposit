import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterHelperService, SearchConfig, SEARCH_CONFIG_TYPE, CheckService, List, InputValidatorOptions, AccountsValidator, DatesValidator } from 'onesait-core';
import { Checks, GenericListResponse } from 'onesait-api';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'osb-account-checks',
  templateUrl: './account-checks.component.html'
})
export class AccountChecksComponent implements OnChanges {

  loading: boolean;
  showingLastChecks: boolean;

  @Input()
  accountId: any;

  checksListForm: FormGroup;
  formConfig: SearchConfig;
  hasMoreData: boolean;

  protected listChecks: List;

  checks: GenericListResponse<Checks>;

  inputValidatorOptions = <InputValidatorOptions> {
    errorText: {
      MIN: 'ITECBAN-CARDS.ERROR.MIN',
      MAX: 'ITECBAN-CARDS.ERROR.MAX',
      OTHERCHARACTERS: 'ITECBAN-CARDS.ERROR.SELECT',
      NAN: 'ITECBAN-CARDS.ERROR.NAN',
      ERRORDNI: 'ITECBAN-CARDS.ERROR.DNI',
      ERRORNCIF: 'ITECBAN-CARDS.ERROR.CIF',
      ERRORNIE: 'ITECBAN-CARDS.ERROR.NIE',
      INVALIDDATE: 'ITECBAN-CARDS.ERROR.PASSPORT'
    }
  };

  inputValidatorOptionsIni: InputValidatorOptions;
  inputValidatorOptionsEnd: InputValidatorOptions;

  constructor(private router: Router,
    private checkService: CheckService) {
    this.showingLastChecks = true;
    this.createFormControl();
    this.listChecks = new List(this.checkService, 'getChecks');
    this.loading = true;
    // this.viewFilter = false;
    this.prepareSearch();
  }

  ngOnChanges() {
    this.checksListForm.reset();
    this.resetList();
  }

  createFormControl() {
    this.checksListForm = new FormGroup({
      dateFrom: new FormControl('', [AccountsValidator.DateInitialValidator, DatesValidator.DateInvalidDateValidator]),
      dateTo: new FormControl('', [DatesValidator.DateInvalidDateValidator, AccountsValidator.DateEndValidator])
    }, AccountsValidator.groupValidationSearch('ITECBAN-ACCOUNT'));
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

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonText = 'ONESAIT-ACCOUNTS.ACCOUNTS.CHECKS.CONSULT';
    this.formConfig.buttonDivClass = 'hidden-md hidden-sm col-xs-12 col-sm-3 mb-1 mt-1';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.FROM',
        class: 'col-xs-12 col-sm-6',
        formControlName: 'dateFrom',
        opts: this.inputValidatorOptionsIni
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.TO',
        class: 'col-xs-12 col-sm-6',
        formControlName: 'dateTo',
        opts: this.inputValidatorOptionsEnd
      }
    ];
  }

  contractCheckBook() {
    let link = [RouterHelperService.getPathFromId('account-contract-check-page', { id: this.accountId })];
    this.router.navigate(link);
  }

  search() {
    let consultChecks = true;
    let emptyFormChecks = false;

    if ((!this.checksListForm.value.dateFrom) && (!this.checksListForm.value.dateTo)) {
      if (this.showingLastChecks) {
        consultChecks = false;
      }
      emptyFormChecks = true;
    }

    if (consultChecks) {
      if (emptyFormChecks) {
        this.showingLastChecks = true;
      } else {
        this.showingLastChecks = false;
        if (this.checksListForm.value.dateFrom) {
          this.checksListForm.value.dateFrom = moment(this.checksListForm.value.dateFrom).format('YYYY-MM-DD');
        }
        if (this.checksListForm.value.dateTo) {
          this.checksListForm.value.dateTo = moment(this.checksListForm.value.dateTo).format('YYYY-MM-DD');
        }
      }
      this.resetList();
    }
  }

  next() {
    let args = [this.accountId, this.checksListForm.value];
    this.listChecks.next(args).subscribe(this.successChecks, this.errorChecks);
  }

  private successChecks = (myResult) => {
    this.loading = false;
    this.checks = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorChecks = () => {
    this.loading = false;
  }

  resetList() {
    this.listChecks.reset();
    this.next();
  }

}
