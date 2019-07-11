import { Component, OnInit, OnChanges } from '@angular/core';
import { AppConfigService, TransferService, DeviceUtilsService, UtilsService, InputValidatorOptions, AccountsValidator, FormatAccountPipe } from 'onesait-core';
import { TransferGenericComponent } from '../transfer-generic/transfer-generic.component';
import { TransferExecutionType, TRANSFER_MODE, AccountElement, GenericIdNameElement } from 'onesait-api';
import { Validators } from '@angular/forms';
import * as _ from 'underscore';

export enum radioResident {
  yes = 'true',
  no = 'false'
}

@Component({
  selector: 'osb-transfer-emit-target',
  templateUrl: './transfer-emit-target.component.html'
})

export class TransferEmitTargetComponent extends TransferGenericComponent implements OnInit, OnChanges {

  step: number;
  validTransfer: boolean;
  chargeBearer: GenericIdNameElement;
  currency: GenericIdNameElement
  accountsTarget: AccountElement[] = [];
  radioValues = radioResident;

  residentRadio: string;

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };
  symbolOrigin = '€';

  constructor(
    appConfigService: AppConfigService,
    transferService: TransferService,
    deviceUtilsService: DeviceUtilsService,
    protected utilsService: UtilsService,
    protected formatAccountPipe: FormatAccountPipe
  ) {
    super(appConfigService, transferService, deviceUtilsService, utilsService, formatAccountPipe);
    this.transferMode = TRANSFER_MODE.TARGET2;
    this.currency = { id: '978', name: 'EUR' };
    this.chargeBearer = { id: 'SHAR', name: 'Compartidos' };
  }


  addCustomValidators() {
    this.transferFormAccounts.get('bic').enable();
    // this.transferFormAccounts.get('currency').enable();
    this.transferFormAccounts.get('externalDestiny').enable();
    this.transferFormAccounts.get('externalDestiny').setValidators([Validators.required, Validators.minLength(15), Validators.maxLength(34), AccountsValidator.IBANValidatorGeneric]);
    this.transferFormBeneficiary.get('beneficiaryName').setValidators(Validators.required);
    this.transferFormBeneficiary.get('beneficiaryResident').setValidators(Validators.required);
    this.transferFormAccounts.get('chargeBearer').disable();
    this.transferFormAccounts.get('chargeBearer').setValidators(Validators.required);
    this.transferFormData.get('purposeType').enable();
    this.transferFormData.get('purposeType').setValidators(Validators.required);

    // Tipo urgente
    this.transferFormAccounts.get('executionType').setValue(TransferExecutionType.N);
  }

  customizeTransferState(): any {
    this.transferState.title = '[Transferencia internacional]';
    // this.transferState.beneficiaryResident = this.radioValues.yes;
    // this.transferFormBeneficiary.get('beneficiaryCountry').setValue(_.findWhere(this.transferState.beneficiaryCountriesTarget, {id: '724'}));
    // this.chargeBearer = _.findWhere(this.transferState.chargeBearer, { id: 'SHAR' });
    this.transferFormAccounts.get('chargeBearer').setValue(_.findWhere(this.transferState.chargeBearer, { id: 'SHAR' }));
    // this.currency = _.findWhere(this.transferState.currencies, { id: '978' });
    // this.transferFormAccounts.get('currency').setValue(this.currency);
    this.transferFormData.get('purposeType').setValue(this.transferState.purposeTypes[0]);
    // this.transferFormBeneficiary.get('beneficiaryCountry').setValue(this.transferState.beneficiaryCountriesTarget[0]);
  }

  changeRadio() {
    this.transferFormBeneficiary.get('beneficiaryResident').setValue(this.transferState.beneficiaryResident);
    if (this.transferState.beneficiaryResident === 'true') {
      this.transferFormBeneficiary.get('beneficiaryCountry').setValue(_.findWhere(this.transferState.beneficiaryCountriesTarget, { id: '724' }));
    }
  }

  onChangeSelectCountry(event) {
    if (event.id === '724') {
      this.transferState.beneficiaryResident = 'true';
    } else {
      this.transferState.beneficiaryResident = 'false';
    }
  }

}
