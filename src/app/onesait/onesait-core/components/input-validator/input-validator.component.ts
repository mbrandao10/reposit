import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface InputValidatorOptions {
  text?: string;
  hideErros?: boolean;
  errorText?: {
    REQUIRED?: string;
    MIN?: string;
    MAX?: string;
    MINLENGTH?: string;
    MAXLENGTH?: string;
  };
}

export enum InputValidatorEnum {
  REQUIRED = 'REQUIRED',
  MIN = 'MIN',
  MAX = 'MAX',
  MINLENGTH = 'MINLENGTH',
  MAXLENGTH = 'MAXLENGTH',
  INVALIDAMOUNT = 'INVALIDAMOUNT',
  INVALIDDATE = 'INVALIDDATE',
  INVALIDIBAN = 'INVALIDIBAN',
  INVALIDBIC = 'INVALIDBIC',
  FORBIDDENPERIOD = 'FORBIDDENPERIOD',
  REQUIREDINITIALDATE = 'REQUIREDINITIALDATE',
  REQUIREDENDDATE = 'REQUIREDENDDATE',
  OTHERCHARACTERS = 'OTHERCHARACTERS',
  NUMERICCHARACTERS = 'NUMERICCHARACTERS',
  CURRENCYCHARACTERS = 'CURRENCYCHARACTERS',
  ERRORDNI = 'ERRORDNI',
  ERRORNCIF = 'ERRORNCIF',
  ERRORNIE = 'ERRORNIE',
  ERRORPASSPORT = 'ERRORPASSPORT',
  NAN = 'NAN',
  INVALIDEMAIL = 'INVALIDEMAIL',
  FORBIDDENAMOUNT = 'FORBIDDENAMOUNT',
  EXCEEDEDAMOUNT = 'EXCEEDEDAMOUNT'
}

@Component({
  selector: 'osb-input-validator',
  templateUrl: './input-validator.component.html'
})
export class InputValidatorComponent implements OnInit {

  @Input() formCtrl: FormControl;

  @Input() opts: InputValidatorOptions;

  errorText: string;

  constructor(
  ) { }

  ngOnInit() {
    this.errorText = this.getErrors();
    this.formCtrl.valueChanges.subscribe(() => {
      this.errorText = this.getErrors();
    });
  }

  getErrors() {
    if (this.formCtrl.errors) {
      if (this.formCtrl.errors.required) {
        return this.getErrorText(InputValidatorEnum.REQUIRED);
      } else if (this.formCtrl.errors.min) {
        return this.getErrorText(InputValidatorEnum.MIN);
      } else if (this.formCtrl.errors.max) {
        return this.getErrorText(InputValidatorEnum.MAX);
      } else if (this.formCtrl.errors.minlength) {
        return this.getErrorText(InputValidatorEnum.MINLENGTH);
      } else if (this.formCtrl.errors.maxlength) {
        return this.getErrorText(InputValidatorEnum.MAXLENGTH);
      } else if (this.formCtrl.errors.invalidAmount) {
        return this.getErrorText(InputValidatorEnum.INVALIDAMOUNT);
      } else if (this.formCtrl.errors.invalidDate) {
        return this.getErrorText(InputValidatorEnum.INVALIDDATE);
      } else if (this.formCtrl.errors.invalidIBAN) {
        return this.getErrorText(InputValidatorEnum.INVALIDIBAN);
      } else if (this.formCtrl.errors.invalidBIC) {
        return this.getErrorText(InputValidatorEnum.INVALIDBIC);
      } else if (this.formCtrl.errors.forbiddenPeriod) {
        return this.getErrorText(InputValidatorEnum.FORBIDDENPERIOD);
      } else if (this.formCtrl.errors.requiredInitialDate) {
        return this.getErrorText(InputValidatorEnum.REQUIREDINITIALDATE);
      } else if (this.formCtrl.errors.requiredEndDate) {
        return this.getErrorText(InputValidatorEnum.REQUIREDENDDATE);
      } else if (this.formCtrl.errors.otherCharacters) {
        return this.getErrorText(InputValidatorEnum.OTHERCHARACTERS);
      } else if (this.formCtrl.errors.numericCharacters) {
        return this.getErrorText(InputValidatorEnum.NUMERICCHARACTERS);
      } else if (this.formCtrl.errors.currencyCharacters) {
        return this.getErrorText(InputValidatorEnum.CURRENCYCHARACTERS);
      } else if (this.formCtrl.errors.errordni) {
        return this.getErrorText(InputValidatorEnum.ERRORDNI);
      } else if (this.formCtrl.errors.errorcif) {
        return this.getErrorText(InputValidatorEnum.ERRORNCIF);
      } else if (this.formCtrl.errors.errornie) {
        return this.getErrorText(InputValidatorEnum.ERRORNIE);
      } else if (this.formCtrl.errors.errorpassport) {
        return this.getErrorText(InputValidatorEnum.ERRORPASSPORT);
      } else if (this.formCtrl.errors.nan) {
        return this.getErrorText(InputValidatorEnum.NAN);
      } else if (this.formCtrl.errors.email) {
        return this.getErrorText(InputValidatorEnum.INVALIDEMAIL);
      } else if (this.formCtrl.errors.forbiddenAmount) {
        return this.getErrorText(InputValidatorEnum.FORBIDDENAMOUNT);
      } else if (this.formCtrl.errors.exceededamount) {
        return this.getErrorText(InputValidatorEnum.EXCEEDEDAMOUNT);
      } else {
        for(const key in this.formCtrl.errors ){
          return this.getErrorText(key);
        }
      }
    }
    return null;
  }

  getErrorText(type: string) {
    if (this.opts && this.opts.text) {
      return this.opts.text;
    } else if (this.opts && this.opts.errorText[type]) {
      return this.opts.errorText[type];
    } else {
      return 'ONESAIT-CORE.INPUT-VALIDATOR.' + type.toUpperCase();
    }
  }

}
