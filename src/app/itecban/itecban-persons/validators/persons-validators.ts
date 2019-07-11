import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import * as _moment from 'moment';

export class PersonsValidator {

  static sameValue(prefix: string): ValidatorFn {
    const result = (group: FormGroup): { [key: string]: boolean } | null => {
      let newPass = group.get('newPassword').value;
      let repeatPass = group.get('repeatPassword').value;

      for (const field in group.controls) { // 'field' is a string
          const control = group.get(field); // 'control' is a FormControl
          if (control.status === 'INVALID') {
            return null;
          }
      }

      if (newPass !== undefined && newPass !== null && 
          repeatPass !== null && repeatPass !== '') {
        if (newPass !== repeatPass) {
            let compose =  prefix + '.sameValue';
            return { [compose]: true };
        }
      }
      return null;
    };

    return result;
  }

  static sameValueLastPassword(prefix: string): ValidatorFn {
    const result = (group: FormGroup): { [key: string]: boolean } | null => {
      let currentPass =  group.get('currentPassword').value;
      let newPass = group.get('newPassword').value;

      for (const field in group.controls) { // 'field' is a string
          const control = group.get(field); // 'control' is a FormControl
          if (control.status === 'INVALID') {
            return null;
          }
      }

      if ( newPass !== undefined && newPass !== null ) {
        if (currentPass === newPass) {
            let compose =  prefix + '.sameValueLast';
            return { [compose]: true };
        }
      }
      return null;
    };

    return result;
  }

  static otherCharacters(control: AbstractControl): { [key: string]: boolean } | null {
    let value  =  control.value;

    let expreg = /[^A-ZÑa-zñ0-9]/;

    if (value) {
      if (expreg.test(value)) {
        return { 'otherCharacters': true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  static numericCharacters(control: AbstractControl): 
    { [key: string]: boolean } | null
  {
    let value  = control.value;
    let expreg = /[^0-9]/;

    if (value) {
      if (expreg.test(value)) {
        return { 'numericCharacters': true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  static currencyCharacters(control: AbstractControl): 
    { [key: string]: boolean } | null
  {
    let value  = control.value;
    let expreg = /^(\d{1,3}(\.\d{3})*|(\d+))(\,\d{2})?$/;
  
    if (value) {
      if (expreg.test(value)) {
        return null;
      } else {
        return { 'currencyCharacters': true };
      }
    } else {
      return null;
    }
  }

  /* @returns A validator function that returns an error map with the
    * `maxlength` property if the validation check fails, otherwise `null`.
    */
  static maxLength(maxLength: number): ValidatorFn {
    const result = (group: FormGroup): 
      { [key: string]: { [key: string]: number } } | null => {

      let value = group.parent.get('amount').value;
      let initialMaxLength = maxLength;

      if (value.includes(',')) maxLength += 3;
      if (value.includes('.')) { 
        maxLength += value.split('').filter(
          (value) => value === '.').length;
      }

      if (value.length <= maxLength) {
        maxLength = initialMaxLength; 
        return null;
      } else {
        let length = maxLength;
        maxLength  = initialMaxLength; 
        return { 'maxlength': { 'requiredLength': length } };
      }
    };

    return result;
  }
}