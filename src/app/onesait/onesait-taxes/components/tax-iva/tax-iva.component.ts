import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TaxesService, SignatureEntity, SignatureTokenService, RouterHelperService } from 'onesait-core';
import { TaxPaymentTypeCombo, TaxForm, AccountElement, TaxYear, TaxPeriod, IvaTaxPayment, CurrenciesCredits } from 'onesait-api';
import {  } from '@angular/core';
import { forkJoin } from 'rxjs';

enum VIEWS {
  FIRST,
  CONFIRM,
  TOKEN,
  FINISH
}

@Component({
  selector: 'osb-tax-iva',
  templateUrl: './tax-iva.component.html'
})
export class TaxIvaComponent implements OnInit {

  @Input() taxSelectedCombo: TaxPaymentTypeCombo;
  @Input() accounts: AccountElement[];
  @Input() accountInfo: any;
  @Input() defaultCurrency: CurrenciesCredits;
  @Output() showHeader = new EventEmitter();

  loading: boolean;
  newIvaForm: FormGroup;

  view: number;
  VIEWS = VIEWS;
  signatureEntity: SignatureEntity;
  taxForms: TaxForm[];
  years: TaxYear[];
  periods: TaxPeriod[];
  accountSelected: AccountElement;
  taxFormSelected: TaxForm;
  periodSelected: TaxPeriod;
  newIvaTaxPayment: IvaTaxPayment;


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
    this.newIvaForm = new FormGroup ({
      accountId: new FormControl('', Validators.required),
      taxPaymentClass: new FormControl('IvaTaxPayment'),
      taxForm: new FormControl('', Validators.required),
      type: new FormControl('income', Validators.required),
      taxYear: new FormControl('', Validators.required),
      taxPeriod: new FormControl('', Validators.required),
      paymentAmount: new FormControl('', Validators.required)
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
    this.newIvaTaxPayment = new IvaTaxPayment;
  }

  makeOperation() {
    this.showHeader.emit(false);
    this.signatureEntity = null;
    this.view = VIEWS.CONFIRM;
    this.accountSelected = this.accounts.find(account => account.id === this.newIvaForm.value.accountId);
    this.taxFormSelected = this.taxForms.find(taxForm => taxForm.id === this.newIvaForm.value.taxForm);
    this.periodSelected = this.periods.find(period => period.id === this.newIvaForm.value.taxPeriod);
    this.newIvaTaxPayment = this.createObj();
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
    console.log(this.newIvaTaxPayment);
    this.taxesService.postRentaTaxPayment(this.taxSelectedCombo.organism, this.newIvaTaxPayment, this.signatureEntity).subscribe(() => {
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

  createObj(): IvaTaxPayment {
    let _newIvaTaxPayment = new IvaTaxPayment;
    _newIvaTaxPayment.accountId = this.newIvaForm.value.accountId;
    _newIvaTaxPayment.taxPaymentClass = this.newIvaForm.value.taxPaymentClass;
    _newIvaTaxPayment.taxForm = this.taxForms.find(form => form.id === this.newIvaForm.value.taxForm);
    _newIvaTaxPayment.type = this.newIvaForm.value.type;
    _newIvaTaxPayment.taxYear = this.newIvaForm.value.taxYear;
    _newIvaTaxPayment.taxPeriod = this.newIvaForm.value.taxPeriod;
    _newIvaTaxPayment.paymentAmount = { amount: this.newIvaForm.value.paymentAmount, currency: null };
    return _newIvaTaxPayment;
  }

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }
}
