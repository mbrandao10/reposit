import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppConfigService, UtilsService, RouterHelperService, ShareService, ModalPageComponent, DeviceUtilsService, TabElement, HeaderService } from 'onesait-core';
import { CurrenciesLoans , ProductsByCurrencyLoans } from 'onesait-api';
import { LoansService, Loan } from 'itecban-common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'osb-loans-page',
  templateUrl: './loans-page.component.html'
})

export class LoansPageComponent implements OnInit, OnDestroy {

  @ViewChild('modal') private modal: ModalPageComponent;

  view: string;
  loading: boolean;
  defaultCurrency: string;
  accountFormatView: string;
  tabElement: TabElement[] = [];
  loanCurrencySelected: any = {};
  currencies: CurrenciesLoans[] = [];
  loansServiceSubscription: Subscription;
  productsByCurrency: ProductsByCurrencyLoans[] = [];
  ismobileResolution: boolean;
  private deviceUtilsServiceSubscription: Subscription;

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private loansService: LoansService,
    private shareService: ShareService,
    private headerService: HeaderService,
    private appConfigService: AppConfigService,
    protected deviceUtilsService: DeviceUtilsService
  ) {
    this.defaultCurrency = appConfigService.getConfig().products.defaultView;
    this.view = this.defaultCurrency;
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
  }

  ngOnInit(): void {
    this.headerService.setTitle('HEADER.TITLE.LOANS');
     // metemos siempre EURO porque será la moneda por defect
    this.currencies.push(this.utilsService.getCurrencyObj(this.defaultCurrency));
    this.productsByCurrency.push({divisa:  this.defaultCurrency,
      pendingAmount: 0
    });
    this.getLoans();
  }

  getLoans(): void {
    this.loading = true;
    this.loansServiceSubscription = this.loansService.getLoans().subscribe(results => {
      let loansByCurrency = null;

      // Las cuentas vienen mezclados con las divisas, por eso lo dividimos
      loansByCurrency = _.groupBy(results.data, (loan: Loan) => { return loan.currency.code; });
      // Recorremos las divisas encontradas para añadirlas a nuestro "Inventario" de divisas.
      // Si no ha salido ya, lo añadimos para que se cree la pestaña correspondiente
      for (let divitmp in loansByCurrency) {
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

        // Recorremos todas las cuentas por productos y por divisa para tener el total del importe por producto
        let pendingAmount = 0;
        for (let index in loansByCurrency[divitmp]) {
          pendingAmount += loansByCurrency[divitmp][index].pendingAmount.amount;
        }
        loansByCurrency[divitmp].pendingAmount = pendingAmount;

        // Hacemos un json único separando principalmente por divisa
        for (let j = 0; j < this.productsByCurrency.length; j++) {
          if (this.productsByCurrency[j].divisa === divitmp) {
            this.productsByCurrency[j].loans = loansByCurrency[divitmp];
          }
        }
      }

      // Inicialmente cargamos los productos de EUROS ya que es la moneda por defecto
      this.loading = false;
      // this.chargeLoansByCurrency(this.defaultCurrency);

      for (let j = 0; j < this.currencies.length; j++) {
        this.tabElement.push({
          name: this.currencies[j].id,
          view: this.currencies[j].code
        });
      }

      this.chargeLoansByCurrency('978');
      this.loading = false;
    }, () => this.loading = false);
  }

  chargeLoansByCurrency(currencySelected: string): void {
    this.loanCurrencySelected = {};
    this.view = currencySelected;

    for (let i = 0; i < this.productsByCurrency.length; i++) {
      if (this.productsByCurrency[i].divisa === currencySelected) {
        this.loanCurrencySelected = this.productsByCurrency[i];
        this.shareService.setData('loanCurrencySelected',  this.loanCurrencySelected.divisa);
      }
    }
  }

  viewDetail(loan): void {
    let dataLoanString = {
      currency: {
        code: loan.currency.code,
        id: loan.currency.id,
      },
    };
    this.shareService.setData('dataLoanString', dataLoanString);
    let link = RouterHelperService.getPathFromId('loan-page',  {id: loan.account.id});
		this.router.navigate([link]);
  }

  addLoan(): void {
    if (this.ismobileResolution) {
      this.modal.open();
    } else {
      let link = RouterHelperService.getPathFromId('loan-add-page');
      this.router.navigate([link]);
    }
  }

  ngOnDestroy(): void {
    if (this.loansServiceSubscription) {
      this.loansServiceSubscription.unsubscribe();
    }
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
  }

}
