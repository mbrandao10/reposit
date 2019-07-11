import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepositsService, NewDeposit, ProductDepositDetail, ConditionsElement } from 'itecban-common';
import { UtilsService, RouterHelperService, AppConfigService, AccountService, SignatureEntity, SignatureTokenService, CustomersService, ShareService, DeviceUtilsService, HeaderService, InputValidatorOptions, LiteralFormats } from 'onesait-core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerProductType, GenericAccountInfo, CurrenciesCredits, ProductExt, User } from 'onesait-api';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'underscore';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'osb-deposit-add-page',
  templateUrl: './deposit-add-page.component.html'
})
export class DepositAddPageComponent implements OnInit, OnDestroy {

  conditions: ConditionsElement;
  conditions4: ConditionsElement = {
    data: [
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit4/Condiciones_Generales_Depositos.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.PRECONTRACT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit4/Condiciones_Particulares_Deposito_NB_4_meses.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.FGD', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit4/FORMULARIO_DE_INFORMACION_DEL_DEPOSITANTE.pptx', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.RATE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit4/FICHA_INFORMACION_PRECONTRACTUAL_DEPOSITO_NB_4_MESES.pptx', read: false},
    ]};

  conditions6: ConditionsElement = {
    data: [
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit6/Condiciones_Generales_Depositos.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.PRECONTRACT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit6/Condiciones_Particulares_Deposito_NB_6_meses.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.FGD', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit6/FORMULARIO_DE_INFORMACION_DEL_DEPOSITANTE.pptx', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.RATE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit6/FICHA_INFORMACION_PRECONTRACTUAL_DEPOSITO_NB_6_MESES.pptx', read: false},
    ]};

  conditions12: ConditionsElement = {
    data: [
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit12/Condiciones_Generales_Depositos.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.PRECONTRACT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit12/Condiciones_Particulares_deposito_NB_12_meses.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.FGD', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit12/FORMULARIO_DE_INFORMACION_DEL_DEPOSITANTE.pptx', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-DEPOSITS.ADD.LINK.DOCUMENTS.RATE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Deposits/Deposit12/FICHA_INFORMACION_PRECONTRACTUAL_DEPOSITO_NB_12_MESES.pptx', read: false},
    ]
  };

  inputValidatorOptions = <InputValidatorOptions> {
    errorText: {
      MIN: 'Importe inferior a 25.000,00',
      MAX: 'Importe superior a 2.000.000,00',
      MAXLENGTH: 'Importe superior a 200.000,00'
    }
  };

  nameDeposit: any;
  loading: boolean;
  step = 'PRODUCTSELECT';
  products: ProductExt[];
  genericAccountInfo: GenericAccountInfo;
  productSelected: string;
  productSelectedCode: string;
  productDepositDetail: ProductDepositDetail;
  newDeposit: NewDeposit;
  userId: string;
  username: string;
  attorney: string;
  user: User;
  accounts: any = [];
  idDepositCreate = {IBAN: '', id: ''};
  token = '';
  tokenValid = '';
  accountFormatView: string;
  signatureEntity: SignatureEntity;
  ismobileResolution: boolean;
  mobileResolution: string = 'default';
  LiteralFormats = LiteralFormats.IBAN;

  getLocksServiceSubscription: Subscription;
  private deviceUtilsServiceSubscription: Subscription;
  contract: any;

  depositNewForm: FormGroup;
  listCurrencies: CurrenciesCredits[];
  defaultCurrency: CurrenciesCredits;
  dateAndTime: Date;
  importSel: number;
  importe = {
    min: {  // Importe mínimo para los depósitos
      amount: 25000,
      currency: {
        id: '978',
        code: ''
      }
    },
    max: {  // Importe máximo para depósito de 6 y 12 meses
      amount: 2000000,
      currency: {
        id: '978',
        code: ''
      }
    },
    max4: {  // Importe máximo para depósito de 4 meses
      amount: 200000,
      currency: {
        id: '978',
        code: ''
      }
    },
    openingDate: Date.now(),  // Fecha de apertura
  };
  activeBoton = false;
  checkControl = false;

  constructor(
    private depositsService: DepositsService,
    private customersService: CustomersService,
    private utilsService: UtilsService,
    private accountService: AccountService,
    private router: Router,
    private appConfigService: AppConfigService,
    private signatureTokenService: SignatureTokenService,
    private shareService: ShareService,
    protected deviceUtilsService: DeviceUtilsService,
    private headerService: HeaderService,
    private translateService: TranslateService
  ) {
    this.createFormControl();
    this.utilsService.accesForbidden();
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
    this.contract = this.newDeposit;
   }

