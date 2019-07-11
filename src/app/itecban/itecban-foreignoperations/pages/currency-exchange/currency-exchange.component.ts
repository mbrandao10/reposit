import { Component, OnInit } from '@angular/core';
import { ForeignoperationsService, Exchanges } from 'itecban-common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConfigService, SearchConfig, SEARCH_CONFIG_TYPE } from 'onesait-core';
import * as _moment from 'moment';
// import { formatDate } from 'ngx-bootstrap';
const moment = _moment;

@Component({
  selector: 'osb-currency-exchange',
  templateUrl: './currency-exchange.component.html'
})
export class CurrencyExchangeComponent implements OnInit {

  listExchanges: Exchanges;
  currenciesListForm: FormGroup;
  listCurrencies: any;
  exchangeType: any;
  loading: boolean;
  formConfig: SearchConfig;
  today = new Date();
  // today = formatDate(this.minDate, 'DD-MM-YYYY');

  constructor(
    private foreignoperationsService: ForeignoperationsService,
    private appConfigService: AppConfigService
  ) {
    // this.getCurrencies();
    this.createFormControl();
  }

  ngOnInit() {
    this.exchangeType = this.appConfigService.getConfig().exchangeType;
    this.listCurrencies = this.appConfigService.getConfig().currenciesExchange;
    this.prepareSearch();
    // this.getExchangeCurrency();
  }

  createFormControl() {
    this.currenciesListForm = new FormGroup({
      currency: new FormControl(''),
      // initialDate: new FormControl(this.today, Validators.required),
      initialDate: new FormControl('', Validators.required),
      quotationType: new FormControl('', Validators.required)
    });
  }

  // getCurrencies() {
  //   this.loading = true;
  //   this.transferService.getCurrencies().subscribe(results => {
  //     this.listCurrencies = results.data;
  //     this.loading = false;
  //   });
  // }

  getExchangeCurrency() {
    if (this.currenciesListForm.value.initialDate) {
      this.currenciesListForm.value.initialDate = moment(this.currenciesListForm.value.initialDate).format('YYYYMMDD');
    }
    this.loading = true;
    this.foreignoperationsService.getExchangeCurrency(this.currenciesListForm.value).subscribe(results => {
      this.listExchanges = results.data;
      this.loading = false;
    }, (e) => {
      console.log(e);
      this.listExchanges = undefined;
      this.loading = false;
    });
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonText = 'ITECBAN-FOREIGNOPERATION.CURRENCY-EXCHANGE.SEARCH';
    this.formConfig.mobileText = 'ITECBAN-FOREIGNOPERATION.CURRENCY-EXCHANGE.SEARCH';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-FOREIGNOPERATION.CURRENCY-EXCHANGE.SEARCH';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ITECBAN-FOREIGNOPERATION.CURRENCY-EXCHANGE.CURRENCY',
        class: 'col-xs-12 col-sm-3 col-md-3',
        formControlName: 'currency',
        elements: this.listCurrencies,
        selectText: 'id',
        selectValue: 'code'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'ITECBAN-FOREIGNOPERATION.CURRENCY-EXCHANGE.STARTDATE',
        class: 'col-xs-12 col-sm-3 col-md-3',
        formControlName: 'initialDate'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ITECBAN-FOREIGNOPERATION.CURRENCY-EXCHANGE.TYPE-CHANGE',
        class: 'col-xs-12 col-sm-3 col-md-3',
        formControlName: 'quotationType',
        elements: this.exchangeType,
        selectText: 'name',
        selectValue: 'id'
      }
    ];
  }

}
