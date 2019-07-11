import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FundsService, FundList, FundListByFunds, InversisManager } from 'itecban-common';
import { RouterHelperService, AppConfigService, HeaderService, CustomersService } from 'onesait-core';

@Component({
    selector: 'app-funds-page',
    templateUrl: './funds-page.component.html'
  })

  export class FundsPageComponent extends InversisManager implements OnInit {

  loading: boolean;
  accountId: string;
  accountFundsList: FundList []; // esta lista es tal y como la devuelve el servicio (cuenta contiene array con fondos asociados)
  listByFunds: FundListByFunds [] = []; // en esta lista creamos un item por cada fondo
  item: FundListByFunds;
  view: string;
  accountFormatView: string;
  effectiveValue = { amount: 0, currency: { id: '', code: '' }};
  liquidationValue = { amount: 0, currency: { id: '', code: '' }};
  totalCost = { amount: 0, currency: { id: '', code: '' }};

  constructor(
      protected routerHelperService: RouterHelperService,
      appConfigService: AppConfigService,
      private fundsService: FundsService,
      private headerService: HeaderService,
      protected router: Router,
      protected customerService: CustomersService,
      private activateRoute: ActivatedRoute
      ) {
      super( customerService );
      this.view = appConfigService.getConfig().products.defaultView;
      this.accountFormatView = appConfigService.getConfig().account.viewKey;
    }

    ngOnInit() {
      this.headerService.setTitle('MENU.FUNDS');
      this.activateRoute.params.subscribe(params => {
        this.accountId = params['id'];
        this.getFunds(this.accountId);
      });
    }
    getFunds(accountId) {
      this.loading = true;
      this.fundsService.getFunds(accountId).subscribe(results => {

        this.effectiveValue.amount = 0;
        this.liquidationValue.amount = 0;
        this.totalCost.amount = 0;
        this.accountFundsList = results.data;
        this.accountFundsList.forEach(accountFund => {
          this.item = {};
          this.item.accountFundId = accountFund.accountFundId;
          this.item.formats = accountFund.formats;
          if (accountFund.funds) {
            accountFund.funds.forEach(element => {
              this.item = {};
              this.item.accountFundId = accountFund.accountFundId;
              this.item.formats = accountFund.formats;
              this.item.fund = element;
              this.listByFunds.push(this.item);

              this.effectiveValue.amount = this.effectiveValue.amount + element.effectiveValue.amount;
              this.effectiveValue.currency = element.effectiveValue.currency;
              this.liquidationValue.amount = this.liquidationValue.amount + element.liquidationValue.amount;
              this.liquidationValue.currency = element.liquidationValue.currency;
              this.totalCost.amount = this.totalCost.amount + element.totalCost.amount;
              this.totalCost.currency = element.totalCost.currency;
            });
          } else {
            this.item.empty = true;
          }
          // this.listByFunds.push(this.item);

        });
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }

    addFunds() {
      let link = [RouterHelperService.getPathFromId('funds-add-page')];
      this.router.navigate(link);
    }

    viewFund(fund: FundListByFunds) {
      let link = [RouterHelperService.getPathFromId('fund-page', {accountId: fund.accountFundId, fundId: fund.fund.id})];
      this.router.navigate(link);
    }

    operateInversis() {
      this.callInversis('Inversis', null, null);
    }
  }
