import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { TransferSimulation, TransferNew, TransferExecutionType, TransferPeriodicNew, GenericResponse, GenericIdNameElement, TransferExecutionRule, TransferFavouriteOutput, AccountsSelectTransfer } from 'onesait-api';
import { AppConfigService, TransferService, DeviceUtilsService, UtilsService, AccountsValidator, FormatAccountPipe } from 'onesait-core';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import * as _ from 'underscore';
import { TransferState } from 'onesait-api';
import { TransferExecutionMoment, TransferPeriodicityType } from 'onesait-api';
import * as _moment from 'moment';
import { Subscription } from 'rxjs';
const moment = _moment;


@Component({
  selector: 'osb-transfer-generic',
  template: '',
})
export class TransferGenericComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {


  @Input() transferState: TransferState;
  @Input() favourite: TransferFavouriteOutput;
  @Output() formsCompleted: EventEmitter<any> = new EventEmitter<any>();

  // newTransferForm: FormGroup;
  accountFormatView: string;
  accountSelectTransfer: AccountsSelectTransfer[] = [];
  transferForms: FormGroup[] = [];
  transferFormAccounts: FormGroup;
  transferFormBeneficiary: FormGroup;
  transferFormExecution: FormGroup;
  transferFormData: FormGroup;
  step: number;
  validTransfer: boolean;
  simulation: TransferSimulation;
  transferFavouriteSelected: TransferFavouriteOutput;
  transferMode: string;
  defaultCurrency: GenericIdNameElement;
  dateMore = new Date().getDate() + new Date().getTime() + 86400000;
  minDate = new Date(this.dateMore);
  reload: boolean;

  validForm: boolean;
  accountsSepa: AccountsSelectTransfer[] = [];
  subs: Subscription[] = [];

  reloadInProgress = false; //Determina si se está realizando el proceso de carga de favoritos.

  constructor(
    protected appConfigService: AppConfigService,
    protected transferService: TransferService,
    protected deviceUtilsService: DeviceUtilsService,
    protected utilsService: UtilsService,
    protected formatAccountPipe: FormatAccountPipe
  ) {
    this.accountFormatView = appConfigService.getConfig().account.viewKey;
  }

  ngOnInit() {

    this.loadSuscriptionFormSimulate();

    // Rellenamos el array accountSelectTransfer con las cuentas y los creditos ya que desde estos dos tipos de productos se puede realizar transferencias

    if (this.transferState.accounts) {
      this.transferState.accounts.forEach(element => {
        this.accountSelectTransfer.push({
          id: element.id,
          formats: element.formats,
          currency: element.currency
        });
      });
    }

    if (this.transferState.credits) {
      this.transferState.credits.forEach(element => {
        this.accountSelectTransfer.push({
          id: element.id,
          formats: element.formats,
          currency: element.currency
        });
      });
    }
    this.accountSelectTransfer.unshift(
      {
        id: '',
        formats: null,
        currency: null
      });

    this.accountSelectTransfer.forEach(element => {
      if (element.currency.code === '978') {
        this.accountsSepa.push(element);
      }
    });

    this.accountsSepa.unshift(
      {
        id: '',
        formats: null,
        currency: null
      });
  }

  ngAfterViewInit() {
    if (this.favourite) {
      this.transferState.favourites.forEach(element => {
        if (element.id === this.favourite.id) {
          this.transferFavouriteSelected = element;
        }
      });
      if (this.transferFavouriteSelected) {
        this.unLoadSubscriptionFormSimulate();
        this.loadFormFromFavourite(this.transferFavouriteSelected);
        this.simulateTransfer();
        this.loadSuscriptionFormSimulate();
      }
    }else{

    // utilizamos este flag "reload" para el traspaso (que no borre la cuenta destino si lo que
    // se ha hecho ha sido darle a continuar y ha vuelto a atras a la ventana de traspaso)

    if (this.transferFormAccounts.controls.origin.value) {
      this.accountSelectTransfer.forEach(account => {
        if (account.id === this.transferFormAccounts.controls.origin.value.id) {
          this.reload = true;
          this.transferFormAccounts.controls.origin.setValue(account);
        }
      });
    }
  }
  }

