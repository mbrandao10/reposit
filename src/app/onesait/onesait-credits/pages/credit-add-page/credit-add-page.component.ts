import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User, CreditNew, CreditProductData, CreditProductsDetail, GenericAccountCreditInfo, CustomerProductType, CurrenciesCredits } from 'onesait-api';
import { SignatureEntity, UtilsService, CustomersService, CreditsService, RouterHelperService, AppConfigService, SignatureTokenService, HeaderService, HeaderTitleElement, ShareService, ModalPageComponent, InputValidatorOptions, DatesValidator } from 'onesait-core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';
import * as _moment from 'moment';
const moment = _moment;
import { Subscription } from 'rxjs';
import { ConditionsElement } from 'itecban-common';

@Component({
  selector: 'osb-credit-add-page',
  templateUrl: './credit-add-page.component.html',
  styleUrls: ['./credit-add-page.component.scss']
})
export class CreditsAddPageComponent implements OnInit, OnDestroy {

  @Input() modal: ModalPageComponent;
  private subscriptionBack: Subscription;

  user: User;
  userName: string;

  step: string;
  creditNew: CreditNew;

  loading: boolean;
  creditProductData: CreditProductData[];
  accountFormatView: string;
  signatureEntity: SignatureEntity;
  productSelected: CreditProductData;
  creditProducts: CreditProductsDetail;
  importSel: number;
  genericAccountCreditInfo: GenericAccountCreditInfo;
  creditNewForm: FormGroup;
  listCurrencies: CurrenciesCredits[];

  finishDate: string;
  defaultCurrency: CurrenciesCredits;

