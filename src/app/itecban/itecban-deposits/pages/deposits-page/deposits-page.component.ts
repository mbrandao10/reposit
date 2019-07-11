import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService, AppConfigService, RouterHelperService, TabElement, CapitalizePipe, DeviceUtilsService, HeaderService, LiteralFormats, HeaderTitleArray } from 'onesait-core';
import { DepositsService, AccountOS } from 'itecban-common';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-deposits-page',
  templateUrl: './deposits-page.component.html'
})
export class DepositsPageComponent implements OnInit, OnDestroy {

  private deviceUtilsServiceSubscription: Subscription;

  loading: boolean;
  currencies: any[] = [];
  productsByCurrency: any[] = [];
  depositCurrencySelected: any;
  view: string;
  defaultCurrency: string;
  accountFormatView: '';
  ismobileResolution: boolean;
  title = LiteralFormats.IBAN;
  getLocksServiceSubscription: Subscription;
  resolution;
  tabElement: TabElement[] = [];
  comboTitle: HeaderTitleArray;

  constructor(
    private utilsService: UtilsService,
    private depositsService: DepositsService,
    private appConfigService: AppConfigService,
    private router: Router,
    protected deviceUtilsService: DeviceUtilsService,
    private headerService: HeaderService

  ) {
    this.defaultCurrency = appConfigService.getConfig().products.defaultView;
    this.view = this.defaultCurrency;
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
    this.loading = true;
  }

  ngOnInit() {
    this.headerService.setTitle('MENU.DEPOSITS');
    // this.loadDeposit();
    this.currencies.push(this.utilsService.getCurrencyObj(this.defaultCurrency)); // metemos siempre EURO porque será la moneda por defecto
    this.productsByCurrency.push({
      divisa: this.defaultCurrency,
      balanceAmount: 0, // Total Inversion
      // amountFinancial: 0, // Totan Financiacion
      // amountDisposed: 0, // Total Dispuesto
      // amountSaved: 0, // Total Ahorrado
      // dataInvestment: [],
      // dataFinancial: []
    });
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.getDeposits();
  }

  // loadDeposit() {
  //   // Carga un solo depósito
  //   this.loading = true;
  //   this.depositsService.getProduct('02718').subscribe(res => {
  //    console.log(res);
  //     this.loading = false;
  //   }, (e) => { console.log(e); });
  // }

  getDeposits() {
    this.loading = true;
    let capitalizePipe = new CapitalizePipe();
    // Obtenemos la informacion recibida de la posicion parcial de depositos
    this.getLocksServiceSubscription = this.depositsService.getDeposits().subscribe(result => {
      let depositsByCurrency = null;
      // Si no se reciben datos, pinta la cabecera para la contratación de nuevos depósitos
      if (depositsByCurrency === null) {
        this.loading = false;
      }
      // Las cuentas vienen mezclados con las divisas, por eso lo dividimos
      depositsByCurrency = _.groupBy(result.data, (deposit: AccountOS) => {
        if (deposit.balance.currency.code === '' ) {
          deposit.balance.currency.code = '978';
        }
        return deposit.balance.currency.code;
      });
      // Recorremos las divisas encontradas para añadirlas a nuestro "Inventario" de divisas.
      // Si no ha salido ya, lo añadimos para que se cree la pestaña correspondiente
      for (let divitmp in depositsByCurrency) {
        // let divtemp2;
        if ( divitmp !== '') {
          let existInArray = false;
          for (let j = 0; j < this.currencies.length; j++) {
            if (this.currencies[j].code === divitmp) {
              // divtemp2 = this.currencies[j].code;
              existInArray = true;
            }
        }
        if (!existInArray) {
          this.currencies.push(this.utilsService.getCurrencyObj(divitmp));
          this.productsByCurrency.push({ divisa: divitmp });
        }
      }
        // Recorremos todas las cuentas por productos y por divisa para tener el total del importe por producto
        let balanceAmount = 0;
        // let postedBalanceAmount = 0;
        for (let index in depositsByCurrency[divitmp]) {
          balanceAmount += depositsByCurrency[divitmp][index].balance.amount;
          // postedBalanceAmount += depositsByCurrency[divitmp][index].postedBalance.amount;
        }
        depositsByCurrency[divitmp].balanceAmount = balanceAmount;
        // depositsByCurrency[divitmp].postedBalanceAmount = postedBalanceAmount;

        // Hacemos un json único separando principalmente por divisa
        for (let j = 0; j < this.productsByCurrency.length; j++) {
          if (this.productsByCurrency[j].divisa === divitmp) {
            this.productsByCurrency[j].deposits = depositsByCurrency[divitmp];
          }
        }
      }
      this.currencies.forEach(element => {
          this.tabElement.push({
            name: capitalizePipe.transform(element.id),
            view: element.code
          });
      });
      // Inicialmente cargamos los productos de EUROS ya que es la moneda por defecto
      this.chargeDepositsByCurrency('978');  // this.defaultCurrency
      this.loading = false;
    }, () => this.loading = false);
  }


  // Metodo que carga el nodo del JSON de la moneda que se ha seleccionado en los Tab por ventana
  chargeDepositsByCurrency(currencySelected: string) {
    this.depositCurrencySelected = {};
    this.view = currencySelected;
    for (let i = 0; i < this.productsByCurrency.length; i++) {
      if (this.productsByCurrency[i].divisa === currencySelected) {
        this.depositCurrencySelected = this.productsByCurrency[i];
        if(this.depositCurrencySelected.deposits) {
          this.depositCurrencySelected.balanceAmount = this.balanceAmountByCurrency(this.depositCurrencySelected.deposits);
        }
        this.depositCurrencySelected.divisa = this.productsByCurrency[i].divisa;
      }
    }
  }

  balanceAmountByCurrency(deposits: []): number {
    let balanceAmountByCurrency = 0;
    deposits.forEach((element: any) => {
      balanceAmountByCurrency += element.balance.amount;
    });
    return balanceAmountByCurrency;
  }

  viewDetail(deposit: AccountOS) {
    let link = RouterHelperService.getPathFromId('deposit-detail-page', { id: deposit.id });
    this.router.navigate([link]);
  }

  addDeposit() {
    let link = RouterHelperService.getPathFromId('deposit-add-page');
    this.router.navigate([link]);
  }

  ngOnDestroy() {
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
    if (this.getLocksServiceSubscription) {
      this.getLocksServiceSubscription.unsubscribe();
    }
  }
}