  loadSuscriptionFormSimulate() {
    let count = 0;
    this.transferForms.forEach((form) => {
      this.subs[count++] = form.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()).subscribe(() => {
          this.simulateTransfer();
        });
    });
  }
  unLoadSubscriptionFormSimulate() {
    if (this.subs && this.subs.length > 0) {
      this.subs.forEach((sub: Subscription) => {
        if (sub) {
          sub.unsubscribe();
        }
      });
    }
  }

  loadTranfersFavByMode() {
    let favouritesByMode = _.groupBy(this.transferState.favourites, function (fav: any) { return fav.transferMode.id; });
    this.transferState.favourites = favouritesByMode[this.transferMode];
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.transferState && this.transferState) {
      // Cargamos info por defecto
      if (!this.transferState.transferForms) {
        this.createFormControl();
        this.setDefaultValues();
        this.customizeTransferState();
        this.loadTranfersFavByMode();
      } else {
        this.assignForms();
        this.addCustomValidators();
      }
    }
  }

  onChangeSelect(fav: any) {
    // Si se selecciona una transferencia favorita se rellena el formulario
    if (fav) {
      this.unLoadSubscriptionFormSimulate();
      this.loadFormFromFavourite(fav);
      this.loadSuscriptionFormSimulate();
      this.simulateTransfer();
    } else {
      this.createFormControl();
      this.setDefaultValues();
      this.customizeTransferState();
      this.loadTranfersFavByMode();
    }
  }

  setDefaultValues(): any {
    let defaultCurrency = this.appConfigService.getConfig('transfers.defaultCurrency');
    let currency = _.findWhere(this.transferState.currencies, { id: defaultCurrency.id });
    this.defaultCurrency = currency;
    this.transferFormAccounts.controls.currency.setValue(currency);
    this.transferFormAccounts.controls.transferMode.setValue(this.transferMode);
    this.transferFormExecution.controls.frequencyType.setValue(this.transferState.frequencyTypes[0].id);
    this.transferFormAccounts.controls.chargeBearer.setValue(null);
    this.transferFormData.controls.purposeType.setValue(null);
    this.transferState.formSteps = 3;
  }

  customizeTransferState(): any { }

  assignForms() {
    this.transferForms = this.transferState.transferForms;
    this.transferFormAccounts = this.transferForms[0];
    this.transferFormBeneficiary = this.transferForms[1];
    this.transferFormExecution = this.transferForms[2];
    this.transferFormData = this.transferForms[3];
  }

  createFormControl() {
    // Info requerida de las cuentas, obligatorios para la simulación
    this.transferFormAccounts = new FormGroup({
      origin: new FormControl(null, Validators.required),
      // Cuando es una cuenta propia
      accountDestiny: new FormControl({ value: null, disabled: true }, [Validators.required]),
      amount: new FormControl(null, [Validators.required, this.amountValidator]),
      chargeBearer: new FormControl({ value: null, disabled: true }, [Validators.required]),
      externalDestiny: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.minLength(15), Validators.maxLength(34), AccountsValidator.IBANValidator]),
      // Nombre de entidad bancaria (transf int.)
      externalDestinyName: new FormControl({ value: null, disabled: true }),
      // País de entidad bancaria (transf int.)
      externalDestinyCountry: new FormControl({ value: null, disabled: true }),
      ibanbloque1: new FormControl({ value: null, disabled: true }, [Validators.required]),
      ibanbloque2: new FormControl({ value: null, disabled: true }, [Validators.required]),
      ibanbloque3: new FormControl({ value: null, disabled: true }, [Validators.required]),
      ibanbloque4: new FormControl({ value: null, disabled: true }, [Validators.required]),
      ibanbloque5: new FormControl({ value: null, disabled: true }, [Validators.required]),
      ibanbloque6: new FormControl({ value: null, disabled: true }, [Validators.required]),
      ibanbloque7: new FormControl({ value: null, disabled: true }),
      currency: new FormControl({ value: null, disabled: true }, Validators.required),
      bic: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.minLength(8), Validators.maxLength(11), this.BICValidator]),
      transferMode: new FormControl(),
      executionType: new FormControl(TransferExecutionType.S, Validators.required),
    });
    // Datos del beneficiario no necesario para la simulación
    this.transferFormBeneficiary = new FormGroup({
      beneficiaryName: new FormControl(null),
      beneficiaryAddress: new FormControl(null),
      beneficiaryProvince: new FormControl(null),
      beneficiaryCountry: new FormControl(null),
      beneficiaryResident: new FormControl(null)
    });
    // Obligatorio para la simulacion
    this.transferFormExecution = new FormGroup({
      frequencyType: new FormControl({ value: null, disabled: true }, Validators.required),
      executionDate: new FormControl({ value: null, disabled: true }, Validators.required),
      firstExecutionDate: new FormControl({ value: this.minDate, disabled: true }, Validators.required),
      lastExecutionDate: new FormControl({ value: null, disabled: true }, Validators.required),
      executionMoment: new FormControl(TransferExecutionMoment.N, Validators.required),
      periodicUndefined: new FormControl(false)
    }, this.groupValidationSearch());
    // Datos adicionales para la transferencia
    this.transferFormData = new FormGroup({
      concept: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      purposeType: new FormControl({ value: null, disabled: true }),
      email: new FormControl(null, [Validators.email, Validators.maxLength(50)]),
      favouriteName: new FormControl()
    });
    this.transferForms.push(this.transferFormAccounts);
    this.transferForms.push(this.transferFormBeneficiary);
    this.transferForms.push(this.transferFormExecution);
    this.transferForms.push(this.transferFormData);
    this.addCustomValidators();
  }

  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let rf = new RegExp(/^(\d{1,3}(\.\d{3})*|(\d+))(\,\d{0,2})?$/);
    if (control.value !== undefined && control.value !== null) {
      let value: string = '' + control.value;
      if (!rf.test(value)) {
        return { 'invalidAmount': true };
      }
      let valueN = +value.replace(/\./g, '').replace(/\,/g, '.');
      if (isNaN(valueN)) { return { 'invalidAmount': true }; }
      if (valueN < 0.01) { return { 'min': true }; }
      if (valueN > 99999999.99) { return { 'max': true }; }
    }
    return null;
  }

  BICValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let bicPattern = /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/;
    let bic = control.value;
    if (bic !== null && bic !== undefined) {
      if (!bicPattern.test(bic.toUpperCase())) {
        return { 'invalidBIC': true };
      }
    }
    return null;

  }


  addCustomValidators() { }

  prepareTransfer(): TransferNew {
    let transfer = new TransferNew();
    transfer = this.prepareCommonTransfer(transfer);
    transfer.executionType = this.transferFormAccounts.get('executionType').value;
    return transfer;
  }

  preparePeriodic(): TransferPeriodicNew {
    let transfer = new TransferPeriodicNew();
    transfer = this.prepareCommonTransfer(transfer);
    let type = this.transferFormExecution.get('executionMoment').value === TransferExecutionMoment.P
      ? TransferPeriodicityType.UNIQUE : TransferPeriodicityType.PERIODIC;

    if (type === TransferPeriodicityType.PERIODIC) {
      // let periodicUndefined;
      // if (!this.transferFormExecution.get('periodicUndefined').value) {
      //   periodicUndefined = true;
      // } else {
      //   periodicUndefined = false;
      // }
      transfer.periodicity = {
        type: type,
        frequency: this.transferFormExecution.get('frequencyType').value,
        firstExecutionDate: this.utilsService.dateToRFC3339(this.transferFormExecution.get('firstExecutionDate').value),
        lastExecutionDate: this.utilsService.dateToRFC3339(this.transferFormExecution.get('lastExecutionDate').value),
        executionRule: TransferExecutionRule.E,
        periodicUndefined: this.transferFormExecution.get('periodicUndefined').value
      };
    } else {
      transfer.periodicity = {
        type: type,
        firstExecutionDate: this.utilsService.dateToRFC3339(this.transferFormExecution.get('firstExecutionDate').value)
      };
    }
    return transfer;
  }

  prepareCommonTransfer(transfer: any) {
    transfer.transferMode = this.transferFormAccounts.get('transferMode').value;
    // parseo el modelo amount DCJ
    //  this.transferFormAccounts.get('amount').setValue( this.transferFormAccounts.get('amount').value.replace(/\./g, '').replace(/,/g, '.'));
    // FIN DCJ
    transfer.amount = {
      amount: this.transferFormAccounts.get('amount').value.replace(/\./g, '').replace(/,/g, '.'),
      // currency: this.transferFormAccounts.get('currency').value
      currency: {
        id: this.transferFormAccounts.get('currency').value.name,
        code: this.transferFormAccounts.get('currency').value.id
      }
      // currency: { id: 'EUROS', code: this.transferFormAccounts.get('currency').value.id }
    };
    transfer.orderer = {
      fromAccount: {
        id: this.transferFormAccounts.get('origin').value.id,
        formats: this.transferFormAccounts.get('origin').value.formats
      }
    };

    let toAccount = {
      id: null,
      type: null,
      swift: this.transferFormAccounts.get('bic').value
    };
    if (this.transferFormAccounts.get('accountDestiny').value) {
      this.transferFormAccounts.get('accountDestiny').value.formats.forEach(element => {
        if (element.format.id === this.accountFormatView) {
          toAccount.id = element.value;
          toAccount.type = element.format.id;
        }
      });
    } else if (this.transferFormAccounts.get('externalDestiny').value) {
      toAccount.id = this.transferFormAccounts.get('externalDestiny').value;
    }

    if (this.transferFormAccounts.get('chargeBearer').value) {
      transfer.chargeBearer = this.transferFormAccounts.get('chargeBearer').value.id;
    }

    transfer.beneficiary = {
      toAccount: toAccount,
      description: this.utilsService.replaceAccentMark(this.transferFormBeneficiary.get('beneficiaryName').value),
      address: this.transferFormBeneficiary.get('beneficiaryAddress').value,
      city: this.transferFormBeneficiary.get('beneficiaryProvince').value,
      country: this.transferFormBeneficiary.get('beneficiaryCountry').value,
      email: this.transferFormData.get('email').value,
      entity: {
        country: this.transferFormAccounts.get('externalDestinyCountry').value,
        name: this.transferFormAccounts.get('externalDestinyName').value
      }
    };

    transfer.alias = this.transferFormData.get('favouriteName').value;
    transfer.reason = (this.transferFormData.get('concept').value) ? this.utilsService.replaceAccentMark(this.transferFormData.get('concept').value) : null;
    if (this.transferFormData.get('purposeType').value) {
      transfer.purposeType = this.transferFormData.get('purposeType').value.id;

    }

    if (this.transferFormBeneficiary.get('beneficiaryResident').value) {
      transfer.aditionalInfo = this.transferFormBeneficiary.get('beneficiaryResident').value;
    }
    return transfer;
  }

  canSimulate() {
    // Si se accede desde escritorio
    if (!this.isMobileResolution()) {
      if (this.transferFormData.get('purposeType').value != null) {
        return this.transferFormAccounts.valid && this.transferFormExecution.valid && this.transferFormBeneficiary.valid
          && this.transferFormData.get('concept').valid && this.transferFormData.get('purposeType').valid;
      } else {
        return this.transferFormAccounts.valid && this.transferFormExecution.valid && this.transferFormBeneficiary.valid
          && this.transferFormData.get('concept').valid;
      }
    } else {
      // Si se accede desde un movil que no tenga en cuenta Formdata ya que se rellena en la ultima pantalla
      return this.transferFormAccounts.valid && this.transferFormExecution.valid && this.transferFormBeneficiary.valid;
    }
  }

  simulateTransfer(): any {
    this.validForm = false;
    if (this.canSimulate()) {
      // Periodicas
      if (this.transferFormExecution.get('executionMoment').value === TransferExecutionMoment.S ||
        this.transferFormExecution.get('executionMoment').value === TransferExecutionMoment.P) {
        let transfer: TransferPeriodicNew = this.preparePeriodic();
        this.transferService.postTransferPeriodicSimulate(transfer).subscribe((result: GenericResponse<TransferSimulation>) => {
          this.validForm = true;
          this.simulation = result.data;
          this.transferState.simulation = this.simulation;
        }, () => {
          this.validForm = false;
        });
      } else {
        let transfer: TransferNew = this.prepareTransfer();
        this.transferService.postTransfersSimulate(transfer).subscribe((result: GenericResponse<TransferSimulation>) => {
          this.validForm = true;
          this.simulation = result.data;
          this.transferState.simulation = this.simulation;
        }, () => {
          this.validForm = false;
        });
      }
    } else {
      this.simulation = null;
    }
  }

  applyFormatInput() {
    if (!this.transferFormAccounts.get('amount').invalid) {
      let n = this.transferFormAccounts.get('amount').value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = + n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.transferFormAccounts.get('amount').setValue(n);
    }
  }

  removeSpaceFormat() {
    if (this.transferFormAccounts.get('externalDestiny').value !== null && this.transferFormAccounts.get('externalDestiny').value !== undefined) {
      let value: string = '' + this.transferFormAccounts.get('externalDestiny').value;
      value = value.replace(/\s/g, '');
      this.transferFormAccounts.get('externalDestiny').setValue(value);
    }
  }

  removeSpaceFormatBic() {
    if (this.transferFormAccounts.get('bic').value !== null && this.transferFormAccounts.get('bic').value !== undefined) {
      let value: string = '' + this.transferFormAccounts.get('bic').value;
      value = value.replace(/\s/g, '');
      this.transferFormAccounts.get('bic').setValue(value);
    }
  }

  toUppercase(control: AbstractControl) {
    control.setValue(control.value.toUpperCase());
  }

  validateForms() {
    return this.validForm && this.transferFormAccounts.valid && this.transferFormBeneficiary.valid && this.transferFormExecution.valid && this.transferFormData.valid;
  }

  validStep() {
    // switch (this.transferState.currentStep) {
    //   case 1:
    //     return this.validForm && this.transferFormAccounts.valid && this.transferFormBeneficiary.valid;
    //   case 2:
    //     return this.validForm && this.transferFormExecution.valid;
    //   case 3:
    //     return this.validForm && this.transferFormData.valid;
    //   default:
    //     return false;
    // }

    switch (this.transferState.currentStep) {
      case 1:
        return this.transferFormAccounts.valid && this.transferFormBeneficiary.valid && this.validForm;
      case 2:
        return this.transferFormExecution.valid;
      case 3:
        return this.transferFormData.valid;
      default:
        return false;
    }
  }

  nextStep() {
    if (this.transferState.currentStep === this.transferState.formSteps) {
      this.send();
    } else {
      this.transferState.currentStep++;
    }
  }

  send() {
    this.transferState.transferForms = this.transferForms;
    if (this.transferFormExecution.get('executionMoment').value === TransferExecutionMoment.P ||
      this.transferFormExecution.get('executionMoment').value === TransferExecutionMoment.S) {
      let transfer: TransferPeriodicNew = this.preparePeriodic();
      this.transferState.transfer = null;
      this.transferState.transferPeriodic = transfer;
    } else {
      let transfer: TransferNew = this.prepareTransfer();
      this.transferState.transfer = transfer;
    }
    this.formsCompleted.emit();
  }

  loadFormFromFavourite(transferData: TransferFavouriteOutput) {

    this.reloadInProgress = true;

    let me = this;
    let currency = _.findWhere(this.transferState.currencies, { id: transferData.amount.currency.code });
    // let account = _.findWhere(this.transferState.accounts, { id: transferData.orderer.fromAccount.id });
    let ibanbloque1: string;
    let ibanbloque2: string;
    let ibanbloque3: string;
    let ibanbloque4: string;
    let ibanbloque5: string;
    let ibanbloque6: string;
    let ibanbloque7: string;
    if (transferData.transferMode.id === 'SEPA') {
      if (transferData.beneficiary.toAccount.id) {
        if (transferData.beneficiary.toAccount.id.length > 23) {
          ibanbloque1 = transferData.beneficiary.toAccount.id.substring(0, 4);
          ibanbloque2 = transferData.beneficiary.toAccount.id.substring(4, 8);
          ibanbloque3 = transferData.beneficiary.toAccount.id.substring(8, 12);
          ibanbloque4 = transferData.beneficiary.toAccount.id.substring(12, 16);
          ibanbloque5 = transferData.beneficiary.toAccount.id.substring(16, 20);
          ibanbloque6 = transferData.beneficiary.toAccount.id.substring(20, 24);
          if (transferData.beneficiary.toAccount.id.length > 24) {
            ibanbloque7 = transferData.beneficiary.toAccount.id.substring(24);
          }
        }
      }
    }
    // let accountDestiny = _.findWhere(this.transferState.accounts, { id: transferData.orderer.fromAccount.id });
    // let accountDestiny = _.findWhere(this.transferState.accounts, { id: transferData.orderer.fromAccount.id });
    // let accountDestiny = transferData.beneficiary.toAccount.id;
    let amountFav = '0';
    if (transferData.amount.amount) {
      amountFav = transferData.amount.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    /*let prueba = <AccountsSelectTransfer>{
     id : account.id,
     formats : account.formats,
      currency : account.currency};

      this.transferFormAccounts.controls['ff'].

      let dfd :FormControl;*/

    let originSelected: AccountsSelectTransfer = _.findWhere(this.accountSelectTransfer, { id: transferData.orderer.fromAccount.id });
    let externalDestinyCountrySelected = this.transferState.beneficiaryCountriesInternational[0];
    if (transferData.beneficiary.entity.country) {
      externalDestinyCountrySelected = _.findWhere(this.transferState.beneficiaryCountriesInternational, { id: transferData.beneficiary.entity.country.id });
    }
    this.transferFormAccounts.setValue({
      origin: originSelected ? originSelected : null,
      amount: amountFav,
      externalDestiny: (transferData.beneficiary.toAccount.formats) ? me.formatAccountPipe.transform(transferData.beneficiary.toAccount.formats, this.accountFormatView) : null,
      externalDestinyName: (transferData.beneficiary.entity.name) ? transferData.beneficiary.entity.name : null,
      externalDestinyCountry: (externalDestinyCountrySelected) ? externalDestinyCountrySelected : null,
      ibanbloque1: (ibanbloque1) ? ibanbloque1 : null,
      ibanbloque2: (ibanbloque2) ? ibanbloque2 : null,
      ibanbloque3: (ibanbloque3) ? ibanbloque3 : null,
      ibanbloque4: (ibanbloque4) ? ibanbloque4 : null,
      ibanbloque5: (ibanbloque5) ? ibanbloque5 : null,
      ibanbloque6: (ibanbloque6) ? ibanbloque6 : null,
      ibanbloque7: (ibanbloque7) ? ibanbloque7 : null,
      accountDestiny: '',
      currency: (currency) ? currency : this.defaultCurrency,
      bic: (transferData.beneficiary.toAccount.swift) ? transferData.beneficiary.toAccount.swift : null,
      transferMode: (transferData.transferMode.id) ? transferData.transferMode.id : null,
      executionType: TransferExecutionType.S,
      chargeBearer: (this.transferState.chargeBearer) ? this.transferState.chargeBearer[0] : null
    });

    let beneficiaryCountrySelected = this.transferState.beneficiaryCountriesInternational[0];
    if (transferData.beneficiary.country) {
      beneficiaryCountrySelected = _.findWhere(this.transferState.beneficiaryCountriesInternational, { id: transferData.beneficiary.country.id });
    }
    this.transferFormBeneficiary.setValue({
      beneficiaryName: (transferData.beneficiary.description) ? transferData.beneficiary.description : null,
      beneficiaryAddress: (transferData.beneficiary.address) ? transferData.beneficiary.address : null,
      beneficiaryProvince: (transferData.beneficiary.city) ? transferData.beneficiary.address : null,
      beneficiaryCountry: (beneficiaryCountrySelected) ? beneficiaryCountrySelected : null,
      beneficiaryResident: (transferData.aditionalInfo) ? transferData.aditionalInfo : null,
    });

    this.transferFormExecution.setValue({
      frequencyType: null,
      executionDate: null,
      firstExecutionDate: null,
      lastExecutionDate: null,
      executionMoment: TransferExecutionMoment.N,
      periodicUndefined: false
    });

    let purposeTypeSelected = _.findWhere(this.transferState.purposeTypes, { id: transferData.purposeType });
    this.transferFormData.setValue({
      concept: (transferData.reason) ? transferData.reason.substring(0, 30) : null,
      purposeType: (purposeTypeSelected) ? purposeTypeSelected : null,
      email: (transferData.beneficiary.email) ? transferData.beneficiary.email : null,
      favouriteName: null
    });

    this.removeSpaceFormat();
    this.addCustomValidators();
    this.applyFormatInput();

    this.reloadInProgress = false;
  }

  groupValidationSearch(): ValidatorFn {
    let result = (group: FormGroup): { [key: string]: boolean } | null => {

      let firstExecutionDate = group.get('firstExecutionDate').value;
      let lastExecutionDate = group.get('lastExecutionDate').value;

      firstExecutionDate = Number(moment(firstExecutionDate).format('YYYYMMDD'));
      if (firstExecutionDate !== undefined && lastExecutionDate !== undefined && firstExecutionDate !== null && lastExecutionDate !== null && firstExecutionDate !== '' && lastExecutionDate !== '') {
        lastExecutionDate = Number(moment(lastExecutionDate).format('YYYYMMDD'));
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

  ngOnDestroy(): void {
    this.unLoadSubscriptionFormSimulate();
  }

}