  date = new Date();
  dateMore = this.date.getDate() + this.date.getTime() + 86400000;
  minDate = new Date(this.dateMore);

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };

  conditions: ConditionsElement = {
    data: [
      { icon: 'icon icononesait icon-accounts', text: 'ITECBAN-ACCOUNT.ADD.LINK.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Condiciones_Generales_ahorro.pdf', read: false },
      { icon: 'icon icononesait icon-accounts', text: 'ITECBAN-ACCOUNT.ADD.LINK.DOCUMENTS.PRECONTRACT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Ficha_Pre_contractual.ppt', read: false },
      { icon: 'icon icononesait icon-accounts', text: 'ITECBAN-ACCOUNT.ADD.LINK.DOCUMENTS.FGD', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/FGD_dIGITAL.ppt', read: false },
      { icon: 'icon icononesait icon-accounts', text: 'ITECBAN-ACCOUNT.ADD.LINK.DOCUMENTS.RATE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Tarifas_Empresas.pdf', read: false },
    ]
  };
  primeraEntrada = false;
  acceptTerms = false;
  checkControl = false;
  activeBoton = false;

  constructor(
    private utilsService: UtilsService,
    private customersService: CustomersService,
    protected creditsService: CreditsService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected routerHelperService: RouterHelperService,
    private appConfigService: AppConfigService,
    private signatureTokenService: SignatureTokenService,
    private headerService: HeaderService,
    private shareService: ShareService
  ) {
    this.createFormControl();
    this.setStep('FIRST');
  }

  ngOnInit() {
    let level1: HeaderTitleElement;

    level1 = {
      title: 'HEADER.TITLE.CREDITS',
      routeId: 'credits-page'
    };

    if (this.modal && this.modal.getHeader()) {
      this.modal.getHeader().setTitle('HEADER.TITLE.CREDITS-ADD');
      this.subscriptionBack = this.modal.getHeader().backObservable.subscribe(() => {
        this.back();
      });
    } else {
      this.headerService.setTitle(level1, 'HEADER.TITLE.CREDITS-ADD');
    }

    this.listCurrencies = this.appConfigService.getConfig().currencies;
    // Divisa obtenida de la página principal de créditos credits-page
    this.defaultCurrency = _.findWhere(this.listCurrencies, { code: this.shareService.getData('creditCurrencySelected') });
    if (!this.defaultCurrency) {
      this.defaultCurrency = _.findWhere(this.listCurrencies, { code: this.appConfigService.getConfig().defaultCurrency });
    }

    this.user = this.utilsService.getUser();
    if (this.user.userName) {
      this.userName = this.user.userName;
    }
    if (this.user.userFirstSurname) {
      this.userName += ' ' + this.user.userFirstSurname;
    }
    if (this.user.userSecondSurname) {
      this.userName += ' ' + this.user.userSecondSurname;
    }
    this.genericAccountCreditInfo = {
      userId: this.user.userLegalId,
      // Empresa
      username: this.user.activeProfileObj.contractName,
      // Apoderado
      attorney: this.user.userName
    };
    this.getProducts();
  }

  ngOnDestroy() {
    if (this.subscriptionBack) {
      this.subscriptionBack.unsubscribe();
    }
  }

  createFormControl() {
    let creationDate = Number(moment(new Date()).add(1, 'days').format('YYYYMMDD'));

    this.creditNewForm = new FormGroup({
      productSel: new FormControl('', Validators.required),
      importSel: new FormControl('', [Validators.required, this.amountValidator, Validators.min(0.01), Validators.max(99999999.99)]),
      expirationDate: new FormControl('', [Validators.required, DatesValidator.CreationDateValidator(creationDate)])
    });
  }

  changeSelectProduct(event: any) {
    this.productSelected = event;
    if (this.productSelected) {
      this.getDetailProduct(this.productSelected.id);
    }
  }

  getProducts() {
    this.loading = true;
    this.customersService.getProducts(CustomerProductType.OVERDRAFTS).subscribe(results => {
      this.creditProductData = results.data;
      this.loading = false;
    }, (e) => {
      this.loading = false;
      console.log(e);
    });
  }

  getDetailProduct(productCode: string) {
    this.loading = true;
    this.creditsService.getProducts(productCode).subscribe(result => {
      this.creditProducts = result.data;
      this.loading = false;
    }, () => this.loading = false);
  }

  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let rf = new RegExp(/^(\d{1,3}(\.\d{3})*|(\d+))(\,\d{0,2})?$/);
    if (control.value !== undefined && control.value !== null) {
      let value: string = '' + control.value;
      if (!rf.test(value)) {
        return { 'invalidAmount': true };
      }
      let valueN = +value.replace(/\./g, '').replace(/\,/g, '.');
      if (isNaN(valueN)) { return { 'invalidAmount': true }; }
      if (valueN < 0.01) {
        return { 'min': true };
      }
      if (valueN > 99999999.99) {
        return { 'max': true };
      }
    }
    return null;
  }

  applyFormatInput() {
    if (!this.creditNewForm.get('importSel').invalid) {
      let n = this.creditNewForm.get('importSel').value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = + n;
      this.importSel = n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.creditNewForm.get('importSel').setValue(n);
    }
  }

  addCredit() {
    this.creditNew = {
      productCode: this.productSelected.id,
      amount: {
        amount: this.importSel,
        currency: this.defaultCurrency.code,
      },
      expirationDate: moment(this.creditNewForm.controls.expirationDate.value).format('DD/MM/YYYY')
    };

    // if (this.creditNewForm.controls.expirationDate.value) {
    //   this.creditNew.expirationDate = moment(this.creditNewForm.controls.expirationDate.value).format('YYYY-MM-DD');
    // }

    this.loading = true;
    this.creditsService.postCredits(this.creditNew, this.signatureEntity).subscribe(() => {
      this.setStep('CREATED');
      this.finishDate = moment(new Date()).format('DD/MM/YYYY HH:mm');
      this.signatureEntity = null
      this.loading = false;
    }, e => {
      this.loading = false;
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.setStep('TOKEN');
      }

    });
  }

  cancel() {
    this.signatureEntity = null;
    let link = [RouterHelperService.getPathFromId('credits-page')];
    this.router.navigate(link);
    if (this.modal) {
      this.modal.close();
    }
  }

  back() {
    this.signatureEntity = null;
    this.setStep('FIRST');
  }

  goToCredits() {
    if (this.subscriptionBack) {
      this.subscriptionBack.unsubscribe();
    }
    this.signatureEntity = null;
    let link = [RouterHelperService.getPathFromId('credits-page')];
    this.router.navigate(link);
    if (this.modal) {
      this.modal.close();
    }
  }

  tokenCompleted() {
    this.addCredit();
  }

  setStep(step: string) {
    this.step = step;
    if (this.modal && this.modal.getHeader()) {
      switch (this.step) {
        case 'TOKEN':
          this.modal.getHeader().setBackVisible(true);
          break;
        default:
          this.modal.getHeader().setBackVisible(false);
          break;
      }
    }
  }

  // Para ventana de condiciones

  downloadDocument(document: string) {
    let url: string;
    if (document === 'pre-contractual') {
      url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Condiciones_Generales_ahorro.pdf';
    }
    if (url !== undefined) {
      window.open(url, '_blank');
    }
  }

  controlCheck() {
    this.checkControl = !this.checkControl;
  }

  returnOperation(event: boolean) {
    this.activeBoton = event;
  }

}
