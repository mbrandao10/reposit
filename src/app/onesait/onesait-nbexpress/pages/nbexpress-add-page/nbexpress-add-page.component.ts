import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HeaderService, UtilsService, RouterHelperService, CustomersService, SignatureEntity, SignatureTokenService, NBExpressBillService, ModalPageComponent, HeaderTitleElement } from 'onesait-core';
import { ConfirmingContracts, GenericListResponse, ConfirmingNewContract, CustomerProductType, ProductExt } from 'onesait-api';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _moment from 'moment';
import { InputValidatorOptions } from 'onesait-core';
const moment = _moment;

@Component({
  selector: 'osb-nbexpress-add-page',
  templateUrl: './nbexpress-add-page.component.html'
})
export class NbExpressAddPageComponent implements OnInit, OnDestroy {

  @Input() modal: ModalPageComponent;

  loading: boolean;
  contracts: ConfirmingContracts[];
  step: string;
  accountInfo: any;
  productSelected: any;
  products: ProductExt[];
  newExpressForm: FormGroup;
  signatureEntity: SignatureEntity;
  finishDate: Date;
  importSel: number;

  date = new Date();
  dateMore = this.date.getDate() + this.date.getTime() + 86400000;
  minDate = new Date(this.dateMore);
  private subscriptionBack: Subscription;

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };

  constructor(
    private customersService: CustomersService,
    private nbExpressBillService: NBExpressBillService,
    private signatureTokenService: SignatureTokenService,
    private headerService: HeaderService,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.createFormControl();
    this.setStep('FIRST');
  }

  ngOnInit() {
    let level1: HeaderTitleElement;

    level1 = {
      title: 'HEADER.TITLE.EXPRESS',
      routeId: 'express-bill-page'
    };

    let user = this.utilsService.getUser();

    this.accountInfo = {
      userId: user.userLegalId,
      username: user.userName + ' ' + user.userFirstSurname + ' ' + user.userSecondSurname,
      attorney: user.userName
    };

    this.customersService.getProducts(CustomerProductType.EXPRESS_BILL).subscribe((result: GenericListResponse<ProductExt>) => {
      this.products = result.data;
    });

    if (this.modal && this.modal.getHeader()) {
      this.subscriptionBack = this.modal.getHeader().backObservable.subscribe(() => {
        this.back();
      });
      this.modal.getHeader().setTitle('HEADER.TITLE.EXPRESS-ADD');
    } else {
      this.headerService.setTitle(level1, 'HEADER.TITLE.EXPRESS-ADD');
    }
  }

  ngOnDestroy() {
    if (this.subscriptionBack) {
      this.subscriptionBack.unsubscribe();
    }
  }

  createFormControl(): void {
    this.newExpressForm = new FormGroup({
      product: new FormControl('', Validators.required),
      expirationDate: new FormControl('', Validators.required),
      minAmount: new FormControl('', [Validators.required, this.amountValidator]),
      maxAmount: new FormControl('', [Validators.required, this.amountValidator]),
    }, this.groupValidationAmounts('ONESAIT-CONFIRMING'));
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

  groupValidationAmounts(prefix: string): ValidatorFn {
    let result = (group: FormGroup): { [key: string]: boolean } | null => {
      let minAmountString = group.get('minAmount').value;
      let maxAmountString = group.get('maxAmount').value;
      let minAmount = (minAmountString !== '') ? Number(minAmountString.replace(/\./g, '').replace(/\,/g, '.')) : '';
      let maxAmount = (maxAmountString !== '') ? Number(maxAmountString.replace(/\./g, '').replace(/\,/g, '.')) : '';
      //Valida si tiene valor 
      if (minAmount !== '' && maxAmount !== '') {
        if (minAmount >= maxAmount) {
          let compose = prefix + '.exceededAmount';
          return { [compose]: true };
        }
      }
      return null;
    };
    return result;
  }

  applyFormatInput(control: AbstractControl) {
    if (!control.invalid) {
      let n = control.value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = + n;
      this.importSel = n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      control.setValue(n);
    }
  }

  confirm() {

    let expressNewContract: ConfirmingNewContract = new ConfirmingNewContract();
    expressNewContract.productId = this.newExpressForm.get('product').value.id;
    expressNewContract.expirationDate =  moment(this.newExpressForm.get('expirationDate').value).format('YYYY-MM-DD');
    expressNewContract.estimatedAnnualTurnover = {
      amount: parseFloat(this.newExpressForm.get('minAmount').value),
      currency: {
        id: '978',
        code: 'EUR'
      }
    }

    this.loading = true;
    this.nbExpressBillService.postContracts(expressNewContract, this.signatureEntity).subscribe(() => {
      this.loading = false;
      this.finishDate = new Date();
      this.signatureEntity = null;
      this.step = 'RESUME';
    }, (e) => {
      this.loading = false;

      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.setStep('TOKEN');
      }
    });

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

  accept() {
    let link = RouterHelperService.getPathFromId('global-position-page');
    this.router.navigate([link]);
  }

  cancel() {
    let link = RouterHelperService.getPathFromId('express-bill-page');
    this.router.navigate([link]);
  }

  back() {
    switch (this.step) {
      case 'TOKEN':
        this.step = 'FIRST';
        break;
      default:
        break;
    }
  }
}
