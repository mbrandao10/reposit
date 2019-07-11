import { Component, OnInit, OnChanges } from '@angular/core';
import { AppConfigService, TransferService, DeviceUtilsService, UtilsService, InputValidatorOptions, FormatAccountPipe } from 'onesait-core';
import { TransferGenericComponent } from '../transfer-generic/transfer-generic.component';
import * as _ from 'underscore';
import { TRANSFER_MODE } from 'onesait-api';
import { Validators } from '@angular/forms';

@Component({
  selector: 'osb-transfer-emit-inter',
  templateUrl: './transfer-emit-inter.component.html'
})
export class TransferEmitInterComponent extends TransferGenericComponent implements OnInit, OnChanges {

  step: number;
  validTransfer: boolean;

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
    protected formatAccountPipe: FormatAccountPipe

  ) {
    super(appConfigService, transferService, deviceUtilsService, utilsService, formatAccountPipe);
    this.transferMode = TRANSFER_MODE.INTERNATIONAL;
  }

  addCustomValidators() {
    this.transferFormAccounts.get('bic').enable();
    this.transferFormAccounts.get('currency').enable();
    this.transferFormAccounts.get('externalDestiny').enable();
    this.transferFormAccounts.get('externalDestiny').setValidators([Validators.required, Validators.minLength(15), Validators.maxLength(34)]);
    this.transferFormAccounts.get('externalDestinyName').enable();
    this.transferFormAccounts.get('externalDestinyName').setValidators(Validators.required);
    this.transferFormAccounts.get('externalDestinyCountry').enable();
    this.transferFormAccounts.get('externalDestinyCountry').setValidators(Validators.required);
    this.transferFormBeneficiary.get('beneficiaryName').setValidators(Validators.required);
    this.transferFormBeneficiary.get('beneficiaryCountry').setValidators(Validators.required);
    this.transferFormAccounts.get('chargeBearer').enable();
    this.transferFormAccounts.get('chargeBearer').setValidators(Validators.required);
    this.transferFormData.get('purposeType').enable();
    this.transferFormData.get('purposeType').setValidators(Validators.required);
  }

  customizeTransferState(): any {
    this.transferState.title = '[Transferencia internacional]';
    let chargeBearerShared = _.findWhere(this.transferState.chargeBearer, {id: "SHAR"}) //Gasto compartido
    this.transferFormAccounts.get('chargeBearer').setValue(chargeBearerShared);
    this.transferFormData.get('purposeType').setValue(this.transferState.purposeTypes[0]);
    // this.transferFormBeneficiary.get('beneficiaryCountry').setValue(this.transferState.beneficiaryCountriesInternational[0]);
  }
}
