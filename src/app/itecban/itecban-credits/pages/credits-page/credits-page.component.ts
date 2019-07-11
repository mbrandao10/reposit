import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RouterHelperService, AppConfigService, UtilsService, TabElement, HeaderService, ShareService, DeviceUtilsService, ModalPageComponent } from 'onesait-core';
import { Router } from '@angular/router';
import { CreditsService } from 'onesait-core';
import { CreditElement, ProductsByCurrencyCredits, BalanceCredits, CurrenciesCredits } from 'onesait-api';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-credits-page',
  templateUrl: './credits-page.component.html'
})

export class CreditsPageComponent implements OnInit, OnDestroy {

  deviceUtilsServiceSubscription: Subscription;
  creditsServiceServiceSubscription: Subscription;
  loading: boolean;
  ismobileResolution: boolean;
  creditElements: CreditElement[];
  accountFormatView: string;
  view: string;
  productsByCurrency: ProductsByCurrencyCredits[] = [];
  balance: BalanceCredits[] = [];
  postedBalance: BalanceCredits[] = [];
  detainedBalance: BalanceCredits[] = [];
  currencies: CurrenciesCredits[] = [];
  creditCurrencySelected: any = {};
  tabElement: TabElement[] = [];

  @ViewChild('modal') private modal: ModalPageComponent;

  constructor(
    protected creditsService: CreditsService,
    protected router: Router,
    private appConfigService: AppConfigService,
    private utilsService: UtilsService,
    private headerService: HeaderService,
    private shareService: ShareService,
    private deviceUtilsService: DeviceUtilsService
  ) {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
  }

  ngOnInit() {
    this.headerService.setTitle('MENU.CREDITS');
    this.currencies.push(this.utilsService.getCurrencyObj('978'));
    this.productsByCurrency.push({divisa: '978', balanceAmount: 0});
    this.getCredits();
  }

  getCredits() {
    this.loading = true;
    this.creditsServiceServiceSubscription = this.creditsService.getCredits().subscribe(result => {
      this.creditElements = result.data;
      let creditsByCurrency = null;

      creditsByCurrency = _.groupBy(result.data, (credit: CreditElement) => { return credit.currency.code; });

         for (let divitmp in creditsByCurrency) {
           let existInArray = false;
           for (let j = 0; j < this.currencies.length; j++) {
             if (this.currencies[j].code === divitmp) {
               existInArray = true;
             }
           }
           if (!existInArray) {
             this.currencies.push(this.utilsService.getCurrencyObj(divitmp));
             this.productsByCurrency.push({divisa: divitmp});
           }

           let outstandingBalance = 0;
           let postedBalanceAmount = 0;
           for (let index in creditsByCurrency[divitmp]) {
             outstandingBalance += creditsByCurrency[divitmp][index].outstandingBalance.amount;
             postedBalanceAmount += creditsByCurrency[divitmp][index].postedBalance.amount;
           }

           creditsByCurrency[divitmp].balanceAmount = outstandingBalance;
           this.balance[divitmp] = creditsByCurrency[divitmp].balanceAmount;

           creditsByCurrency[divitmp].postedBalanceAmount = postedBalanceAmount;
           this.postedBalance[divitmp] = creditsByCurrency[divitmp].postedBalanceAmount;
           this.detainedBalance[divitmp] = this.balance[divitmp] - this.postedBalance[divitmp];

           for (let j = 0; j < this.productsByCurrency.length; j++) {
             if (this.productsByCurrency[j].divisa === divitmp) {
               this.productsByCurrency[j].credits = creditsByCurrency[divitmp];
             }
           }
         }

         this.chargeCreditsByCurrency('978');
         for (let j = 0; j < this.currencies.length; j++) {
           if (this.currencies[j]) {
            this.tabElement.push({
              name: this.currencies[j].id,
              view: this.currencies[j].code
            });
           }
          }

          this.loading = false;
    }, () => this.loading = false);
  }

  chargeCreditsByCurrency(currencySelected: string) {
    this.creditCurrencySelected = {};
    this.view = currencySelected;
    for (let i = 0; i < this.productsByCurrency.length; i++) {
      if (this.productsByCurrency[i].divisa === currencySelected) {
        this.creditCurrencySelected = this.productsByCurrency[i];
        this.shareService.setData('creditCurrencySelected',  this.creditCurrencySelected.divisa);
      }
    }
  }

  viewDetail(creditId: string) {
    let link = RouterHelperService.getPathFromId('credit-detail-page',  {id: creditId});
		this.router.navigate([link]);
  }

  addCredit() {
    if (this.deviceUtilsService.isMobileResolution) {
      this.modal.open();
    } else {
      let link = RouterHelperService.getPathFromId('credit-add-page');
      this.router.navigate([link]);
    }
  }

  ngOnDestroy(): void {
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
    if (this.creditsServiceServiceSubscription) {
      this.creditsServiceServiceSubscription.unsubscribe();
    }
  }

}
