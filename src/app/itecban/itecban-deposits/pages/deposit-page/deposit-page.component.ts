import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepositsService, AccountOS } from 'itecban-common';
import { ActivatedRoute } from '@angular/router';
import { PageConfiguration, AppConfigService, HeaderTitleElement, HeaderTitleArray, HeaderService, DeviceUtilsService, LiteralFormats } from 'onesait-core';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';


@Component({
  selector: 'osb-deposit-page',
  templateUrl: './deposit-page.component.html'
})
export class DepositPageComponent implements OnInit, OnDestroy {

  deposit: AccountOS;  // AccountOS
  accountId: string;
  depositId: string;
  view = 'detail';
  loading: boolean;
  pageConfig: PageConfiguration;
  accountFormatView: string;

  level1: HeaderTitleElement;
  level2: HeaderTitleArray;
  recivedDeposit: any;
  recivedAllDeposits: any;
  deviceUtilsServiceSubscription: Subscription;
  paramsObservable: Subscription;
  getDepositServiceSubscription: Subscription;
  ismobileResolution: boolean;
  from = 0;

  constructor(
    private depositsService: DepositsService,
    private activateRoute: ActivatedRoute,
    private appConfigService: AppConfigService,
    private headerService: HeaderService,
    protected deviceUtilsService: DeviceUtilsService
  ) {

    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
    // Carga de todos los depositos
    this.depositsService.getDeposits().subscribe(respuesta => {
      this.recivedAllDeposits = respuesta.data;
      // this.setHeaderTitle();
    }, () => { });

  }

  ngOnInit() {
    this.paramsObservable = this.activateRoute.params.subscribe(params => {
      this.depositId = params['id'];
      this.loadDeposit();
    });
    this.pageConfig = this.appConfigService.getPageConfig('deposit-page');
  }

  loadDeposit() {
    // Carga un solo depósito
    this.loading = true;
    // this.recivedDeposit = undefined;
    this.getDepositServiceSubscription = this.depositsService.getDeposit(this.depositId).subscribe(res => {
      this.recivedDeposit = res.data;
      this.setHeaderTitle();
      this.loading = false;
    }, () => { });
  }

  setHeaderTitle() {
    this.level1 = {
      title: 'MENU.DEPOSITS',
      routeId: 'deposits-page'
    };

    this.level2 = {
      selectedTitle: '',
      elements: [],
      selectedId: '',
      fmt: LiteralFormats.IBAN
    };

    this.headerService.setTitle(this.level1, this.level2);
    this.setLevel2(this.recivedAllDeposits);
  }

  setLevel2(data: any) {
    this.level2.elements = [];
    data.forEach(element => {
      // Validación para los mocks
      if (element.formats) {
        this.level2.elements.push({
          title: element.formats[0].value,
          routeId: 'deposit-detail-page',
          routeParams: {id: element.id},
          fmt: LiteralFormats.IBAN
        });
        if (element.id === this.depositId) {
          this.level2.selectedId = this.depositId;
          this.level2.selectedTitle = element.formats[0].value;
        }
        // Validación para el servicio
      } else {
        this.level2.elements.push({
          title: element.id,
          routeId: 'deposit-detail-page',
          routeParams: {id: element.id},
          fmt: LiteralFormats.IBAN
        });
        if (element.id === this.depositId) {
          this.level2.selectedId = this.depositId;
          this.level2.selectedTitle = element.id;
        }
      }
    });
    this.level2.elements = _.sortBy(this.level2.elements, function (element) { return element.title; });
  }

  ngOnDestroy() {
    if (this.paramsObservable) {
      this.paramsObservable.unsubscribe();
    }
    if (this.getDepositServiceSubscription) {
      this.getDepositServiceSubscription.unsubscribe();
    }
  }
}
