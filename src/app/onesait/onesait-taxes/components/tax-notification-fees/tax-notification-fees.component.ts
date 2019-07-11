import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TaxesService, SignatureEntity, SignatureTokenService, RouterHelperService } from 'onesait-core';
import { TaxPaymentTypeCombo, TaxForm, AccountElement, NotificationsAndFeesTaxPayment, CurrenciesCredits } from 'onesait-api';
import {  } from '@angular/core';

enum VIEWS {
  FIRST,
  CONFIRM,
  TOKEN,
  FINISH
}

@Component({
  selector: 'osb-tax-notification-fees',
  templateUrl: './tax-notification-fees.component.html'
})
export class TaxNotificationFeesComponent implements OnInit {

  @Input() taxSelectedCombo: TaxPaymentTypeCombo;
  @Input() accounts: AccountElement[];
  @Input() accountInfo: any;
  @Input() defaultCurrency: CurrenciesCredits;
  @Output() showHeader = new EventEmitter();

  loading: boolean;
  newNotificationsAndFeesForm: FormGroup;

  view: number;
  VIEWS = VIEWS;
  signatureEntity: SignatureEntity;
  pdfUrl: string;
  taxForms: TaxForm[];
  accountSelected: AccountElement;
  taxFormSelected: TaxForm;
  newNotificationsAndFeesTaxPayment: NotificationsAndFeesTaxPayment;


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
    this.newNotificationsAndFeesForm = new FormGroup ({
      accountId: new FormControl('', Validators.required),
      taxPaymentClass: new FormControl('NotificationsAndFeesTaxPayment'),
      taxForm: new FormControl('', Validators.required),
      formId: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      paymentAmount: new FormControl('', Validators.required)
    });
  }

  loadInitialData() {
    this.loading = true;
    this.taxesService.getTaxForms(this.taxSelectedCombo.organism, this.taxSelectedCombo.id).subscribe((result: any) => {
      this.taxForms = result.data;
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
    this.taxFormSelected = null;
  }

  makeOperation() {
    this.showHeader.emit(false);
    this.signatureEntity = null;
    this.view = VIEWS.CONFIRM;
    this.accountSelected = this.accounts.find(account => account.id === this.newNotificationsAndFeesForm.value.accountId);
    this.taxFormSelected = this.taxForms.find(taxForm => taxForm.id === this.newNotificationsAndFeesForm.value.taxForm);
    this.newNotificationsAndFeesTaxPayment = this.createObj();
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
    console.log(this.newNotificationsAndFeesTaxPayment);
    this.taxesService.postRentaTaxPayment(this.taxSelectedCombo.organism, this.newNotificationsAndFeesTaxPayment, this.signatureEntity).subscribe(() => {
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

  createObj(): NotificationsAndFeesTaxPayment {
    let _newIvaTaxPayment = new NotificationsAndFeesTaxPayment;
    _newIvaTaxPayment.accountId = this.newNotificationsAndFeesForm.value.accountId;
    _newIvaTaxPayment.taxPaymentClass = this.newNotificationsAndFeesForm.value.taxPaymentClass;
    _newIvaTaxPayment.taxForm = this.taxForms.find(form => form.id === this.newNotificationsAndFeesForm.value.taxForm);
    _newIvaTaxPayment.formId = this.newNotificationsAndFeesForm.value.formId;
    _newIvaTaxPayment.paymentAmount = { amount: this.newNotificationsAndFeesForm.value.paymentAmount, currency: null };
    return _newIvaTaxPayment;
  }

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }
}
