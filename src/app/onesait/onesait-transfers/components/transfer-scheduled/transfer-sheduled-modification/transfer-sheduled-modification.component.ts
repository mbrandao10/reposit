import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { TransferGenericComponent } from '../../transfer-emit/transfer-generic/transfer-generic.component';
import { AppConfigService, TransferService, DeviceUtilsService, FormatAccountPipe, UtilsService, CurrencyPipe, InputValidatorOptions } from 'onesait-core';
import { TransferPeriodicOutput, TransferPeriodicUpdate, TransferBeneficiary, Amount, GenericIdNameElement, TransferPeriodicityType, TransferExecutionRule, TransferExecutionMoment } from 'onesait-api';
import * as _moment from 'moment';
import { Validators, ValidatorFn, FormGroup } from '@angular/forms';
const moment = _moment;

@Component({
  selector: 'osb-transfer-sheduled-modification',
  templateUrl: './transfer-sheduled-modification.component.html',
  styleUrls: ['./transfer-sheduled-modification.component.css']
})
export class TransferSheduledModificationComponent extends TransferGenericComponent implements OnInit, AfterViewInit {

  // transferState: TransferState;
  // scheduledFormModification: FormGroup;
  // transferFormExecution: FormGroup;
  view = 'MODIFY';
  loading: boolean;
  errorText: string;
  stepMobile: number;

  accountFormatView: any;

  inputValidatorOptions = <InputValidatorOptions>{
    errorText: {
      MIN: 'Importe inferior a 0,01',
      MAX: 'Importe superior a 99.999.999,99'
    }
  };

  @Input() transferscheduled: TransferPeriodicOutput;
  @Input() frequencyTypes: GenericIdNameElement[];
  @Input() transferPeriodicUpdateBack: TransferPeriodicUpdate;
  @Output() updatePeriodic = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();

  constructor(
    protected appConfigService: AppConfigService,
    protected transferService: TransferService,
    protected deviceUtilsService: DeviceUtilsService,
    protected formatAccountPipe: FormatAccountPipe,
    // protected capitalizePipe: CapitalizePipe,
    protected utilsService: UtilsService,
    protected currencyPipe: CurrencyPipe

  ) {
    super(appConfigService, transferService, deviceUtilsService, utilsService, formatAccountPipe);
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
  }

