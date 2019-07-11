import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TaxesService, SignatureEntity, SignatureTokenService, RouterHelperService } from 'onesait-core';
import { TaxPaymentTypeCombo, AccountElement, TgssTaxPayment, TaxIssuerEntities, CurrenciesCredits } from 'onesait-api';


enum VIEWS {
  FIRST,
  CONFIRM,
  TOKEN,
  FINISH
}

@Component({
  selector: 'osb-tax-social-security',
  templateUrl: './tax-social-security.component.html'
})
export class TaxSocialSecurityComponent implements OnInit {

  @Input() taxSelectedCombo: TaxPaymentTypeCombo;
  @Input() accounts: AccountElement[];
  @Input() accountInfo: any;
  @Input() defaultCurrency: CurrenciesCredits;
  @Output() showHeader = new EventEmitter();

  loading: boolean;
  newTgssForm: FormGroup;

  view: number;
  VIEWS = VIEWS;
  signatureEntity: SignatureEntity;
  pdfUrl: string;
  issuerEntities: TaxIssuerEntities[];
  accountSelected: AccountElement;
  issuerEntitySelected: TaxIssuerEntities;
  newTgssTaxPayment: TgssTaxPayment;


  constructor(private taxesService: TaxesService,
    private signatureTokenService: SignatureTokenService,
    protected router: Router) {
      this.view = VIEWS.FIRST;
  }

  ngOnInit() {
    this.loadInitialData();
    this.createFormControl();
  }

  createFormControl() {
    this.newTgssForm = new FormGroup ({
      accountId: new FormControl('', Validators.required),
      taxPaymentClass: new FormControl('TgssTaxPayment'),
      issuerEntity: new FormControl('', Validators.required),
      reference: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      identification: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      paymentAmount: new FormControl('', Validators.required),
      isDirectDebit: new FormControl(false)
    });
  }

  loadInitialData() {
    this.loading = true;
    this.taxesService.getIssuerEntities(this.taxSelectedCombo.organism, this.taxSelectedCombo.id).subscribe((result: any) => {
      this.issuerEntities = result.data;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  resetComponent() {
    this.createFormControl();
    this.view = this.VIEWS.FIRST;
    this.showHeader.emit(true);
    this.accountSelected = null;
    this.issuerEntitySelected = null;
    this.newTgssTaxPayment = new TgssTaxPayment;
  }

  makeOperation() {
    this.showHeader.emit(false);
    this.signatureEntity = null;
    this.view = VIEWS.CONFIRM;
    this.accountSelected = this.accounts.find(account => account.id === this.newTgssForm.value.accountId);
    this.issuerEntitySelected = this.issuerEntities.find(issuerEntity => issuerEntity.id === this.newTgssForm.value.issuerEntity);
    this.newTgssTaxPayment = this.createObj();
  }

  cancel() {
    this.resetComponent();
  }

  back() {
    switch (this.view) {
      case this.VIEWS.CONFIRM:
        this.view = this.VIEWS.FIRST;
        this.showHeader.emit(true);
        break;
      case this.VIEWS.TOKEN:
        this.signatureEntity = null;
        this.view = VIEWS.CONFIRM;
        break;
    }
  }

  confirm() {
    this.finish();
  }

  finish() {
    this.loading = true;
    console.log(this.newTgssTaxPayment);
    this.taxesService.postRentaTaxPayment(this.taxSelectedCombo.organism, this.newTgssTaxPayment, this.signatureEntity).subscribe(() => {
      this.loading = false;
      this.view = VIEWS.FINISH;
      this.pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    }, (e: any) => {
      this.loading = false;
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }

      if (this.signatureEntity) {
        this.view = VIEWS.TOKEN;
      }
    });
  }

  tokenCompleted() {
    this.finish();
  }

  createObj(): TgssTaxPayment {
    let _newRentaTaxPayment = new TgssTaxPayment;
    _newRentaTaxPayment.accountId = this.newTgssForm.value.accountId;
    _newRentaTaxPayment.taxPaymentClass = this.newTgssForm.value.taxPaymentClass;
    _newRentaTaxPayment.issuerEntity = this.newTgssForm.value.issuerEntity;
    _newRentaTaxPayment.reference = this.newTgssForm.value.reference;
    _newRentaTaxPayment.identification = this.newTgssForm.value.identification;
    _newRentaTaxPayment.paymentAmount = { amount: this.newTgssForm.value.paymentAmount, currency: null };
    _newRentaTaxPayment.isDirectDebit = this.newTgssForm.value.isDirectDebit;
    return _newRentaTaxPayment;
  }

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }

}
