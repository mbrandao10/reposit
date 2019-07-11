import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TransferState, TRANSFER_MODE, AccountElement, AccountsSelectTransfer } from 'onesait-api';
import { TransferGenericComponent } from '../transfer-generic/transfer-generic.component';
import { AppConfigService, TransferService, DeviceUtilsService, UtilsService, InputValidatorOptions, CurrencyPipe, FormatAccountPipe } from 'onesait-core';

@Component({
  selector: 'osb-transfer-emit-trasp',
  templateUrl: './transfer-emit-trasp.component.html'
})
export class TransferEmitTraspComponent extends TransferGenericComponent implements OnInit, AfterViewInit {

  @Input() transferState: TransferState;

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };

  symbolOrigin = '€';
  accountsDestiny: AccountsSelectTransfer[] = [];

  constructor(
    appConfigService: AppConfigService,
    transferService: TransferService,
    deviceUtilsService: DeviceUtilsService,
    utilsService: UtilsService,
    protected currencyPipe: CurrencyPipe,
    protected formatAccountPipe: FormatAccountPipe
  ) {
    super(appConfigService, transferService, deviceUtilsService, utilsService, formatAccountPipe);
    this.transferMode = TRANSFER_MODE.TRASPASO;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.transferFormAccounts.controls.accountDestiny.value) {
      this.accountsDestiny.forEach(account => {
        if (account.id === this.transferFormAccounts.controls.accountDestiny.value.id) {
          this.transferFormAccounts.controls.accountDestiny.setValue(account);
        }
      });
    }
  }


  validateTraspForms() {
    if (this.transferFormExecution.value.executionMoment === 'S') {
      if (this.transferFormExecution.value.firstExecutionDate !== undefined) {
        if (this.transferFormExecution.value.lastExecutionDate) {
          let firstExecutionDate = new Date(this.transferFormExecution.value.firstExecutionDate);
          let lastExecutionDate = new Date(this.transferFormExecution.value.lastExecutionDate);
          if (firstExecutionDate.getTime() <= lastExecutionDate.getTime()) {
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

  changeAccountTo(accountOrigin: AccountElement) {

    if (!this.reload) {
      if (!accountOrigin) {
        this.transferFormAccounts.get('accountDestiny').setValue(null);
        this.transferFormAccounts.get('accountDestiny').disable();
        return;
      }

      this.transferFormAccounts.get('accountDestiny').setValue(null);
      this.transferFormAccounts.get('accountDestiny').enable();
      this.accountsDestiny = [];

      // this.symbolOrigin = this.currencyPipe.transform(null, '978', true).sign; // Traspaso siempre en euros.
    } else {
      this.reload = false;
    }
    this.accountSelectTransfer.forEach(account => {
      if (account.id !== accountOrigin.id) {
        this.accountsDestiny.push(account);
      }
    });
  }
}
