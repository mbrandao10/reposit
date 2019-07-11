import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService, RouterHelperService, LeasingService, AppConfigService, DeviceUtilsService } from 'onesait-core';
import { LeasingContracts, Amount, Currency } from 'onesait-api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-leasing-page',
  templateUrl: './leasing-page.component.html'
})
export class LeasingPageComponent implements OnInit, OnDestroy {

  loading: boolean;
  contracts: LeasingContracts[];
  totalAvailable: Amount = { amount: 0, currency: { id: '', code: '' } };
  totalDrawn: Amount = { amount: 0, currency: { id: '', code: '' } };
  totalOutstanding: Amount = { amount: 0, currency: { id: '', code: '' } };
  emptyCurrency: Currency;
  accountFormatView: string;
  deviceUtilsServiceSubscription: Subscription;
  ismobileResolution: boolean;


  constructor(
    private headerService: HeaderService,
    private leasingService: LeasingService,
    private router: Router,
    private appConfigService: AppConfigService,
    protected deviceUtilsService: DeviceUtilsService
  ) {
    this.totalAvailable.currency.code = this.appConfigService.getConfig('defaultCurrency');
    this.totalDrawn.currency.code = this.appConfigService.getConfig('defaultCurrency');
    this.totalOutstanding.currency.code = this.appConfigService.getConfig('defaultCurrency');
    this.accountFormatView = appConfigService.getConfig().account.viewKey;
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
  }

  ngOnInit() {
    this.headerService.setTitle('MENU.BILLS', 'HEADER.TITLE.LEASING');
    this.getContracts();
  }

  getContracts(): void {
    this.loading = true;
    this.leasingService.getContracts().subscribe(result => {
      this.loading = false;
      this.contracts = result.data;
      if (this.contracts) {
        this.getTotals();
      }
    }, () => {
      this.loading = false;
    });
  }

  selectContract(contract: LeasingContracts) {
    let link = RouterHelperService.getPathFromId('leasing-detail-page', { contractId: contract.id });
    this.router.navigate([link]);
  }

  getTotals(): void {
    let sumAv = 0;
    let sumDraw = 0;
    let sumOut = 0;
    for (let cont of this.contracts) {
      this.totalAvailable.currency = (cont.availableAmount)?cont.availableAmount.currency:this.emptyCurrency;
      this.totalDrawn.currency = (cont.drawnAmount)?cont.drawnAmount.currency:this.emptyCurrency;
      this.totalOutstanding.currency = (cont.outstandingAmount)?cont.outstandingAmount.currency:this.emptyCurrency;
      sumAv += (cont.availableAmount)?cont.availableAmount.amount:0;
      sumDraw += (cont.drawnAmount)?cont.drawnAmount.amount:0;
      sumOut += (cont.outstandingAmount)?cont.outstandingAmount.amount:0;
    }
    this.totalAvailable.amount = sumAv;
    this.totalDrawn.amount = sumDraw;
    this.totalOutstanding.amount = sumOut;
  }

  ngOnDestroy() {
    this.deviceUtilsServiceSubscription.unsubscribe();
  }

}