  ngOnInit() {
    // this.transferService.getFrequencyTypes().subscribe((result: GenericListResponse<GenericIdNameElement>) => {
    //   this.frequencyTypes =  result.data;
    //   this.frequencyTypes.forEach( fr => {  return this.capitalizePipe.transform( fr.name ); });
    //   // this.frequencyTypes.unshift({name: this.capitalizePipe.transform('Puntual - Otro día'), id: '-1' });
    // });
    this.createFormControl();
    let ibanbloque1: string;
    let ibanbloque2: string;
    let ibanbloque3: string;
    let ibanbloque4: string;
    let ibanbloque5: string;
    let ibanbloque6: string;
    let externalDestiny: string;

    this.validForm = true;

    if (this.transferPeriodicUpdateBack) {
      if (this.transferPeriodicUpdateBack.beneficiary.toAccount.id) {
        externalDestiny = this.transferPeriodicUpdateBack.beneficiary.toAccount.id;
        if (externalDestiny.length > 23) {
          ibanbloque1 = externalDestiny.substring(0, 4);
          ibanbloque2 = externalDestiny.substring(4, 8);
          ibanbloque3 = externalDestiny.substring(8, 12);
          ibanbloque4 = externalDestiny.substring(12, 16);
          ibanbloque5 = externalDestiny.substring(16, 20);
          ibanbloque6 = externalDestiny.substring(20, 24);
        }
      }

      let amountSched = '0';
      if (this.transferPeriodicUpdateBack.amount.amount) {
        amountSched = this.transferPeriodicUpdateBack.amount.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }

      // rellenamos el formulario transferFormAccounts
      this.transferFormAccounts.controls.origin.disable();
      this.transferFormAccounts.controls.origin.setValue(this.formatAccountPipe.transform (this.transferscheduled.orderer.fromAccount.formats, this.accountFormatView));
      this.transferFormAccounts.controls.amount.setValue(amountSched);
      this.transferFormAccounts.controls.externalDestiny.setValue(externalDestiny);
      this.transferFormAccounts.controls.ibanbloque1.setValue(ibanbloque1);
      this.transferFormAccounts.controls.ibanbloque2.setValue(ibanbloque2);
      this.transferFormAccounts.controls.ibanbloque3.setValue(ibanbloque3);
      this.transferFormAccounts.controls.ibanbloque4.setValue(ibanbloque4);
      this.transferFormAccounts.controls.ibanbloque5.setValue(ibanbloque5);
      this.transferFormAccounts.controls.ibanbloque6.setValue(ibanbloque6);
      this.transferFormAccounts.controls.ibanbloque1.enable();
      this.transferFormAccounts.controls.ibanbloque2.enable();
      this.transferFormAccounts.controls.ibanbloque3.enable();
      this.transferFormAccounts.controls.ibanbloque4.enable();
      this.transferFormAccounts.controls.ibanbloque5.enable();
      this.transferFormAccounts.controls.ibanbloque6.enable();

      // rellenamos el formulario transferFormBeneficiary
      this.transferFormBeneficiary.controls.beneficiaryName.disable();
      this.transferFormBeneficiary.get('beneficiaryName').setValidators(Validators.required);
      this.transferFormBeneficiary.controls.beneficiaryName.setValue(this.transferscheduled.beneficiary.description);

      // rellenamos el formulario transferFormExecution
      this.transferFormExecution.controls.executionMoment.setValue(TransferExecutionMoment.S);
      this.transferFormExecution.controls.frequencyType.setValue(this.transferPeriodicUpdateBack.periodicity.frequency);
      this.transferFormExecution.controls.frequencyType.enable();
      this.transferFormExecution.controls.firstExecutionDate.setValue(moment(this.transferPeriodicUpdateBack.periodicity.firstExecutionDate).format('DD-MM-YYYY'));
      this.transferFormExecution.controls.lastExecutionDate.setValue(moment(this.transferPeriodicUpdateBack.periodicity.lastExecutionDate).format('DD-MM-YYYY'));
      this.transferFormExecution.controls.firstExecutionDate.enable();
      this.transferFormExecution.controls.lastExecutionDate.enable();
      // rellenamos el formulario transferFormData
      this.transferFormData.controls.concept.disable();
      // this.transferFormData.controls.email.disable();
      this.transferFormData.controls.concept.setValue(this.transferscheduled.reason);
      // this.transferFormData.controls.email.setValue(this.transferscheduled.beneficiary.email);

      this.stepMobile = 1;
    } else {
      if (this.transferscheduled.beneficiary.toAccount.id) {
        externalDestiny = this.formatAccountPipe.transform (this.transferscheduled.beneficiary.toAccount.formats, this.accountFormatView, undefined, true);
        if (externalDestiny.length > 23) {
          ibanbloque1 = externalDestiny.substring(0, 4);
          ibanbloque2 = externalDestiny.substring(4, 8);
          ibanbloque3 = externalDestiny.substring(8, 12);
          ibanbloque4 = externalDestiny.substring(12, 16);
          ibanbloque5 = externalDestiny.substring(16, 20);
          ibanbloque6 = externalDestiny.substring(20, 24);
        }
      }

      let amountSched = '0';
      if (this.transferscheduled.amount.amount) {
        amountSched = this.transferscheduled.amount.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }

      // rellenamos el formulario transferFormAccounts
      this.transferFormAccounts.controls.origin.disable();
      this.transferFormAccounts.controls.origin.setValue(this.formatAccountPipe.transform (this.transferscheduled.orderer.fromAccount.formats, this.accountFormatView));
      this.transferFormAccounts.controls.amount.setValue(amountSched);
      this.transferFormAccounts.controls.externalDestiny.setValue(externalDestiny);
      this.transferFormAccounts.controls.ibanbloque1.setValue(ibanbloque1);
      this.transferFormAccounts.controls.ibanbloque2.setValue(ibanbloque2);
      this.transferFormAccounts.controls.ibanbloque3.setValue(ibanbloque3);
      this.transferFormAccounts.controls.ibanbloque4.setValue(ibanbloque4);
      this.transferFormAccounts.controls.ibanbloque5.setValue(ibanbloque5);
      this.transferFormAccounts.controls.ibanbloque6.setValue(ibanbloque6);
      this.transferFormAccounts.controls.ibanbloque1.enable();
      this.transferFormAccounts.controls.ibanbloque2.enable();
      this.transferFormAccounts.controls.ibanbloque3.enable();
      this.transferFormAccounts.controls.ibanbloque4.enable();
      this.transferFormAccounts.controls.ibanbloque5.enable();
      this.transferFormAccounts.controls.ibanbloque6.enable();

      // rellenamos el formulario transferFormBeneficiary
      this.transferFormBeneficiary.controls.beneficiaryName.disable();
      this.transferFormBeneficiary.get('beneficiaryName').setValidators(Validators.required);
      this.transferFormBeneficiary.controls.beneficiaryName.setValue(this.transferscheduled.beneficiary.description);

      // rellenamos el formulario transferFormExecution
      this.transferFormExecution.controls.executionMoment.setValue(TransferExecutionMoment.S);
      this.transferFormExecution.controls.frequencyType.setValue(this.transferscheduled.periodicity.frequency);
      this.transferFormExecution.controls.frequencyType.enable();
      this.transferFormExecution.controls.firstExecutionDate.setValue(moment(this.transferscheduled.periodicity.firstExecutionDate).format('DD-MM-YYYY'));
      this.transferFormExecution.controls.lastExecutionDate.setValue(moment(this.transferscheduled.periodicity.lastExecutionDate).format('DD-MM-YYYY'));
      this.transferFormExecution.controls.firstExecutionDate.enable();
      this.transferFormExecution.controls.lastExecutionDate.enable();
      // rellenamos el formulario transferFormData
      this.transferFormData.controls.concept.disable();
      // this.transferFormData.controls.email.disable();
      this.transferFormData.controls.concept.setValue(this.transferscheduled.reason);
      // this.transferFormData.controls.email.setValue(this.transferscheduled.beneficiary.email);

      this.stepMobile = 1;
    }
  }