  ngOnInit() {
    this.resetConditions();
    let conditions;
    let page;
    this.translateService.get('ITECBAN-DEPOSITS.ADD.CONTRACT.CONDITIONS').subscribe((result: any) => {
      conditions = result;
    });
    this.translateService.get('MENU.DEPOSITS').subscribe((result: any) => {
      page = result;
    });
    let title = conditions + ' - ' + page;
    this.headerService.setTitle(title);
    this.user = this.utilsService.getUser();
    this.userId = this.user.userLegalId;
    this.username = ''; // this.user.userName + ' ' + this.user.userFirstSurname + ' ' + this.user.userSecondSurname;
    this.attorney = this.user.userNumber;
    this.newDeposit = {
      accountId: '',
      amount: {
        amount: 0,
        currency: {
          id: '',
          code: ''
        }
      },
      productCode: '',
      duration: 30
    };

    // Comprobación nombre del usuario
    if (this.user.userName) {
      this.username = this.user.activeProfileObj.contractName;
    }
    if (this.user.userFirstSurname) {
      this.username += ' ' + this.user.userFirstSurname;
    }
    if (this.user.userSecondSurname) {
      this.username += ' ' + this.user.userSecondSurname;
    }

    // Comprobación empresa
    if (this.user.userName) {
      this.attorney = this.user.userName;
    }

    this.genericAccountInfo = {
      userId: this.user.userLegalId,
      // Empresa
      username: this.user.activeProfileObj.contractName,
      // Apoderado
      attorney: this.user.userName
    };

    this.listCurrencies = this.appConfigService.getConfig().currencies;
    // Divisa obtenida de la página principal de créditos credits-page
    this.defaultCurrency = _.findWhere(this.listCurrencies, { code: this.shareService.getData('creditCurrencySelected') });
    if (!this.defaultCurrency) {
      this.defaultCurrency = _.findWhere(this.listCurrencies, { code: this.appConfigService.getConfig().defaultCurrency });
    }

    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.getAccounts();
    // this.getProducts();
  }

