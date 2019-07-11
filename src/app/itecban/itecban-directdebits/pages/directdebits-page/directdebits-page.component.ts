import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AppConfigService, RouterHelperService, HeaderService, PageConfiguration } from 'onesait-core';
import { DirectdebitsService } from 'itecban-common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DirectdebitsContract, DirectdebitsAccount, AccountElement } from 'onesait-api';

@Component({
  selector: 'app-directdebits-page',
  templateUrl: './directdebits-page.component.html'
})
export class DirectdebitsPageComponent implements OnInit {

  loading = false;
  accounts: AccountElement[]; // DirectdebitsAccounts se tiene que modificar el servicio
  account: string;
  contracts: DirectdebitsContract[];
  selectAccountsForm: FormGroup;
  accountFormatView: string;
  view = 'contracts';
  pageConfig: PageConfiguration;

  constructor(
    private appConfigService: AppConfigService,
    private accountService: AccountService,
    private directdebitsService: DirectdebitsService,
    protected route: ActivatedRoute,
    protected router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.pageConfig = this.appConfigService.getPageConfig('directdebits-page');
    this.headerService.setTitle('MENU.PAYMENTS_DEBTS');
    this.getAccounts();
    this.createFormControl();
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
  }

  getAccounts() {
    this.loading = true;
    this.accountService.getAccounts().subscribe(result => {
      this.accounts = result.data;
      this.accounts.unshift({
        id: '',
        balance: null,
        postedBalance: null,
        productData: null,
        operationalStatus: '',
        alias: '',
        currency: null,
        status: null,
        formats: [],
        hasLocks: true
      });
      this.loading = false;
    }, () => this.loading = false);
  }

  getContracts(account: DirectdebitsAccount) {
    if (account.id !== "") {
      this.loading = true;
      this.account = account.id;
      this.contracts = [];
      this.directdebitsService.getContracts(account.id).subscribe(result => {
        this.contracts = result.data;
        this.loading = false;
      }, () => this.loading = false);
    } else {
      this.contracts = [];
      this.account = '';
    }

  }

  createFormControl() {
    this.selectAccountsForm = new FormGroup({
      selectAccounts: new FormControl('', Validators.required),
    });
  }

  viewDetail(contractId: string) {
    let link = RouterHelperService.getPathFromId('directdebit-page', { id: contractId, account: this.account });
    this.router.navigate([link]);
  }

}
