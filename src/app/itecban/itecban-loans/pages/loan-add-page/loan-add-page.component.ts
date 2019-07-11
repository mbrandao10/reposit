import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ModalPageComponent, SignatureEntity, UtilsService, CustomersService, RouterHelperService, AppConfigService, SignatureTokenService, HeaderService, HeaderTitleElement, ShareService, InputValidatorOptions } from 'onesait-core';
import { User, CustomerProductType, CurrenciesCredits } from 'onesait-api';
import { LoanNew, LoansService, LoanProductData, LoanProductsDetail, GenericAccountLoanInfo } from 'itecban-common';
import * as _ from 'underscore';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'osb-loan-add-page',
  templateUrl: './loan-add-page.component.html',
  styleUrls: ['./loan-add-page.component.scss']
})
export class LoanAddPageComponent implements OnInit, OnDestroy {

  @Input() modal: ModalPageComponent;

  user: User;
  userName: string;
  step: string;
  importSel: number;
  loanNew: LoanNew;
  loading: boolean;
  finishDate: string;
  loanNewForm: FormGroup;
  accountFormatView: string;
  subscriptionBack: Subscription;

  loanProducts: LoanProductsDetail;
  signatureEntity: SignatureEntity;
  productSelected: LoanProductData;
  loanProductData: LoanProductData[];
  defaultCurrency: CurrenciesCredits;
  listCurrencies: CurrenciesCredits[];
  genericAccountLoanInfo: GenericAccountLoanInfo;
  customersServiceSubscription: Subscription;
  loansServiceSubscription: Subscription;

  date = new Date();
  dateMore = this.date.getDate() + this.date.getTime() + 86400000;
  minDate = new Date(this.dateMore);

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };
  
  constructor(
    private utilsService: UtilsService,
    private customersService: CustomersService,
    protected loansService: LoansService,
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
      title: 'HEADER.TITLE.LOANS',
      routeId: 'loans-page'
    };

    if (this.modal && this.modal.getHeader()) {
      this.modal.getHeader().setTitle('HEADER.TITLE.LOANS-ADD');
      this.subscriptionBack = this.modal.getHeader().backObservable.subscribe(() => {
        this.back();
      });
    } else {
      this.headerService.setTitle(level1, 'HEADER.TITLE.LOANS-ADD');
    }

    this.listCurrencies = this.appConfigService.getConfig().currencies;
    this.defaultCurrency = _.findWhere(this.listCurrencies, { code: this.shareService.getData('loanCurrencySelected') });
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
    this.genericAccountLoanInfo = {
      userId: this.user.userLegalId,
      // Empresa
      username: this.user.activeProfileObj.contractName,
      // Apoderado
      attorney: this.user.userName
    };
    this.getProducts();
  }


  createFormControl() {
    this.loanNewForm = new FormGroup({
      productSel: new FormControl('', Validators.required),
      importSel: new FormControl('', [Validators.required, this.amountValidator, Validators.min(0.01), Validators.max(99999999.99)]),
      period: new FormControl('', Validators.required)
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
    this.customersServiceSubscription = this.customersService.getProducts(CustomerProductType.LOANDS).subscribe(results => {
      this.loanProductData = results.data;
      this.loading = false;
    }, (e) => {
      this.loading = false;
      console.log(e);
    });
  }

  getDetailProduct(productCode: string) {
    this.loading = true;
    this.loansServiceSubscription = this.loansService.getLoanProduct(productCode).subscribe(result => {
      this.loanProducts = result.data;
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
      if (valueN < 0.01) { return { 'min': true }; }
      if (valueN > 99999999.99) { return { 'max': true }; }
    }
    return null;
  }

  applyFormatInput() {
    if (!this.loanNewForm.get('importSel').invalid) {
      let n = this.loanNewForm.get('importSel').value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = + n;
      this.importSel = n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.loanNewForm.get('importSel').setValue(n);
    }
  }

  addLoan() {
    this.loanNew = {
      productCode: this.productSelected.id,
      amount: {
        amount: this.importSel,
        currency: this.defaultCurrency.code
      },
      period: moment(this.loanNewForm.controls.period.value).format('DD/MM/YY')
    };

    this.loading = true;
    this.loansService.postNewLoan(this.loanNew, this.signatureEntity).subscribe(() => {
      this.setStep('CREATED');
      this.finishDate = moment(new Date()).format('DD/MM/YYYY HH:mm');
      this.signatureEntity = null;
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
    let link = [RouterHelperService.getPathFromId('loans-page')];
    this.router.navigate(link);
    if (this.modal) {
      this.modal.close();
    }
  }

  back() {
    this.signatureEntity = null;
    this.setStep('FIRST');
  }

  goToAccounts() {
    if (this.subscriptionBack) {
      this.subscriptionBack.unsubscribe();
    }
    this.signatureEntity = null;
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
    if (this.modal) {
      this.modal.close();
    }
  }

  tokenCompleted() {
    this.addLoan();
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

  ngOnDestroy() {
    if (this.subscriptionBack) {
      this.subscriptionBack.unsubscribe();
    }
    if (this.customersServiceSubscription) {
      this.customersServiceSubscription.unsubscribe();
    }
    if (this.loansServiceSubscription) {
      this.loansServiceSubscription.unsubscribe();
    }
  }

}
