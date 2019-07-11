import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, TabElement, CapitalizePipe, DeviceUtilsService } from 'onesait-core';
import { ShareService, AppConfigService, RouterHelperService, UtilsService, HeaderService } from 'onesait-core';
import { AccountElement, AccountCurrencies, AccountProductsByCurrency } from 'onesait-api';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html'
})
export class AccountsPageComponent implements OnInit, OnDestroy {

  private deviceUtilsServiceSubscription: Subscription;

  loading: boolean;
  ismobileResolution: boolean;
  view: string;
  accountFormatView: string;
  tabElement: TabElement[] = [];
  currencies: AccountCurrencies[] = [];
  productsByCurrency: AccountProductsByCurrency[] = [];
  accountCurrencySelected: AccountProductsByCurrency = {};

  balance: any[] = [];
  postedBalance: any[] = [];
  detainedBalance: any[] = [];

  accountsCancelPeople = new Subject<any>();
  getAccountsObservable: Subscription;
  initCurrency = '978';

  constructor(
    protected accountService: AccountService,
    protected shareService: ShareService,
    protected router: Router,
    public utilsService: UtilsService,
    protected appConfigService: AppConfigService,
    protected routerHelperService: RouterHelperService,
    protected headerService: HeaderService,
    protected deviceUtilsService: DeviceUtilsService
    ) {
      this.view = appConfigService.getConfig().products.defaultView;
      this.accountFormatView = appConfigService.getConfig().account.viewKey;
      this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
        this.ismobileResolution = deviceUtilsService.isMobileResolution;
   });
  }

  ngOnInit() {
    this.headerService.setTitle('HEADER.TITLE.ACCOUNTS');
    this.currencies.push(this.utilsService.getCurrencyObj('978')); // metemos siempre EURO porque será la moneda por defecto
    this.productsByCurrency.push({divisa: '978', balanceAmount: 0});
    this.getAccounts();
  }

  getAccounts() {
    this.loading = true;
    let capitalizePipe = new CapitalizePipe();
    // Obtenemos la informacion recibida de la posicion parcial de cuentas
    this.getAccountsObservable = this.accountService.getAccounts().subscribe(result => {
      let accountsByCurrency = null;

      // Las cuentas vienen mezclados con las divisas, por eso lo dividimos
      accountsByCurrency = _.groupBy(result.data, (account: AccountElement) => { return account.currency.code; });
      // Recorremos las divisas encontradas para añadirlas a nuestro "Inventario" de divisas.
      // Si no ha salido ya, lo añadimos para que se cree la pestaña correspondiente
      for (let divitmp in accountsByCurrency) {
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
        let balanceAmount = 0;
        let postedBalanceAmount = 0;
        for (let index in accountsByCurrency[divitmp]) {
          balanceAmount += accountsByCurrency[divitmp][index].balance.amount;
          postedBalanceAmount += accountsByCurrency[divitmp][index].postedBalance.amount;
        }

        accountsByCurrency[divitmp].balanceAmount = balanceAmount;
        this.balance[divitmp] = accountsByCurrency[divitmp].balanceAmount;

        accountsByCurrency[divitmp].postedBalanceAmount = postedBalanceAmount;
        this.postedBalance[divitmp] = accountsByCurrency[divitmp].postedBalanceAmount;

        this.detainedBalance[divitmp] = this.balance[divitmp] - this.postedBalance[divitmp];

        // Hacemos un json único separando principalmente por divisa
        for (let j = 0; j < this.productsByCurrency.length; j++) {
          if (this.productsByCurrency[j].divisa === divitmp) {
            this.productsByCurrency[j].accounts = accountsByCurrency[divitmp];
          }
        }
      }

      for (let j = 0; j < this.currencies.length; j++) {
        this.tabElement.push({
            name: capitalizePipe.transform(this.currencies[j].id),
            view: this.currencies[j].code
        });
      }

      // Inicialmente cargamos los productos de EUROS ya que es la moneda por defecto
      this.loading = false;
      this.chargeAccountsByCurrency(this.initCurrency);
    }, () => this.loading = false);
  }

  // Metodo que carga el nodo del JSON de la moneda que se ha seleccionado en los Tab por ventana
  chargeAccountsByCurrency(currencySelected: string) {
    this.accountCurrencySelected = {};
    this.view = currencySelected;
    for (let i = 0; i < this.productsByCurrency.length; i++) {
      if (this.productsByCurrency[i].divisa === currencySelected) {
        this.accountsCancelPeople.next(this.productsByCurrency[i]);
        this.accountCurrencySelected = this.productsByCurrency[i];
      }
    }
  }

  // Cambios Sin Commit
  // Crear Nueva Cuenta
  addAccount() {
    let link = [RouterHelperService.getPathFromId('account-add-page')];
    this.router.navigate(link);
  }

  viewDetail(account: any) {
    let link = RouterHelperService.getPathFromId('account-detail-page',  {id: account.id});
		this.router.navigate([link]);
  }

  createTransfer() {
    this.shareService.setData('previusPage', this.router.url);
    let link = ['/itecban/transfer-make'];
    this.router.navigate(link);
  }

  goToCashpooling() {
    let link = RouterHelperService.getPathFromId('cashpooling-page');
		this.router.navigate([link]);
  }

  ngOnDestroy(): void {
    this.deviceUtilsServiceSubscription.unsubscribe();
    this.getAccountsObservable.unsubscribe();
  }
}
