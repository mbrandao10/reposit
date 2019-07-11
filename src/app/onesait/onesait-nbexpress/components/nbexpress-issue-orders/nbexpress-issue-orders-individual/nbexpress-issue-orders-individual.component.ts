import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { NBExpressBillService, ModalPageComponent, DeviceUtilsService, AppConfigService, InputValidatorOptions } from 'onesait-core';
import { EBContracts, EBSuppliers, EBOrder, EBNewSupplier, CurrenciesCredits } from 'onesait-api';
import { forkJoin } from 'rxjs';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'underscore';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'osb-nbexpress-issue-orders-individual',
  templateUrl: './nbexpress-issue-orders-individual.component.html'
})
export class NbExpressIssueOrdersIndividualComponent implements OnInit {

  @Input() contractId: string;
  @Output() newIssueOrder = new EventEmitter();
  @ViewChild('modalPage') private modalPage: ModalPageComponent;

  contracts: EBContracts[];
  suppliers: EBSuppliers[];
  newSupplier: EBNewSupplier;
  newOrderObject = new EBOrder;
  newOrderForm: FormGroup;
  loading: boolean;
  modal: string;
  accounts: Account[];
  accountFormatView: string;
  listCurrencies: CurrenciesCredits[];
  defaultCurrency: CurrenciesCredits = {};
  amountOrder: number;

  currencySymbol = '€';

  autocompleteOptions: any = {
    id: 'id',
    name: 'name',
    required: true,
  };

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };
  account = {
    id: ''
  };

  constructor(private nbExpressBillService: NBExpressBillService,
    private deviceUtilsServicer: DeviceUtilsService,
    // private accountService: AccountService,
    protected appConfigService: AppConfigService) {
    // this.accountFormatView = appConfigService.getConfig().account.viewKey;
    this.listCurrencies = appConfigService.getConfig().currencies;
    this.defaultCurrency = _.findWhere(this.listCurrencies, { code: appConfigService.getConfig().defaultCurrency });
    this.newOrderObject = new EBOrder();
    this.newOrderObject.amount = {
      amount: 0,
      currency: {
        id: this.defaultCurrency.ISOCode,
        code: this.defaultCurrency.code
      }
    };
    this.newOrderObject.account = {
      id: ''
    }
  }

  ngOnInit() {
    this.loadInitialData();
    this.createFormControl();
  }


  createFormControl() {
    this.newOrderForm = new FormGroup({
      contractId: new FormControl(this.contractId, Validators.required),
      concept: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, this.amountValidator]),
      expirationDate: new FormControl('', Validators.required),
      supplier: new FormControl('', Validators.required),
      // account: new FormControl('', Validators.required)
    });
  }

  loadInitialData() {
    this.loading = true;
    let me = this;
    let observableData: any = [];
    observableData.push(this.nbExpressBillService.getContracts());
    // observableData.push(this.nbExpressBillService.getSuppliers());
    // observableData.push(this.accountService.getAccounts());

    forkJoin(observableData).subscribe((result: any) => {
      me.contracts = result[0]['data'];
      // me.suppliers = result[1]['data'];
      // me.accounts = result[2]['data'];

      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  issueOrder() {
    this.newOrderObject.amount.amount = this.newOrderForm.value.amount;
    this.newOrderObject.account =  this.account;
    this.newOrderObject.concept = this.newOrderForm.value.concept;
    this.newOrderObject.contractId = this.newOrderForm.value.contractId;
    this.newOrderObject.expirationDate = moment(this.newOrderForm.value.expirationDate).format('YYYY-MM-DD');
    this.newOrderObject.supplier = this.newOrderForm.value.supplier;
    this.newIssueOrder.emit(this.newOrderObject);
  }

  goToAddSupplier() {
    if (this.deviceUtilsServicer.isMobileResolution) {
      this.modalPage.open();
    } else {
      this.modal = 'addSupplier';
    }
  }

  goBackFromModal() {
    this.modal = '';
    this.modalPage.close();
  }

  getSupplierFromForm(event) {
    this.goBackFromModal();

    this.newOrderForm.patchValue({
      amount: event.amount.replace(/\./g, '').replace(/,/g, '.').replace(/' '/g, ''),
      concept: event.concept,
      expirationDate: event.expirationDate,
    });
    this.newSupplier = {
      name: event.name,
      legalDocument: event.legalDocument,
      phoneNumber: event.phoneNumber,
      address: {
        city: event.city,
        country: event.country,
        province: event.province,
        postCode: event.postCode,
        streetName: event.streetName,
        streetNumber: event.streetNumber,
        streetType: event.streetType
      }
    }
    this.account.id = event.accountId;
    this.newOrderForm.patchValue({ supplier: this.newSupplier });
    this.issueOrder()
  }

  deleteSupplier() {
    this.newSupplier = null;
    this.newOrderForm.patchValue({ supplier: this.newSupplier });
  }

  getValueSelectedSupplier(event: any) {
    this.newOrderForm.setControl('supplier', event.frmCntrlAcutocomplete.get('id'));
  }

  applyFormatInput() {
    if (!this.newOrderForm.get('amount').invalid) {
      let n = this.newOrderForm.get('amount').value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = n.replace(/' '/g, '');
      n = + n;
      this.amountOrder = n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.newOrderForm.get('amount').setValue(n);
    }
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

}
