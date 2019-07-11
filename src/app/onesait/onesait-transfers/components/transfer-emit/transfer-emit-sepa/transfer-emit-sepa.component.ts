import { Component, OnInit, OnChanges } from '@angular/core';
import { TransferGenericComponent } from '../transfer-generic/transfer-generic.component';
import { AppConfigService, TransferService, DeviceUtilsService, UtilsService, CurrencyPipe, InputValidatorOptions, FormatAccountPipe } from 'onesait-core';
import { TRANSFER_MODE } from 'onesait-api';
import { Validators } from '@angular/forms';

@Component({
  selector: 'osb-transfer-emit-sepa',
  templateUrl: './transfer-emit-sepa.component.html'
})
export class TransferEmitSepaComponent extends TransferGenericComponent implements OnInit, OnChanges {

  // @Input() transferState: TransferState;
  symbolOrigin = '€';
  errorText: string;
  // accountsSepa: AccountsSelectTransfer[] = [];

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };

  constructor(
    appConfigService: AppConfigService,
    transferService: TransferService,
    deviceUtilsService: DeviceUtilsService,
    protected utilsService: UtilsService,
    protected currencyPipe: CurrencyPipe,
    protected formatAccountPipe: FormatAccountPipe
  ) {
    super(appConfigService, transferService, deviceUtilsService, utilsService, formatAccountPipe);
    this.transferMode = TRANSFER_MODE.SEPA;
  }

  ngOnInit() {
    super.ngOnInit();
    /* this.accountSelectTransfer.forEach(element => {
       if (element.currency.code === '978') {
         this.accountsSepa.push(element);
       }
     });*/
  }

  addCustomValidators() {

    // this.transferFormAccounts.get('externalDestiny').enable();
    this.transferFormAccounts.get('ibanbloque1').enable();
    this.transferFormAccounts.get('ibanbloque2').enable();
    this.transferFormAccounts.get('ibanbloque3').enable();
    this.transferFormAccounts.get('ibanbloque4').enable();
    this.transferFormAccounts.get('ibanbloque5').enable();
    this.transferFormAccounts.get('ibanbloque6').enable();

    this.transferFormBeneficiary.get('beneficiaryName').setValidators(Validators.required);

  }


  validateTraspForms() {
    if (this.transferFormExecution.value.executionMoment === 'S') {
      if (this.transferFormExecution.value.firstExecutionDate !== undefined) {
        if (this.transferFormExecution.value.lastExecutionDate) {
          if (this.transferFormExecution.value.firstExecutionDate.getTime() <= this.transferFormExecution.value.lastExecutionDate.getTime()) {
            return this.transferFormAccounts.valid && this.transferFormExecution.valid && this.transferFormData.valid;
          }
        } else {
          if (this.transferFormExecution.value.frequencyType) {
            return this.transferFormAccounts.valid && this.transferFormExecution.valid && this.transferFormData.valid;
          }
        }
      }
    }
    if (this.transferFormExecution.value.executionMoment === 'N') {
      return this.transferFormAccounts.valid && this.transferFormExecution.valid && this.transferFormData.valid;
    }
  }

  // changeAccountTo(accountOrigin: AccountElement) {
  //  this.symbolOrigin = this.currencyPipe.transform(null, accountOrigin.currency.code, true).sign;
  // }

  changeAccountFrom(changedBlock: number) {
    let externalDestiny: string;
    // console.log(bloque, externalDestiny);
    if ((this.transferFormAccounts.get('ibanbloque1').status === 'INVALID' && this.transferFormAccounts.controls.ibanbloque1.errors.minlength) ||
      (this.transferFormAccounts.get('ibanbloque2').status === 'INVALID' && this.transferFormAccounts.controls.ibanbloque2.errors.minlength) ||
      (this.transferFormAccounts.get('ibanbloque3').status === 'INVALID' && this.transferFormAccounts.controls.ibanbloque3.errors.minlength) ||
      (this.transferFormAccounts.get('ibanbloque4').status === 'INVALID' && this.transferFormAccounts.controls.ibanbloque4.errors.minlength) ||
      (this.transferFormAccounts.get('ibanbloque5').status === 'INVALID' && this.transferFormAccounts.controls.ibanbloque5.errors.minlength) ||
      (this.transferFormAccounts.get('ibanbloque6').status === 'INVALID' && this.transferFormAccounts.controls.ibanbloque6.errors.minlength)) {
      this.errorText = 'ONESAIT-CORE.INPUT-VALIDATOR.MINLENGTHIBAN';
    } else if ((this.transferFormAccounts.get('ibanbloque1').status === 'INVALID' && this.transferFormAccounts.get('ibanbloque1').touched && this.transferFormAccounts.controls.ibanbloque1.errors.required) ||
      (this.transferFormAccounts.get('ibanbloque2').status === 'INVALID' && this.transferFormAccounts.get('ibanbloque2').touched && this.transferFormAccounts.controls.ibanbloque2.errors.required) ||
      (this.transferFormAccounts.get('ibanbloque3').status === 'INVALID' && this.transferFormAccounts.get('ibanbloque3').touched && this.transferFormAccounts.controls.ibanbloque3.errors.required) ||
      (this.transferFormAccounts.get('ibanbloque4').status === 'INVALID' && this.transferFormAccounts.get('ibanbloque4').touched && this.transferFormAccounts.controls.ibanbloque4.errors.required) ||
      (this.transferFormAccounts.get('ibanbloque5').status === 'INVALID' && this.transferFormAccounts.get('ibanbloque5').touched && this.transferFormAccounts.controls.ibanbloque5.errors.required) ||
      (this.transferFormAccounts.get('ibanbloque6').status === 'INVALID' && this.transferFormAccounts.get('ibanbloque6').touched && this.transferFormAccounts.controls.ibanbloque6.errors.required)) {
      this.errorText = 'ONESAIT-CORE.INPUT-VALIDATOR.REQUIRED';
    } else if (this.transferFormAccounts.get('ibanbloque1').value &&
      this.transferFormAccounts.get('ibanbloque2').value &&
      this.transferFormAccounts.get('ibanbloque3').value &&
      this.transferFormAccounts.get('ibanbloque4').value &&
      this.transferFormAccounts.get('ibanbloque5').value &&
      this.transferFormAccounts.get('ibanbloque6').value) {

      externalDestiny = this.transferFormAccounts.get('ibanbloque1').value + this.transferFormAccounts.get('ibanbloque2').value + this.transferFormAccounts.get('ibanbloque3').value + this.transferFormAccounts.get('ibanbloque4').value + this.transferFormAccounts.get('ibanbloque5').value + this.transferFormAccounts.get('ibanbloque6').value;

      this.transferFormAccounts.get('externalDestiny').enable();
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
    } else {
      this.errorText = '';
    }
    console.log(changedBlock);
    // this.tabulacionIBAN(changedBlock);
  }

  tabulacionIBAN(changedBlock: number) {
    if (!this.reloadInProgress) {

      let block = 'ibanbloque' + changedBlock;

      if (changedBlock !== 6) {
        if (this.transferFormAccounts.get(block).value.length === 4) {
          if (changedBlock === 1 &&
            (this.transferFormAccounts.get('ibanbloque1').value !== this.transferFormAccounts.get('ibanbloque1').value.toUpperCase())) {
            this.transferFormAccounts.get('ibanbloque1').setValue(this.transferFormAccounts.get('ibanbloque1').value.toUpperCase());
          }
          let blockAve = 'ibanbloque' + (changedBlock + 1);
          document.getElementById(blockAve).focus();
        }
      }
    }
  }
}
