import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import * as _moment from 'moment';
const moment = _moment;

export class AccountsValidator {

  // Validador de fecha Inicial
  static DateInitialValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let value = control.value;
    let now: any = new Date();
    if (value !== undefined && value !== null && value !== '') {
      value = Number(moment(value).format('YYYYMMDD'));
      now = Number(moment(now).format('YYYYMMDD'));
      if (value > now) {
        return { 'invalidDate': true };
      }
    }
    return null;
  }

  public static DateEndValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let value = control.value;
    if (value !== undefined && value !== null && value !== '') {
      value = Number(moment(value).format('YYYYMMDD'));
      let today = Number(moment(new Date()).format('YYYYMMDD'));
      if (value > today) {
        // let aDate = moment(value);
        // if (!aDate.isValid()) {
        //     value = '';
        return { 'invalidDate': true };
        // }
      }
    }
    return null;
  }

  static groupValidationSearch(prefix: string): ValidatorFn {
    let result = (group: FormGroup): { [key: string]: boolean } | null => {

      for (const field in group.controls) {
        const control = group.get(field); // 'control' is a FormControl
        if (control.status === 'INVALID') {

          return null;
        }
      }

      let dateFrom = group.get('dateFrom').value;
      let dateTo = group.get('dateTo').value;

      if (dateFrom !== undefined && dateTo !== undefined && dateFrom !== null && dateTo !== null && dateFrom !== '' && dateTo !== '') {
        dateFrom = Number(moment(dateFrom).format('YYYYMMDD'));
        dateTo = Number(moment(dateTo).format('YYYYMMDD'));
        if (dateFrom > dateTo) {
          let compose = prefix + '.forbiddenPeriod';
          return { [compose]: true };
        }
      }

      // if (dateFrom === '' || dateTo === '') {
      //   return { 'invalidDate': true };
      // }

      if (dateFrom !== undefined && dateFrom !== null && dateFrom !== '') {
        if (dateTo === undefined || dateTo === null || dateTo === '') {
          let compose = prefix + '.requiredEndDate';
          // return { 'requiredEndDate': true }; //Fecha Fin obligatoria
          return { [compose]: true };
        }
      }

      if (dateTo !== undefined && dateTo !== null && dateTo !== '') {
        if (dateFrom === undefined || dateFrom === null || dateFrom === '') {
          let compose = prefix + '.requiredInitialDate';
          // return { 'requiredInitialDate': true }; //Fecha Inicial obligatoria
          return { [compose]: true };

        }
      }

      if (dateTo !== undefined && dateTo !== null && dateTo !== '') {
        if (dateFrom === undefined || dateFrom === null || dateFrom === '') {
          let compose = prefix + '.requiredInitialDate';
          if (dateFrom < dateTo) {
            // return { 'requiredInitialDate': true }; //Comparación de Fechas
            return { [compose]: true };
          }
        }
        return null;
      }
      return null;

    };
    return result;
  }

  static IBANValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let IBAN = control.value;


    // IBAN = IBAN.toUpperCase();

    // IBAN = IBAN.trim(); // Se quita los blancos de principio y final.
    // IBAN = IBAN.replace(/\s/g, ''); // Y se quita los espacios en blanco dentro de la cadena

    let letra1: string;
    let letra2: string;
    let num1: number;
    let num2: number;
    let ibanaux: string;
    let ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


    // // La longitud debe ser siempre de 24 caracteres
    if (!IBAN) {
      return null;
    } else if (IBAN.length !== 24) {
      return null;
    }

    letra1 = IBAN.substring(0, 1);
    letra2 = IBAN.substring(1, 2);
    num1 = ls_letras.search(letra1) + 10;
    num2 = ls_letras.search(letra2) + 10;

    // // Se sustituye las letras por números.
    // isbanaux = String(num1) + String(num2) + IBAN.substring(2);
    // // Se mueve los 6 primeros caracteres al final de la cadena.
    ibanaux = IBAN.substring(4) + num1 + num2 + IBAN.substring(2, 4);

    let k;
    let l;

    let num: number;
    let resto: number;

    while (ibanaux.length > 9) {
      k = ibanaux.substring(0, 9);
      num = parseInt(k, 10);
      resto = num % 97;
      l = String(resto);
      ibanaux = l + ibanaux.substring(9, ibanaux.length);
    }

    num = parseInt(ibanaux, 10);
    resto = num % 97;

    if (resto === 1) {
      Object.keys(control.parent.controls).forEach((key) => {
        if (key.startsWith('ibanbloque')) {
          control.parent.get(key).setErrors( null );
        }
   });
      return null;
    } else {
       Object.keys(control.parent.controls).forEach((key) => {
         if (key.startsWith('ibanbloque')) {
           control.parent.get(key).setErrors({ 'invalidIBAN': true });
         }
    });
      return { 'invalidIBAN': true };
    }
    // // Se calcula el resto, llamando a la función modulo97,
    // let parts = Math.ceil(isbanaux.length / 7);

    // for (let i = 1; i <= parts; i++) {
    //     resto = String(parseFloat(resto + isbanaux.substr((i - 1) * 7, 7)) % 97);
    // }

    // if (resto === '1') {
    //     return null;
    // } else {
    //     return { 'invalidIBAN': true };
    // }

  }


  static IBANValidatorGeneric(control: AbstractControl): { [key: string]: boolean } | null {
    let ibanLen = {
      NO: 15, BE: 16, DK: 18, FI: 18, FO: 18, GL: 18, NL: 18, MK: 19,
      SI: 19, AT: 20, BA: 20, EE: 20, KZ: 20, LT: 20, LU: 20, CR: 21,
      CH: 21, HR: 21, LI: 21, LV: 21, BG: 22, BH: 22, DE: 22, GB: 22,
      GE: 22, IE: 22, ME: 22, RS: 22, AE: 23, GI: 23, IL: 23, AD: 24,
      CZ: 24, ES: 24, MD: 24, PK: 24, RO: 24, SA: 24, SE: 24, SK: 24,
      VG: 24, TN: 24, PT: 25, IS: 26, TR: 26, FR: 27, GR: 27, IT: 27,
      MC: 27, MR: 27, SM: 27, AL: 28, AZ: 28, CY: 28, DO: 28, GT: 28,
      HU: 28, LB: 28, PL: 28, BR: 29, PS: 29, KW: 30, MU: 30, MT: 31
    };

    let iban = control.value;
    if (iban !== null && iban !== undefined) {
      iban = iban.toUpperCase();
      iban = iban.replace(/\s/g, '');
      if (!iban.match(/^[\dA-Z]+$/)) {
        return { 'otherCharacters': true };
      }
      let code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);

      let len = iban.length;
      if (!code || len !== ibanLen[code[1]]) {
        return { 'invalidIBAN': true };
      }

      let digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
        return letter.charCodeAt(0) - 55;
      });

      let checksum = digits.slice(0, 2);
      let fragment = '';

      for (let offset = 2; offset < digits.length; offset += 7) {
        fragment = String(checksum) + digits.substring(offset, offset + 7);
        checksum = parseInt(fragment, 10) % 97;
      }

      if (checksum !== 1) {
        return { 'invalidIBAN': true };
      }
    }
    return null;
  }
}
