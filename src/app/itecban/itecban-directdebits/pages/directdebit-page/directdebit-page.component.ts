import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageConfiguration, AppConfigService, HeaderService, HeaderTitleElement, HeaderTitleArray, LiteralFormats } from 'onesait-core';
import { Subscription } from 'rxjs';
import { DirectdebitsService } from 'itecban-common';
import { DirectdebitsContract } from 'onesait-api';
import * as _ from 'underscore';

@Component({
  selector: 'app-directdebit-page',
  templateUrl: './directdebit-page.component.html'
})
export class DirectdebitPageComponent implements OnInit, OnDestroy {

  protected paramsObservable: Subscription;
  view = 'payments';
  pageConfig: PageConfiguration;
  contractId: string;
  accountId: string;
  loading: boolean;
  contracts: DirectdebitsContract[];
  level1: HeaderTitleElement;
  level2: HeaderTitleArray;

  constructor(
    protected route: ActivatedRoute,
    private appConfigService: AppConfigService,
    private headerService: HeaderService,
    private directdebitsService: DirectdebitsService

  ) { }

  ngOnInit() {

    this.pageConfig = this.appConfigService.getPageConfig('directdebit-page');
    this.paramsObservable = this.route.params.subscribe(params => {
      this.contractId = params['id'];
      this.accountId = params['account'];
      this.getContracts();
    });
  }

  getContracts() {
    this.loading = true;
    this.directdebitsService.getContracts(this.accountId).subscribe(result => {
      this.contracts = result.data;
      this.setHeaderTitle();
      this.loading = false;
    }, () => this.loading = false);
  }

  setHeaderTitle() {

    this.level1 = {
      title: 'MENU.PAYMENTS_DEBTS',
      routeId: 'directdebits-page'
    };

    this.level2 = {
      selectedTitle: '',
      elements: [],
      selectedId: '',
      fmt: LiteralFormats.LITERAL
    };

    this.contracts.forEach(elemen => {
      this.level2.elements.push({
        title: elemen.issuerName,
        routeId: 'directdebit-page',
        routeParams: { id: elemen.id, account: this.accountId },
        fmt: LiteralFormats.LITERAL
      });
      if (elemen.id === this.contractId) {
        this.level2.selectedTitle = elemen.issuerName;
        this.level2.selectedId = this.contractId;
      }
      this.loading = false;
    });
    this.headerService.setTitle(this.level1, this.level2);
    this.level2.elements = _.sortBy(this.level2.elements, function (element) { return element.title; });
    this.headerService.setTitle(this.level1, this.level2);

  }

  ngOnDestroy() {
    this.paramsObservable.unsubscribe();
  }

}