  ngAfterViewInit() {

  }

  changeAccountFrom() {
    let externalDestiny: string;
    // console.log(bloque, externalDestiny);
    if (this.transferFormAccounts.get('ibanbloque1').value &&
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
    }
  }

  applyFormatAmount() {
    // if (!this.scheduledFormModification.get('amount').invalid) {
    //   let n = this.scheduledFormModification.get('amount').value;
    //   n = n.replace(/\./g, '');
    //   n = n.replace(/,/g, '.');
    //   n = + n;
    //   n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    //   this.scheduledFormModification.get('amount').setValue(n);
    // }
  }

  close() {
    this.cancelEdit.emit();
  }

  finish() {
    let transferPeriodicUpdate = new TransferPeriodicUpdate();

    transferPeriodicUpdate.transferId = this.transferscheduled.id;
    let dateFirst;
    if (this.transferFormExecution.get('firstExecutionDate').dirty) {
      dateFirst = this.utilsService.dateToRFC3339(this.transferFormExecution.get('firstExecutionDate').value);
    } else {
      dateFirst = this.utilsService.dateToRFC3339(this.transferscheduled.nextExecutionDate);
    }

    let dateLast;
    if (this.transferFormExecution.get('lastExecutionDate').dirty) {
      dateLast = this.utilsService.dateToRFC3339(this.transferFormExecution.get('lastExecutionDate').value);
    } else {
      dateLast = this.utilsService.dateToRFC3339(this.transferscheduled.periodicity.lastExecutionDate);
    }

    // date = new Date();
    // dateMore = this.date.getDate() + this.date.getTime() + 86400000;
    // minDate = new Date(this.dateMore);

    transferPeriodicUpdate.periodicity = {
      type: TransferPeriodicityType.PERIODIC,
      frequency: this.transferFormExecution.get('frequencyType').value,
      firstExecutionDate: dateFirst,
      lastExecutionDate: dateLast,
      executionRule: TransferExecutionRule.E
    };

    transferPeriodicUpdate.beneficiary = <TransferBeneficiary> {
      toAccount: {
        id: this.transferFormAccounts.get('externalDestiny').value,
      },
      description: this.transferFormBeneficiary.get('beneficiaryName').value
    };

    transferPeriodicUpdate.orderer = this.transferscheduled.orderer;
    // .replace(/ /g, '')
    transferPeriodicUpdate.amount = <Amount>{
      amount: this.transferFormAccounts.get('amount').value.replace(/\./g, '').replace(/,/g, '.'),
      currency: this.transferscheduled.amount.currency
    };

    transferPeriodicUpdate.reason = this.transferFormData.get('concept').value;

    this.updatePeriodic.emit(transferPeriodicUpdate);
  }