  createFormControl() {
    this.depositNewForm = new FormGroup({
      associateAccount: new FormControl(null, Validators.required),
      selectCuenta: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, this.amountValidator])
    });
  }

  getAccounts() {
    this.loading = true;
    this.accountService.getAccounts().subscribe((results) => {
      this.accounts = results.data;
      this.getProducts();
    }, () => {
      this.loading = false;
    });
  }

  // getProducts() {
  //   this.loading = true;
  //   this.depositsService.getProducts().subscribe(results => {
  //     this.products = results.data;
  //     if (this.products && this.products.length) {
  //       // this.productSelected = this.products[0];
  //       this.productSelectedCode = this.products[0].code;
  //       this.getProduct(this.productSelectedCode);
  //     }
  //   }, () => {
  //     this.loading = false;
  //   });
  // }

  getProducts() {
    this.loading = true;
    this.customersService.getProducts(CustomerProductType.FIXED_TERM_DEPOSITS).subscribe( results => {
      this.products = results.data;
      this.orderProduct();
      this.products = _.sortBy(results.data, function( res ) { return res.type.name; }).reverse();
      if (this.products && this.products.length) {
        this.productSelected = this.products[0].id;
        // Se comenta para que no cargue el producto en primer lugar y así no de error en IE.
        // this.getDetailProduct(this.productSelected);
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  /*
    Método para ordenar los productos en el combo de contratación
  */
  orderProduct() {
    this.products.forEach(orden => {
      // Extrae el número en el nombre del producto
      let n: any = orden.name.substring(12, 14);
      n = n * 1;
      if (n <= 9) {
        // Añade un 0 delante del número para poder hacer la ordenación
        n = '0' + n;
      }
      orden.type.name = n; // Añade el número en el campo vacío type
    });
  }

  getDetailProduct(productCode: string) {
    this.loading = true;
    let normal = false;
    if (normal) {
      this.depositsService.getProduct( productCode ).subscribe( (result: any) => {
        this.productDepositDetail = result.data;
        this.productDepositDetail.minimalAmount = this.importe.min;
        this.loading = false;
      }, () => {
        this.productDepositDetail = new ProductDepositDetail();
        this.productDepositDetail.minimalAmount = this.importe.min;
        this.changeProduct(productCode);
        this.loading = false;
      });
    } else {
      this.productDepositDetail = new ProductDepositDetail();
      this.productDepositDetail.minimalAmount = this.importe.min;
      this.changeProduct(productCode);
      this.loading = false;
    }
  }

  // getProduct(productCode) {
  //   this.loading = true;
  //   this.depositsService.getProduct( productCode ).subscribe( (result: any) => {
  //     this.productDepositDetail = result.data;
  //     this.newDeposit.productCode = this.productSelectedCode;
  //     this.newDeposit.amount.currency = result.data.currency;
  //     this.loading = false;
  //   }, () => {
  //     this.loading = false;
  //   });
  // }

  changeProduct(product: any) {
    // if (product.value) {
      this.newDeposit.productCode = product;
      // this.nameDeposit = this.products[product];
    // }
    // this.conditions = this.conditions4;
    // this.getDetailProduct(product);
    // this.getDetailProduct(this.productSelected);
    if (product === '03885') {
      this.conditions = this.conditions4;
      this.nameDeposit = this.products[2].name;

      // Para el cambio de duración cada vez que se cambia el producto
      console.log('DETALLES --> ',this.productDepositDetail);
      this.productDepositDetail.duration = this.calculateDate(4);
    } else if (product === '03828') {
      this.conditions = this.conditions6;
      this.nameDeposit = this.products[1].name;
      this.productDepositDetail.duration = this.calculateDate(6);
    } else if (product === '03837') {
      this.conditions = this.conditions12;
      this.nameDeposit = this.products[0].name;
      this.productDepositDetail.duration = this.calculateDate(12);
    } else {
      this.conditions = this.conditions12;
      this.nameDeposit = this.products[0].name;
      this.productDepositDetail.duration = this.calculateDate(12);
    }
    // Limpia el campo del importe al hacer cambio entre depósitos
    this.depositNewForm.get('amount').setValue('');
    this.resetConditions();
  }


  controlCheck() {
    this.checkControl = !this.checkControl;
  }

  downloadDocument() {

  }

  tokenCompleted() {
    this.addDeposit();
  }

  // Guarda los datos del formulario
  saveDeposit() {
    this.contract = this.newDeposit;
    this.contract.accountId = this.depositNewForm.get('associateAccount').value;
    this.idDepositCreate.IBAN = this.depositNewForm.get('associateAccount').value;
    this.contract.amount.currency = this.accounts[0].currency.code;
    this.contract.amount.amount = this.depositNewForm.get('amount').value;
    let n = this.contract.amount.amount;
    n = n.replace(/\./g, '');
    this.contract.amount.amount = n.replace(/,/g, '.');
  }

  addDeposit() {
    this.loading = true;
    this.saveDeposit();
    this.depositsService.postDeposits( this.newDeposit , this.signatureEntity).subscribe( result => {
      this.idDepositCreate.id = result.data.id;
      this.dateAndTime = new Date;
      this.step = 'CREATED';
      this.loading = false;
    },  e => {
      this.loading = false;
      if ( this.signatureTokenService.requireSignature(e) ) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.step = 'TOKEN';
      }
    });
  }


  close() {
    let link = [RouterHelperService.getPathFromId('deposits-page')];
    this.router.navigate(link);
  }

  returnOperation(event: boolean) {
    this.activeBoton = event;
  }

  ngOnDestroy() {
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
  }

  applyFormatInput() {
    if (!this.depositNewForm.get('amount').invalid) {
      let n = this.depositNewForm.get('amount').value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = + n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.depositNewForm.get('amount').setValue(n);
    }
  }

  // Validador para los importes de los depósitos
  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let rf = new RegExp(/^(\d{1,3}(\.\d{3})*|(\d+))(\,\d{0,2})?$/);
    if (control.value !== undefined && control.value !== null && control.value !== '') {
      let ctrl: any = control;
      let maxAmount = ctrl._parent.value.selectCuenta;
      let value: string;
      let valueN: number;
      switch (maxAmount) {
        case '03885':
          // Validación para 4 meses
            value = '' + control.value;
            if (!rf.test(value)) {
              return { 'invalidAmount': true };
            }
            valueN = +value.replace(/\./g, '').replace(/\,/g, '.');
            if (isNaN(valueN)) {
              return { 'invalidAmount': true };
            }
            if (valueN < 25000) {
              return { 'min': true };
            }
            if (valueN > 200000) {
              return { 'maxlength': true };
            }
          break;
        default:
         // Validación para el resto de depósitos
            value = '' + control.value;
            if (!rf.test(value)) {
              return { 'invalidAmount': true };
            }
            valueN = +value.replace(/\./g, '').replace(/\,/g, '.');
            if (isNaN(valueN)) {
              return { 'invalidAmount': true };
            }
            if (valueN < 25000) {
              return { 'min': true };
             }
            if (valueN > 2000000) {
               return { 'max': true };
               }
          break;
      }
    }
    return null;
  }

  calculateDate(duration: number) {
    let endDate;
    let closeDate = new Date();

    switch (duration) {
      case 4:
        endDate = closeDate.setMonth (closeDate.getMonth() + duration);
        break;
      case 6:
        endDate = closeDate.setMonth (closeDate.getMonth() + duration);
        break;
      case 12:
        endDate = closeDate.setMonth (closeDate.getMonth() + duration);
        break;
    }
    return endDate;
  }

  back() {
    this.signatureEntity = null;
    this.step = 'PRODUCTSELECT';
  }

  // Método para resetear las condiciones de contratación
  // TODO cambiar documento de descarga
  resetConditions() {
    this.activeBoton = false;
    this.checkControl = false;
  }
}
