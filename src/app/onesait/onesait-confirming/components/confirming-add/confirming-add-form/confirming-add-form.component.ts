import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ProductExt } from 'onesait-api';
import { InputValidatorOptions } from 'onesait-core';


@Component({
  selector: 'osb-confirming-add-form',
  templateUrl: './confirming-add-form.component.html'
})
export class ConfirmingAddFormComponent implements OnInit {

  @Input() products: ProductExt[];
  @Input() accountInfo: any;
  @Input() newConfirmingForm: FormGroup;

  importSel: number;
  date = new Date();
  dateMore = this.date.getDate() + this.date.getTime() + 86400000;
  minDate = new Date(this.dateMore);

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };

  constructor() {

  }

  ngOnInit() {
  }

  applyFormat(control: AbstractControl) {
    if (!control.invalid) {
      let amountString = control.value;
      let amount = (amountString !== '') ? Number(amountString.replace(/\./g, '').replace(/\,/g, '.')) : null;

      if (control.value != null && amount > 0) {
        let n = control.value;
        n = n.replace(/\./g, '');
        n = n.replace(/,/g, '.');
        n = +n;
        this.importSel = amount;
        n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        control.setValue(n);
      } else {
        control.setValue('');
      }
    }
  }
}
