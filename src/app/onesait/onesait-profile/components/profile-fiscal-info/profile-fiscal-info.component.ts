import { Component, OnInit } from '@angular/core';
import { List, CustomersService, AppConfigService, UtilsService } from 'onesait-core';
import { SummaryFiscalCredits, SummaryFiscalSavings } from 'onesait-api';
import * as _ from 'underscore';

export enum FISCALPRODUCT {
  SAVINGS = 'SavingsProductFiscalSummary',
  CREDIT = 'CreditProductFiscalSummary'
}

@Component({
  selector: 'osb-profile-fiscal-info',
  templateUrl: './profile-fiscal-info.component.html'
})
export class ProfileFiscalInfoComponent implements OnInit {

  loading: boolean;
  hasMoreData: boolean;
  view: string;

  fiscalListObservable: any;
  fiscalList: List;

  fiscalSummaries: any;
  // fiscalSummaries: SummaryFiscalCredits[] | SummaryFiscalSavings[];
  credits: SummaryFiscalCredits[];
  savings: SummaryFiscalSavings[];

  year: string;

  date: Date;
  now: number;
  selectedYear: number;
  numShowYearsList: number[];
  numShowYears: number;
  yearList: number[];

  constructor( private appConfigService: AppConfigService,
    private customerService: CustomersService,
    private utilsService: UtilsService) {
    this.date = new Date;
    this.numShowYears = this.appConfigService.getConfig().numYears.years;
   }

  ngOnInit() {
    this.view = 'savings';
    this.fiscalList = new List(this.customerService, 'getFiscalSummary');
    this.now = this.date.getFullYear() - 1;
    this.changeYear(this.now);
    this.refreshYearList();
  }

  setNumShowYears() {
    this.numShowYearsList = [];
    let i = this.numShowYears;
    while (i <= 10) {
      this.numShowYearsList.push(i);
      i++;
    }
  }

  next() {
    let args = [this.year];

    if (this.fiscalListObservable) {
      this.fiscalListObservable.unsubscribe();
    }
    this.loading = true;
    this.fiscalListObservable = this.fiscalList.next(args).subscribe(this.successFiscal, this.errorFiscal);
  }

  open(view: string) {
    this.view = view;
    if (view === 'savings') {
      this.filterSavings();
    } else if (view === 'credit') {
      this.filterCredit();
    }
  }

  private successFiscal = (myResult) => {
    this.loading = false;
    this.fiscalSummaries = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
    this.fiscalSummaries.forEach(element => {
      element.currencySymbol = this.utilsService.getCurrency(element.interests.currency.code);
      element.ownerShipPercentage = element.ownerShipPercentage.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    });
    // Al recuperar una página del listado se actualizan ambos productos
    this.filterSavings();
    this.filterCredit();
  }

  private errorFiscal = (error) => {
    this.credits = [];
    this.savings = [];
    this.loading = false;
    console.log(error);
  }

  filterSavings() {
    this.savings = _.filter(this.fiscalSummaries, function (el) {
      return el.productClass === FISCALPRODUCT.SAVINGS;
    });
    // this.savings.forEach(element => {
    //   element.currencySymbol = _.findWhere(this.listCurrencies, {code: element.interests.currency.code}).ISOCode;
    // });
  }

  filterCredit() {
    this.credits = _.filter(this.fiscalSummaries, function (el) {
      return el.productClass === FISCALPRODUCT.CREDIT;
    });
    // this.credits.forEach(element => {
    //   element.currencySymbol = _.findWhere(this.listCurrencies, {code: element.interests.currency.code}).sign;
    // });
  }

  changeYear(year: number) {
    this.fiscalList.reset();
    this.selectedYear = year;
    this.year = this.selectedYear.toString();
    this.next();
    this.view = 'savings';
  }

  refreshYearList() {
    this.yearList = [];
    let lastYear = this.now - this.numShowYears;
    let i = this.now - 1;

    while (i >= lastYear) {
      this.yearList.push(i);
      i--;
    }
    // si el año seleccionado es anterior al último de la nueva lista mostrada se selecciona el último año de la lista seleccionada
    if (this.selectedYear < lastYear) {
      this.changeYear(lastYear);
    }
  }

  onChangeSelectYears(numYearsSelected) {
    this.numShowYears = numYearsSelected;
    this.refreshYearList();
  }

}
