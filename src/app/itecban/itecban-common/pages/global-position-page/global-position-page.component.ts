import { Component,  OnInit,  OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService, CurrencyPipe, HeaderService, CustomersService, UserSessionService, PageConfiguration, TabElement, CapitalizePipe } from 'onesait-core';
import * as _ from 'underscore';
import { AccountOS } from '../../classes/entities/accounts/account';
import { TranslateService } from '@ngx-translate/core';
import { GenericResponse, CustomerPosition } from 'onesait-api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-global-position-page',
    templateUrl: './global-position-page.component.html'
    // tslint:disable-next-line:indent
})
export class GlobalPositionPageComponent implements OnInit, OnDestroy {

  loading: boolean;
  param: any;
  userNumber: string;
  currencies: any[] = [];
  productsByCurrency: any[] = [];
  view = '';
  accountsByCurrency: AccountOS [];
  accountCurrencySelected: any = {};
  showAccounts: boolean;
  totalAccounts: number;
  routeIdAccounts: string;
  colorInvestment: string[];
  colorFinancial: string[];
  changeProfileSusbscription: Subscription;
  pageConfig: PageConfiguration;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private headerService: HeaderService,
    protected utilsService: UtilsService,
    private translateService: TranslateService,
    protected customersService: CustomersService,
    private userSessionService: UserSessionService
  ) {
    this.changeProfileSusbscription = this.userSessionService.getChangeProfileEvent().subscribe(() => {
      this.currencies = [];
      this.initializeGlobalPosition();
    });
  }

  ngOnInit() {
   this.initializeGlobalPosition();
  }

  initializeGlobalPosition() {
     // guadamos en variables los path necesarios en la posicion global recogiendolos del config
     this.headerService.setTitle('HEADER.TITLE.GLOBAL-POSITION');
     this.param = { name: this.utilsService.getUser().userName };
     this.userNumber = this.utilsService.getUser().userNumber;
     this.showAccounts = false;
     this.productsByCurrency = [];
     this.currencies.push(this.utilsService.getCurrencyObj('978')); // metemos siempre EURO porque será la moneda por defecto
     this.productsByCurrency.push({divisa: '978',
                                   amountInvestment: 0, // Total Inversion
                                   amountFinancial: 0, // Totan Financiacion
                                   amountDisposed: 0, // Total Dispuesto
                                   amountSaved: 0, // Total Ahorrado
                                   dataInvestment: [],
                                   dataFinancial: [] });
     this.colorInvestment = ['#b7d3f1', '#acc5e1', '#9ab0c8', '#5992e9', '#1A628A', '#3a5f97'];
     this.colorFinancial = ['#eec444', '#dcb640', '#c9a63a', '#f7a11f', '#B35800', '#c68219'];
     this.getGlobalPosition();
  }

  getGlobalPosition() {
    this.loading = true;
    // Obtenemos la informacion recibida de la posicion global
    this.customersService.getGlobalPosition().subscribe( (result: GenericResponse<CustomerPosition>) => {
      let accountsByCurrency = null;
      // Recorremos todos los nodos principales que corresponde a cada uno de los diferentes productos
      // Pero con el inconveniente de que vienen mezclados con las divisas, por eso lo dividimos tambien por divisa
      for (let products in result.data) {
        if (result.data[products].length > 0 ) {
          if (products === ('loans')) {
            accountsByCurrency = _.groupBy(result.data[products], (account: any) => { return account.pendingAmount.currency.code; });
          } else if (products === ('confirming')) {
            accountsByCurrency = _.groupBy(result.data[products], (account: any) => { return account.agreedBalanceAccepted.currency.code; });
          } else if (products === ('factoring')) {
            accountsByCurrency = _.groupBy(result.data[products], (account: any) => { return account.financingLimit.currency.code; });
          } else if (products === ('leasing')) {
            accountsByCurrency = _.groupBy(result.data[products], (account: any) => { return account.outstandingBalance.currency.code; });
          } else if (products === ('guarantees')) {
            accountsByCurrency = _.groupBy(result.data[products], (account: any) => { return account.amount.currency.code; });
          } else {
            accountsByCurrency = _.groupBy(result.data[products], (account: any) => { if (account.postedBalance.currency.code)
                                                                                          return account.postedBalance.currency.code; 
                                                                                      else return 978;
                                                                                    });
          }

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
              this.productsByCurrency.push({divisa: divitmp,
                                            amountInvestment: 0, // Total Inversion
                                            amountFinancial: 0, // Totan Financiacion
                                            amountDisposed: 0, // Total Dispuesto
                                            amountSaved: 0, // Total Ahorrado
                                            dataInvestment: [],
                                            dataFinancial: []
                                          });
            }

            // Recorremos todas las cuentas por productos y por divisa para tener el total del importe por producto
            let totalAmount = 0;
            let amountDisposed = 0;
            for (let index in accountsByCurrency[divitmp]) {
              if (products === ('loans')) {
                totalAmount += accountsByCurrency[divitmp][index].pendingAmount.amount;
                amountDisposed += accountsByCurrency[divitmp][index].pendingAmount.amount;
              } else if (products === ('confirming')) {
                totalAmount += accountsByCurrency[divitmp][index].agreedBalanceAccepted.amount;
              } else if (products === ('factoring')) {
                totalAmount += accountsByCurrency[divitmp][index].financingLimit.amount;
              } else if (products === ('leasing')) {
                totalAmount += accountsByCurrency[divitmp][index].outstandingBalance.amount;
              } else if (products === ('guarantees')) {
                totalAmount += accountsByCurrency[divitmp][index].amount.amount;
              } else {
                totalAmount += accountsByCurrency[divitmp][index].postedBalance.amount;

                if (products === ('credits')) {
                  amountDisposed += accountsByCurrency[divitmp][index].outstandingBalance.amount;
                } else if (products === ('cards')) {
                  amountDisposed += accountsByCurrency[divitmp][index].outstandingBalance.amount;
                }
              }
            }
            // Hacemos esta diferenciación porque necesitamos que se muestre en positivo el importe pendiente del prestamo
            if (products === ('loans')) {
              accountsByCurrency[divitmp].totalAmount = (totalAmount * (-1));
            } else {
              accountsByCurrency[divitmp].totalAmount = totalAmount;
            }
            if (products === ('credits')) {
              accountsByCurrency[divitmp].totalAmount = amountDisposed;
            }

            if (products === ('cards')) {
              accountsByCurrency[divitmp].totalAmount = amountDisposed;
            }
 


            // Hacemos un json único separando principalmente por divisa, y dentro de cada divisa, por producto.
            for (let j = 0; j < this.productsByCurrency.length; j++) {
              if (this.productsByCurrency[j].divisa === divitmp) {
                // Vamos sumando los totales dependiendo los productos por financial o investment para pintar los totales en los graficos
                // Tambien vamos montando los array de donde se van a alimentar los gráficos
                if (products === ('loans')) {
                  totalAmount = totalAmount * (-1);
                  amountDisposed = amountDisposed * (-1);
                  this.productsByCurrency[j].amountFinancial += totalAmount;
                  this.productsByCurrency[j].amountDisposed += amountDisposed;
                  this.productsByCurrency[j].dataFinancial.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.LOANS.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                 count: totalAmount});
                } else if (products === ('confirming')) {
                  this.productsByCurrency[j].amountFinancial += totalAmount;
                  this.productsByCurrency[j].dataFinancial.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.CONFIRMING.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                 count: totalAmount});
                } else if (products === ('factoring')) {
                  this.productsByCurrency[j].amountFinancial += totalAmount;
                  this.productsByCurrency[j].dataFinancial.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.FACTORING.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                 count: totalAmount});
                } else if (products === ('leasing')) {
                  this.productsByCurrency[j].amountFinancial += totalAmount;
                  this.productsByCurrency[j].dataFinancial.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.LEASING.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                 count: totalAmount});
                } else if (products === ('guarantees')) {
                  this.productsByCurrency[j].amountInvestment += totalAmount;
                  this.productsByCurrency[j].dataInvestment.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.GUARANTEES.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                  count: totalAmount});
                } else if (products === ('accounts')) {
                  // Si el importe es negativo en una cuenta, pintamos el importe en positivo pero en la gráfica de financiación
                  if (totalAmount < 0) {
                    totalAmount = totalAmount * -1;
                    this.productsByCurrency[j].amountFinancial += totalAmount;
                    this.productsByCurrency[j].dataFinancial.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.ACCOUNTS.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                    count: totalAmount});
                  } else {
                    this.productsByCurrency[j].amountInvestment += totalAmount;
                    this.productsByCurrency[j].amountSaved += totalAmount;
                    this.productsByCurrency[j].dataInvestment.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.ACCOUNTS.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                    count: totalAmount});
                  }

                } else if (products === ('deposits')) {
                  this.productsByCurrency[j].amountInvestment += totalAmount;
                  this.productsByCurrency[j].amountSaved += totalAmount;
                  this.productsByCurrency[j].dataInvestment.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.DEPOSITS.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                  count: totalAmount});
                } else if (products === ('credits')) {
                  // Si el importe es negativo en un credito, pintamos el importe en positivo pero en la gráfica de ahorro
                  if (amountDisposed >= 0) {
                    this.productsByCurrency[j].amountInvestment += amountDisposed;
                    this.productsByCurrency[j].dataInvestment.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.CREDITS.TITLE') + ': ' + this.currencyPipe.transform(amountDisposed, divitmp),
                                                                 count: amountDisposed});
                  } else if (amountDisposed < 0) {
                    this.productsByCurrency[j].amountFinancial += Math.abs(amountDisposed);
                    this.productsByCurrency[j].amountDisposed += amountDisposed;
                    this.productsByCurrency[j].dataFinancial.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.CREDITS.TITLE') + ': ' + this.currencyPipe.transform(Math.abs(amountDisposed), divitmp),
                                                                 count: Math.abs(amountDisposed)});
                  }
                } else if (products === ('cards')) {
                  this.productsByCurrency[j].amountFinancial += Math.abs(amountDisposed);
                  this.productsByCurrency[j].amountDisposed += amountDisposed;
                  this.productsByCurrency[j].dataFinancial.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.CARDS.TITLE') + ': ' + this.currencyPipe.transform(Math.abs(amountDisposed), divitmp),
                                                                 count: Math.abs(amountDisposed)});
                } else if (products === ('investmentfunds')) {
                  if (totalAmount < 0) {
                    totalAmount = totalAmount * -1;
                    this.productsByCurrency[j].amountFinancial += totalAmount;
                    this.productsByCurrency[j].dataFinancial.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.INVESTMENTFUNDS.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                    count: totalAmount});
                  } else {
                    this.productsByCurrency[j].amountInvestment += totalAmount;
                    this.productsByCurrency[j].amountSaved += totalAmount;
                    this.productsByCurrency[j].dataInvestment.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.INVESTMENTFUNDS.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                    count: totalAmount});
                  }
                } else if (products === ('equities')) {
                  this.productsByCurrency[j].amountInvestment += totalAmount;
                  this.productsByCurrency[j].amountSaved += totalAmount;
                  this.productsByCurrency[j].dataInvestment.push({label: this.translateService.instant('ITECBAN-GLOBAL-POSITION.CARD.EQUITIES.TITLE') + ': ' + this.currencyPipe.transform(totalAmount, divitmp),
                                                                  count: totalAmount});
                }
                this.productsByCurrency[j]['' + products] = accountsByCurrency[divitmp];
              }
            }
          }
        }
      }

      // Inicialmente cargamos los productos de EUROS ya que es la moneda por defecto
      this.loading = false;
      this.chargeGlobalPositionByCurrency('978');
      this.loadTabsByCurrency();

    }, (e) => {
      console.log(e);
      this.loading = false;
     // this.errorManagerService.showErrorBusiness( e );
    });
  }

  // Metodo que carga el nodo del JSON de la moneda que se ha seleccionado en los Tab por ventana
  chargeGlobalPositionByCurrency(currencySelected: string) {
    this.accountCurrencySelected = {};
    this.view = currencySelected;

    for (let i = 0; i < this.productsByCurrency.length; i++) {
      if (this.productsByCurrency[i].divisa === currencySelected) {
        this.accountCurrencySelected = this.productsByCurrency[i];
      }
    }
  }

  loadTabsByCurrency() {
    this.pageConfig = new PageConfiguration();
    let tabsElements: TabElement[] = [];
    let capitalizePipe = new CapitalizePipe();
    this.currencies.forEach((currency) => {
      let element  = new TabElement();
      element.name = capitalizePipe.transform(currency.id);
      element.view = currency.code;
      tabsElements.push( element );
    });
    this.pageConfig.tabs = tabsElements;
  }

  client(item: any) {
    let link = ['/itecban/help/cliente', item];
    this.router.navigate(link);
  }

  ngOnDestroy() {
    this.changeProfileSusbscription.unsubscribe();
  }

}
