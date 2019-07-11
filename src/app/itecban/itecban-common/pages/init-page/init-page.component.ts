import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService, AppConfigService, AccountService } from 'onesait-core';
import * as _ from 'underscore';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html'
})
export class InitPageComponent implements OnInit {

  protected accountsPesos: { alias: string, amount: number }[];
  protected accountsUSD: { alias: string, amount: number }[];

  param: any;
  codePesos: any;
  codeUSD: any;
  viewAccouns: any;
  user: any;
  userInitials: any;

  totalAccPesos = 0;
  totalAccUsd = 0;

  loadingAccount: boolean;

  constructor(
    protected accountService: AccountService,
    protected utilsService: UtilsService,
    protected router: Router,
    protected route: ActivatedRoute,
    private appConfigService: AppConfigService
  ) {
    this.codePesos = this.appConfigService.getConfig().currencyCodes.pesos;
    this.codeUSD = this.appConfigService.getConfig().currencyCodes.dolares;
    this.viewAccouns = this.appConfigService.getConfig().accounts.defaultView;
  }

  ngOnInit() {
    this.param = { name: this.utilsService.getUser().userName };
    this.userInitials = this.utilsService.getInitialsUser();
    this.getAccontData();
  }

  goAccounts(viewAccouns) {
    this.appConfigService.getConfig().accounts.defaultView = viewAccouns;
    let link = ['/itecban/accounts'];
    this.router.navigate(link);

  }

  getAccontData() {
    this.loadingAccount = true;
    this.accountService.getAccounts().subscribe(result => {
      const accountsByCurrency = _.groupBy(result.data, (elem: any) => { return elem.currency.code; });

      if (accountsByCurrency[this.codePesos]) {
        this.accountsPesos = accountsByCurrency[this.codePesos]
          .map((elm) => {

            return {
              alias: elm.alias ? elm.alias : elm.productData.description,
              amount: elm.balance.amount
            };
          });

        this.accountsPesos.forEach((account: any) => {
          this.totalAccPesos += account.amount;
        });
      }

      if (accountsByCurrency[this.codeUSD]) {
        this.accountsUSD = accountsByCurrency[this.codeUSD]
          .map((elm) => {

            return { alias: elm.alias, amount: elm.balance.amount };
          });

        this.accountsUSD.forEach((account: any) => {
          this.totalAccUsd += account.amount;
        });
      }
      this.loadingAccount = false;
    }, () => this.loadingAccount = false);
  }

  goFacebook() {
    window.open('https://www.facebook.com/wilobank/');
    // window.location.href='https://www.facebook.com/bancowanap/';
  }
  goHelp() {
    let link = ['/itecban/help/cliente'];
    this.router.navigate(link);
  }

  goWilo() {
    window.open('https://wilobank.com/costos');
  }
}
