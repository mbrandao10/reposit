import { Component, OnInit } from '@angular/core';
import { HeaderService, AppConfigService, PageConfiguration, TaxesService, AccountService, UtilsService } from 'onesait-core';
import { FormControl, Validators } from '@angular/forms';
import { TaxPaymentType, TaxForm, AccountElement, CurrenciesCredits } from 'onesait-api';
import { forkJoin } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'osb-taxes-page',
  templateUrl: './taxes-page.component.html'
})
export class TaxesPageComponent implements OnInit {

  protected paramsObservable: any;

  contractId: string;
  view: string;
  showHeader: boolean;
  pageConfig: PageConfiguration;
  loading: boolean;
  taxForm: FormControl;
  taxes: TaxPaymentType[];
  taxForms: TaxForm[];
  accounts: AccountElement[];
  accountInfo: any;
  currencies: CurrenciesCredits[] = [];
  defaultCurrency: CurrenciesCredits;

  constructor(
    private taxesService: TaxesService,
    private accountService: AccountService,
    private utilsService: UtilsService,
    private headerService: HeaderService,
    private appConfigService: AppConfigService,
  ) { }

  ngOnInit() {
    this.resetPage();
    this.createFormControl();
    this.loadInitialData();
    this.headerService.setTitle('MENU.TAXES');
    this.pageConfig = this.appConfigService.getPageConfig('taxes-page');
    this.currencies = this.appConfigService.getConfig('currencies');
    this.defaultCurrency = _.findWhere(this.currencies, {code: this.appConfigService.getConfig('defaultCurrency')});
  }

  resetPage() {
    this.showHeader = true;
    this.view = 'payments-returns';
  }

  loadInitialData() {
    this.loading = true;
    let me = this;
    let observableData: any = [];
    observableData.push(this.taxesService.getTaxTypes('aeat'));
    observableData.push(this.taxesService.getTaxTypes('tgss'));
    observableData.push(this.accountService.getAccounts());

    forkJoin(observableData).subscribe((result: any) => {
      result[0]['data'].forEach(function (elem: any) {
        elem.organism = 'aeat'; });
      result[1]['data'].forEach(function (elem: any) {
        elem.organism = 'tgss'; });
      me.taxes = result[0]['data'].concat(result[1]['data']);
      me.accounts = result[2]['data'];
      this.taxForm.setValue(me.taxes[0]);
      this.loading = false;
    }, () => {
      this.loading = false;
    });

    let user = this.utilsService.getUser();
    this.accountInfo = {
      userId: user.userLegalId,
      username: user.userName + ' ' + user.userFirstSurname + ' ' + user.userSecondSurname,
      attorney: user.userNumber
    };
  }

  createFormControl(): void {
    this.taxForm = new FormControl('', Validators.required);
  }

  getShowHeader(show: boolean) {
    this.showHeader = show;
  }

  getViewChange(view: any) {
    this.showHeader = (view === 'payments-returns') ? true : null;
  }

}