  validStep() {
    switch (this.stepMobile) {
      case 1:
        return this.transferFormAccounts.valid && this.transferFormBeneficiary.valid;
      case 2:
        return this.transferFormExecution.valid;
      case 3:
        return this.transferFormData.valid;
      default:
        return false;
    }
  }

  nextStep() {
    if (this.stepMobile === 3) {
      this.finish();
    } else {
      this.stepMobile++;
    }
  }

  groupValidationSearch(): ValidatorFn {
    let result = (group: FormGroup): { [key: string]: boolean } | null => {

      let firstExecutionDate;
      let lastExecutionDate;

      if (group.get('firstExecutionDate').dirty) {
        firstExecutionDate = this.utilsService.dateToRFC3339(group.get('firstExecutionDate').value);
      } else {
        firstExecutionDate =  this.utilsService.dateToRFC3339(this.transferscheduled.nextExecutionDate);
      }

      if (group.get('lastExecutionDate').dirty) {
        lastExecutionDate = this.utilsService.dateToRFC3339(group.get('lastExecutionDate').value);
      } else {
        lastExecutionDate = this.utilsService.dateToRFC3339(this.transferscheduled.periodicity.lastExecutionDate);
      }

      // firstExecutionDate = Number(moment(firstExecutionDate).format('YYYYMMDD'));
      if (firstExecutionDate !== undefined && lastExecutionDate !== undefined && firstExecutionDate !== null && lastExecutionDate !== null && firstExecutionDate !== '' && lastExecutionDate !== '') {
        // lastExecutionDate = Number(moment(lastExecutionDate).format('YYYYMMDD'));
        if (firstExecutionDate > lastExecutionDate) {
          return { 'invalidDate': true }; // Rango de fechas incorrecto
        }
      }

      if (firstExecutionDate === undefined || firstExecutionDate === null || firstExecutionDate === '') {
        return { 'requiredFirstDate': true }; // Fecha Inicial obligatoria
      }

      if (group.controls.lastExecutionDate.enabled && group.touched) {
        if (firstExecutionDate !== undefined || firstExecutionDate !== null || firstExecutionDate !== '') {
          if (lastExecutionDate === undefined || lastExecutionDate === null || lastExecutionDate === '') {
            return { 'requiredLastDate': true }; // Fecha Final obligatoria
          }
        }
      }

      if (firstExecutionDate !== undefined && firstExecutionDate !== null && firstExecutionDate !== '') {
        let now: any = new Date();
        // nowDate.setDate(nowDate.getDate() + 1);
        now = Number(moment(now).format('YYYYMMDD'));
        if (firstExecutionDate <= now) {
          return { 'invalidInitialDate': true };
        }
      }

      return null;
    };
    return result;
  }
}
