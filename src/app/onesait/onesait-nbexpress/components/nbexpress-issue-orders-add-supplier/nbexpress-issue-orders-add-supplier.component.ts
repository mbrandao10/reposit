import { Component, OnInit, EventEmitter } from '@angular/core';
import { EBNewSupplier, EBSupplierCountries } from 'onesait-api';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NBExpressBillService, AccountsValidator } from 'onesait-core';

@Component({
  selector: 'osb-nbexpress-issue-orders-add-supplier',
  templateUrl: './nbexpress-issue-orders-add-supplier.component.html'
})
export class NbExpressIssueOrdersAddSupplierComponent implements OnInit {

  @Output() isSavedSupplier = new EventEmitter();

  newupplierObject = new EBNewSupplier;
  newSupplierForm: FormGroup;
  loading: boolean;
  streetTypes = [];
  countries: EBSupplierCountries[] = [];
  amountOrder: number;
  currencySymbol = '€';

  date = new Date();
  dateMore = this.date.getDate() + this.date.getTime() + 86400000;
  minDate = new Date(this.dateMore);

  constructor(private nbExpressBillService: NBExpressBillService) { }

  ngOnInit() {
    this.loadInitialData();
    this.createFormControl();
  }

  createFormControl() {
    this.newSupplierForm = new FormGroup ({
      concept: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, this.amountValidator]),
      expirationDate: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      legalDocument: new FormControl('', Validators.required),
      accountId: new FormControl('', [Validators.required, Validators.minLength(24), Validators.maxLength(24), AccountsValidator.IBANValidator]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]),
      streetType: new FormControl('', Validators.required),
      streetName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      streetNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(6)]),
      postCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      province: new FormControl('', [Validators.required, Validators.pattern("^([^0-9]*)$"), Validators.maxLength(23)]),
      country: new FormControl('', Validators.required)
    });
  }

  loadInitialData() {
    this.streetTypes.push({id: 1, name: 'Calle'});
    this.streetTypes.push({id: 2, name: 'Avenida'});
    this.streetTypes.push({id: 3, name: 'Plaza'});
    console.log(this.streetTypes);
    this.loading = true;
    this.nbExpressBillService.getSupplierCountries().subscribe(result => {
      this.countries = result.data.sort(function (a, b) {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      });
    }, () => {
      this.loading = false;
    });
  }

  saveSupplier() {
    this.isSavedSupplier.emit(this.newSupplierForm.value);
  }

  removeSpaceFormat() {
    if (this.newSupplierForm.get('accountId').value !== null && this.newSupplierForm.get('accountId').value !== undefined) {
      let value: string = '' + this.newSupplierForm.get('accountId').value;
      value = value.replace(/\s/g, '');
      this.newSupplierForm.get('accountId').setValue(value);
    }
  }

  applyFormatInput() {
    if (!this.newSupplierForm.get('amount').invalid) {
      let n = this.newSupplierForm.get('amount').value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = n.replace(/' '/g, '');
      n = + n;
      this.amountOrder = n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.newSupplierForm.get('amount').setValue(n);
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
