import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TaxesService, SignatureEntity, SignatureTokenService, RouterHelperService } from 'onesait-core';
import { TaxPaymentTypeCombo, TaxForm, AccountElement, TaxYear, TaxPeriod, RentaTaxPayment, CurrenciesCredits } from 'onesait-api';
import {  } from '@angular/core';
import { forkJoin } from 'rxjs';

enum VIEWS {
  FIRST,
  CONFIRM,
  TOKEN,
  FINISH
}

@Component({
  selector: 'osb-tax-rent',
  templateUrl: './tax-rent.component.html'
})
export class TaxRentComponent implements OnInit {

  @Input() taxSelectedCombo: TaxPaymentTypeCombo;
  @Input() accounts: AccountElement[];
  @Input() accountInfo: any;
  @Input() defaultCurrency: CurrenciesCredits;
  @Output() showHeader = new EventEmitter();

  loading: boolean;
  newRentForm: FormGroup;

  view: number;
  VIEWS = VIEWS;
  signatureEntity: SignatureEntity;
  taxForms: TaxForm[];
  years: TaxYear[];
  periods: TaxPeriod[];
  accountSelected: AccountElement;
  taxFormSelected: TaxForm;
  periodSelected: TaxPeriod;
  newRentaTaxPayment: RentaTaxPayment;


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
    this.newRentForm = new FormGroup ({
      accountId: new FormControl('', Validators.required),
      taxPaymentClass: new FormControl('RentaTaxPayment'),
      taxForm: new FormControl('', Validators.required),
      type: new FormControl('income', Validators.required),
      taxYear: new FormControl('', Validators.required),
      taxPeriod: new FormControl('', Validators.required),
      paymentAmount: new FormControl('', Validators.required),
      splitPaymentAmount: new FormControl('', Validators.required),
      isDirectDebit: new FormControl(false)
    });
  }

  loadInitialData() {
    this.loading = true;
    let me = this;
    let observableData: any = [];
    observableData.push(this.taxesService.getTaxForms(this.taxSelectedCombo.organism, this.taxSelectedCombo.id));
    observableData.push(this.taxesService.getYears(this.taxSelectedCombo.organism));
    observableData.push(this.taxesService.getPeriods(this.taxSelectedCombo.organism, this.taxSelectedCombo.id));

    forkJoin(observableData).subscribe((result: any) => {
      me.taxForms = result[0]['data'];
      me.years = result[1]['data'];
      me.periods = result[2]['data'];
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
    this.periodSelected = null;
    this.newRentaTaxPayment = new RentaTaxPayment;
  }

  makeOperation() {
    this.showHeader.emit(false);
    this.signatureEntity = null;
    this.view = VIEWS.CONFIRM;
    this.accountSelected = this.accounts.find(account => account.id === this.newRentForm.value.accountId);
    this.taxFormSelected = this.taxForms.find(taxForm => taxForm.id === this.newRentForm.value.taxForm);
    this.periodSelected = this.periods.find(period => period.id === this.newRentForm.value.taxPeriod);
    this.newRentaTaxPayment = this.createObj();
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
    console.log(this.newRentaTaxPayment);
    this.taxesService.postRentaTaxPayment(this.taxSelectedCombo.organism, this.newRentaTaxPayment, this.signatureEntity).subscribe(() => {
      this.loading = false;
      this.view = VIEWS.FINISH;
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

  createObj(): RentaTaxPayment {
    let _newRentaTaxPayment = new RentaTaxPayment;
    _newRentaTaxPayment.accountId = this.newRentForm.value.accountId;
    _newRentaTaxPayment.taxPaymentClass = this.newRentForm.value.taxPaymentClass;
    _newRentaTaxPayment.taxForm = this.taxForms.find(form => form.id === this.newRentForm.value.taxForm);
    _newRentaTaxPayment.type = this.newRentForm.value.type;
    _newRentaTaxPayment.taxYear = this.newRentForm.value.taxYear;
    _newRentaTaxPayment.taxPeriod = this.newRentForm.value.taxPeriod;
    _newRentaTaxPayment.paymentAmount = { amount: this.newRentForm.value.paymentAmount, currency: { id: '978', code: 'EUR'}};
    _newRentaTaxPayment.splitPaymentAmount = { amount: this.newRentForm.value.splitPaymentAmount, currency: { id: '978', code: 'EUR'}};
    _newRentaTaxPayment.isDirectDebit = this.newRentForm.value.isDirectDebit;
    return _newRentaTaxPayment;
  }

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }

}
