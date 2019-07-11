import { Component, OnInit, OnChanges } from '@angular/core';
import { AppConfigService, TransferService, DeviceUtilsService, UtilsService, InputValidatorOptions, AccountsValidator, FormatAccountPipe } from 'onesait-core';
import { TransferGenericComponent } from '../transfer-generic/transfer-generic.component';
import { TRANSFER_MODE, CurrenciesCredits } from 'onesait-api';
import { Validators } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'osb-transfer-emit-nb',
  templateUrl: './transfer-emit-nb.component.html'
})
export class TransferEmitNBComponent extends TransferGenericComponent implements OnInit, OnChanges {

  step: number;
  validTransfer: boolean;
  maxLength: boolean;
  errorText: string;
  isPortugal: boolean;
  regExPort = /^([pP][tT])/;

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };

  currencies: CurrenciesCredits[];
  currencySymbol: string;

  constructor(
    appConfigService: AppConfigService,
    transferService: TransferService,
    deviceUtilsService: DeviceUtilsService,
    protected utilsService: UtilsService,
    protected formatAccountPipe: FormatAccountPipe
  ) {
    super(appConfigService, transferService, deviceUtilsService, utilsService, formatAccountPipe);
    this.transferMode = TRANSFER_MODE.NB;
    this.currencies = this.appConfigService.getConfig('currencies');
  }

  addCustomValidators() {
    super.ngOnInit();
    this.transferFormAccounts.get('ibanbloque1').enable();
    this.transferFormAccounts.get('ibanbloque1').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    this.transferFormAccounts.get('ibanbloque2').enable();
    this.transferFormAccounts.get('ibanbloque2').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    this.transferFormAccounts.get('ibanbloque3').enable();
    this.transferFormAccounts.get('ibanbloque3').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    this.transferFormAccounts.get('ibanbloque4').enable();
    this.transferFormAccounts.get('ibanbloque4').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    this.transferFormAccounts.get('ibanbloque5').enable();
    this.transferFormAccounts.get('ibanbloque5').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    this.transferFormAccounts.get('ibanbloque6').enable();
    this.transferFormAccounts.get('ibanbloque6').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    this.transferFormAccounts.get('ibanbloque7').disable();
    this.transferFormAccounts.get('ibanbloque7').setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(1)]);
    this.transferFormAccounts.get('externalDestiny').enable();
    this.transferFormAccounts.get('externalDestiny').setValidators([Validators.required, Validators.minLength(24), Validators.maxLength(25), AccountsValidator.IBANValidatorGeneric]);

  }

  customizeTransferState(): any {
    this.transferState.title = '[Transferencia NB ESPAÑA - PORTUGAL]';
  }

  changeAccountFrom(bloque: string) {
    let externalDestiny: string;
    console.log(bloque, externalDestiny);

    if (this.transferFormAccounts.get('ibanbloque1').value) {
      if (this.regExPort.test(this.transferFormAccounts.get('ibanbloque1').value)) {
        this.isPortugal = true;
        this.transferFormAccounts.get('ibanbloque7').enable();
        if (this.transferFormAccounts.get('ibanbloque7').value) {
          this.transferFormAccounts.get('ibanbloque7').value.replace(/\s/g, '');
        }
      } else {
        this.isPortugal = false;
        if (this.transferFormAccounts.get('ibanbloque7').value) {
          this.transferFormAccounts.get('ibanbloque7').setValue(null);
        }
        this.transferFormAccounts.get('ibanbloque7').disable();
      }
    }

    if (this.transferFormAccounts.get('ibanbloque1').value &&
      this.transferFormAccounts.get('ibanbloque2').value &&
      this.transferFormAccounts.get('ibanbloque3').value &&
      this.transferFormAccounts.get('ibanbloque4').value &&
      this.transferFormAccounts.get('ibanbloque5').value &&
      this.transferFormAccounts.get('ibanbloque6').value) {

      if (this.isPortugal) {
        if (this.transferFormAccounts.get('ibanbloque7').value) {
          externalDestiny = this.transferFormAccounts.get('ibanbloque1').value + this.transferFormAccounts.get('ibanbloque2').value +
            this.transferFormAccounts.get('ibanbloque3').value + this.transferFormAccounts.get('ibanbloque4').value +
            this.transferFormAccounts.get('ibanbloque5').value + this.transferFormAccounts.get('ibanbloque6').value +
            this.transferFormAccounts.get('ibanbloque7').value;
        }
      } else {
        externalDestiny = this.transferFormAccounts.get('ibanbloque1').value + this.transferFormAccounts.get('ibanbloque2').value +
          this.transferFormAccounts.get('ibanbloque3').value + this.transferFormAccounts.get('ibanbloque4').value +
          this.transferFormAccounts.get('ibanbloque5').value + this.transferFormAccounts.get('ibanbloque6').value;

        // this.transferFormAccounts.get('ibanbloque7').setValue(" ");
      }
    }

    this.transferFormAccounts.get('externalDestiny').setValue(externalDestiny);
    let error = this.transferFormAccounts.controls.externalDestiny.errors;
    if (error) {
      if (error.invalidIBAN) {
        this.errorText = 'ONESAIT-CORE.INPUT-VALIDATOR.INVALIDIBAN';
      } else {
        this.errorText = '';
      }
    } else {
      this.errorText = '';
    }
  }

  changeCurrency(event) {
    if (event) {
      this.currencySymbol = _.findWhere(this.currencies, { code: event.currency.code }).sign;
    } else {
      this.currencySymbol = '€';
    }
  }

}
