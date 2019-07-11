import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  HeaderService,
  UtilsService,
  RouterHelperService,
  CustomersService,
  ConfirmingService,
  SignatureEntity,
  SignatureTokenService,
  ModalPageComponent,
  HeaderTitleElement
} from 'onesait-core';
import {
  ConfirmingContracts,
  GenericListResponse,
  ConfirmingNewContract,
  CustomerProductType,
  ProductExt,
  User
} from 'onesait-api';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _moment from 'moment';
import { ConditionsElement } from 'itecban-common';
const moment = _moment;


@Component({
  selector: 'osb-confirming-add-page',
  templateUrl: './confirming-add-page.component.html'
})
export class ConfirmingAddPageComponent implements OnInit, OnDestroy {

  loading: boolean;
  contracts: ConfirmingContracts[];
  step: string;
  accountInfo: any;
  products: ProductExt[];
  newConfirmingForm: FormGroup;
  signatureEntity: SignatureEntity;

  user: User;
  userName: string;
  private subscriptionBack: Subscription;


  conditions: ConditionsElement = {
    data: [
      { icon: 'icon icononesait icon-accounts', text: 'ONESAIT-CONFIRMING.ADD.LINK.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Condiciones_Generales_ahorro.pdf', read: false },
      { icon: 'icon icononesait icon-accounts', text: 'ONESAIT-CONFIRMING.ADD.LINK.DOCUMENTS.PRECONTRACT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Ficha_Pre_contractual.ppt', read: false },
      { icon: 'icon icononesait icon-accounts', text: 'ONESAIT-CONFIRMING.ADD.LINK.DOCUMENTS.FGD', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/FGD_dIGITAL.ppt', read: false },
      { icon: 'icon icononesait icon-accounts', text: 'ONESAIT-CONFIRMING.ADD.LINK.DOCUMENTS.RATE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Tarifas_Empresas.pdf', read: false },
    ]
  };
  primeraEntrada = false;
  acceptTerms = false;
  checkControl = false;
  activeBoton = false;

  @Input()
  modal: ModalPageComponent;

  constructor(
    private customersService: CustomersService,
    private confirmingService: ConfirmingService,
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
      title: 'HEADER.TITLE.CONFIRMING',
      routeId: 'confirming-page'
    };

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

    this.accountInfo = {
      userId: this.user.userLegalId,
      username: this.user.activeProfileObj.contractName,
      holderLegalId: this.user.activeProfileObj.holderLegalId,
      attorney: this.user.userName
    };

    this.customersService.getProducts(CustomerProductType.CONFIRMING).subscribe((result: GenericListResponse<ProductExt>) => {
      this.products = result.data;
    });

    if (this.modal && this.modal.getHeader()) {
      this.subscriptionBack = this.modal.getHeader().backObservable.subscribe(() => {
        this.back();
      });
      this.modal.getHeader().setTitle('HEADER.TITLE.CONFIRMING-ADD');
    } else {
      this.headerService.setTitle(level1, 'HEADER.TITLE.CONFIRMING-ADD');
    }
  }

  ngOnDestroy() {
    if (this.subscriptionBack) {
      this.subscriptionBack.unsubscribe();
    }
  }

  createFormControl(): void {
    this.newConfirmingForm = new FormGroup({
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



  confirm() {

    let confirmingNewContract: ConfirmingNewContract = new ConfirmingNewContract();
    confirmingNewContract.productId = this.newConfirmingForm.get('product').value.id;
    confirmingNewContract.expirationDate = moment(this.newConfirmingForm.get('expirationDate').value).format('YYYY-MM-DD');
    confirmingNewContract.estimatedAnnualTurnover = {
      amount: parseFloat(this.newConfirmingForm.get('minAmount').value),
      currency: {
        id: '978',
        code: 'EUR'
      }
    };

    this.loading = true;
    this.confirmingService.postContracts(confirmingNewContract, this.signatureEntity).subscribe(() => {
      this.loading = false;
      this.setStep('RESUME');
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
    let link = RouterHelperService.getPathFromId('confirming-page');
    this.router.navigate([link]);
  }

  back() {
    switch (this.step) {
      case 'TOKEN':
        this.setStep('FIRST');
        break;
      default:
        break;
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
