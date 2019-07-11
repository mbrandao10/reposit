import { Component, OnInit, Input } from '@angular/core';
import { SearchConfig, SEARCH_CONFIG_TYPE, AccountService, FormatAccountPipe, AppConfigService } from 'onesait-core';
import { AccountElement, AccountCashPooling, GenericIdNameElement } from 'onesait-api';
import { FormGroup, FormControl } from '@angular/forms';
import { CashpoolingService } from 'itecban-common';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'osb-cashpooling-page',
  templateUrl: './cashpooling-page.component.html'
})
export class CashpoolingPageComponent implements OnInit {

  @Input() account: any;
  @Input() accountId: any;

  constructor(
    private accountService: AccountService,
    private cashpoolingService: CashpoolingService,
    private formatAccountPipe: FormatAccountPipe,
    private appConfigService: AppConfigService,
  ) {
  }

  loading: boolean;
  formConfig: SearchConfig;
  accounts: AccountElement [];
  accountsSelect:  GenericIdNameElement[] =  [ {name: '', id: ''}];
  relationShip: GenericIdNameElement[] = [ {name: '', id: ''}];
  filterSearchForm: FormGroup;
  accountIBAN: string;
  accountFormatView: string;
  cashpoolingAccounts: AccountCashPooling [];


  ngOnInit() {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.accountIBAN = this.formatAccountPipe.transform(this.account.formats, this.accountFormatView);
    this.createFormControl();
    this.loadDataForm();
    // this.prepareSearch();
  }

  loadDataForm() {
    let observableData: any = [];
    observableData.push(this.cashpoolingService.getRelationShip());
    observableData.push(this.accountService.getAccounts());

    this.loading = true;
    forkJoin(observableData).subscribe((result: any) => {
      this.relationShip =  this.relationShip.concat(result[0]['data']);
      this.accounts = result[1]['data'];
      this.accounts.forEach(element => {
        if (this.accountId !== element.id) {
          this.accountsSelect.push({
            name: this.formatAccountPipe.transform(element.formats, this.accountFormatView),
            id: element.id});
        }
      });
      this.loading = false;
      this.prepareSearch();
    }, () => {
      this.loading = false;
    });
  }


  createFormControl() {
    this.filterSearchForm = new FormGroup({
      formAccount: new FormControl({value: this.accountIBAN , disabled: true}),
      secondaryAccountId: new FormControl(''),
      relationType: new FormControl('')
    });
  }


  prepareSearch() {
    this.formConfig = new SearchConfig();
    // this.formConfig.buttonFloatRight = true;
    this.formConfig.buttonText = 'ITECBAN-CASHPOOLING.FILTER.SEARCH';
    this.formConfig.mobileText = 'ITECBAN-CASHPOOLING.FILTER.CASHPOOLING';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-CASHPOOLING.FILTER.TITLE-MOBILE';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.TEXT,
        label: 'ITECBAN-CASHPOOLING.FILTER.MAIN-ACCOUNT',
        class: 'hidden col-xs-12 col-sm-4 col-md-4',
        formControlName: 'formAccount'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ITECBAN-CASHPOOLING.FILTER.SECONDARY-ACCOUNT',
        class: 'col-xs-12 col-sm-4 col-md-4',
        formControlName: 'secondaryAccountId',
        elements: this.accountsSelect,
        selectText: 'name',
        selectValue: 'id'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ITECBAN-CASHPOOLING.FILTER.RELATIONSHIP',
        class: 'col-xs-12 col-sm-4 col-md-4',
        formControlName: 'relationType',
        elements: this.relationShip,
        selectText: 'name',
        selectValue: 'id'
      }
    ];
    this.getCashpoolingAccounts();
  }

  getCashpoolingAccounts() {
    this.loading = true;
    this.cashpoolingService.getCashpoolingAccounts(this.accountId, this.filterSearchForm.value).subscribe(results => {
      this.loading = false;
      this.cashpoolingAccounts = results.data;
    }, (e) => {
      console.log(e);
      this.loading = false;
    });
  }
}
