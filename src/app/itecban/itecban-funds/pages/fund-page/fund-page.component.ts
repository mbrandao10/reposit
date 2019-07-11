import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FundList, FundsService, FundDetail } from 'itecban-common';
import { PageConfiguration, AppConfigService, HeaderTitleElement, HeaderTitleArray, HeaderService, LiteralFormats } from 'onesait-core';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-fund-page',
  templateUrl: './fund-page.component.html'
})
export class FundPageComponent implements OnInit, OnDestroy {

  accountId: string;
  fundId: string;
  fundsAccountList: FundList[];
  loading: boolean;
  fund: FundDetail;
  view: 'conditions';
  pageConfig: PageConfiguration;
  accountFormatView: string;

  paramsObservable: Subscription;
  getFundServiceSubscription: Subscription;


  constructor(
    private activateRoute: ActivatedRoute,
    private fundsService: FundsService,
    private appConfigService: AppConfigService,
    private headerService: HeaderService

  ) { }

  ngOnInit() {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.pageConfig = this.appConfigService.getPageConfig('fund-page');
    this.paramsObservable = this.activateRoute.params.subscribe(params => {
      this.accountId = params['accountId'];
      this.fundId = params['fundId'];
      this.getFunds();
    });
  }

  getFunds() {
    this.loading = true;
    this.getFundServiceSubscription = this.fundsService.getFunds(this.accountId).subscribe(results => {
        this.fundsAccountList = results.data;
        this.fundsAccountList.forEach(accountFund => {
          let accounts = accountFund;
          if (accounts.funds.length > 0) {
            accounts.funds.forEach(element => {
              if (element.id === this.fundId) {
                this.fund = element;
              }
            });
          }
        });
        this.setHeaderTitle();
        // this.loading = false;
      },
      e => {
        console.log(e);
        this.loading = false;
      }
    );
  }

  setHeaderTitle() {
    let level1: HeaderTitleElement;
    let level2: HeaderTitleArray;

    level1 = {
      title: 'MENU.FUNDS',
      routeId: 'funds-page'
    };

    level2 = {
      selectedTitle: '',
      elements: [],
      selectedId: '',
      fmt: LiteralFormats.LITERAL
    };

    this.headerService.setTitle(level1, level2);
    this.fundsService.getFunds().subscribe(result => {
      result.data.forEach(accountFund => {
        if (accountFund.funds) {
          accountFund.funds.forEach(fund => {
            level2.elements.push({
              title: fund.name,
              routeId: 'fund-page',
              routeParams: {accountId: accountFund.accountFundId, fundId: fund.id, id: fund.id},
              fmt: LiteralFormats.LITERAL
            });
            if (fund.id === this.fundId) {
              level2.selectedId = this.fundId;
              level2.selectedTitle = fund.name;
            }
          });
        }
      });
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if(this.paramsObservable) {
      this.paramsObservable.unsubscribe();
    }
    if(this.getFundServiceSubscription) {
      this.getFundServiceSubscription.unsubscribe();
    }
  }
}
