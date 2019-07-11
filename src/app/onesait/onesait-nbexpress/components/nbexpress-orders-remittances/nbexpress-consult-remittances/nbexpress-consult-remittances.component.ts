import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { List, SearchConfig, SEARCH_CONFIG_TYPE, NBExpressBillService, UtilsService } from 'onesait-core';
import { ConfirmingStatusTypes, ConfirmingRemittances } from 'onesait-api';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'osb-nbexpress-consult-remittances',
  templateUrl: './nbexpress-consult-remittances.component.html'
})
export class NbExpressConsultRemittancesComponent implements OnInit, OnChanges {

  @Input() statusTypes: ConfirmingStatusTypes[];
  @Input() contractId: string;
  @Output() viewOrderDetail = new EventEmitter();

  protected listRemittancesObservable: any;
  protected listRemittances: List;
  remittances: ConfirmingRemittances[];
  statusRemittances: ConfirmingStatusTypes[];
  remittancesIncidents: number[];

  loading: boolean;
  showingLastRemittances: boolean;
  consultRemittancesForm: FormGroup;
  consultRemittancesFormFormatted: FormGroup;
  formConfig: SearchConfig;

  hasMoreData: boolean;

  currencySymbol = '€';
  // variables para almacenar las cantidades en filtro de busqueda con formato importe
  amountFrom: string;
  amountTo: string;

  constructor(private nbExpresBillService: NBExpressBillService,
    private utilsService: UtilsService) {
    this.remittancesIncidents = [];
    this.showingLastRemittances = true;
    this.createFormControl();
    this.listRemittances = new List(this.nbExpresBillService, 'getRemittances');
  }

  ngOnInit() {
    this.prepareSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contractId) {
      this.listRemittances.reset();
      this.next();
    }
  }

  createFormControl() {
    this.consultRemittancesForm = new FormGroup({
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      amountFrom: new FormControl(''),
      amountTo: new FormControl(''),
      state: new FormControl('')
    });
    this.consultRemittancesFormFormatted = new FormGroup({
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      amountFrom: new FormControl('', this.amountValidator),
      amountTo: new FormControl('', this.amountValidator),
      concept: new FormControl(''),
      status: new FormControl(''),
    });
  }
  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let rf = new RegExp(/^(\d{1,3}(\.\d{3})*|(\d+))(\,\d{0,2})?$/);
    if (control.value !== undefined && control.value !== null && control.value !== '') {
      let value: string = '' + control.value;
      if (!rf.test(value)) {
        rf = new RegExp(/^[\d]+[\.][\d]{2}$/);
        if (!rf.test(value)) {
          return { 'invalidAmount': true };
        }
      }
      let valueN = +value.replace(/\./g, '').replace(/\,/g, '.');
      if (isNaN(valueN)) { return { 'invalidAmount': true }; }
    }
    return null;
  }

  consultRemittances(): void {
    let consultRemittances = true;
    let emptyFormRemittances = false;
    this.listRemittances.reset();

    if ((!this.consultRemittancesForm.value.dateFrom && !this.consultRemittancesForm.value.dateTo)
      && (!this.consultRemittancesForm.value.amountFrom || this.consultRemittancesForm.value.amountFrom == null)
      && (!this.consultRemittancesForm.value.amountTo || this.consultRemittancesForm.value.amountTo == null) && (!this.consultRemittancesForm.value.state)) {
      if (this.showingLastRemittances) {
        consultRemittances = false;
      }
      emptyFormRemittances = true;
    }

    if (consultRemittances) {
      if (emptyFormRemittances) {
        this.showingLastRemittances = true;
      } else {
        this.showingLastRemittances = false;
      }
      this.consultRemittancesFormFormatted = this.utilsService.cloneAbstractControl(this.consultRemittancesForm);

      if (this.consultRemittancesForm.value.dateFrom) {
        this.consultRemittancesFormFormatted.get('dateFrom').setValue(moment(this.consultRemittancesForm.value.dateFrom).format('YYYY-MM-DD'));
      }
      if (this.consultRemittancesForm.value.dateTo) {
        this.consultRemittancesFormFormatted.get('dateTo').setValue(moment(this.consultRemittancesForm.value.dateTo).format('YYYY-MM-DD'));
      }
      this.prepareAmounts();
      this.next();
    }
  }

  next() {
    let args = [];
    if (this.consultRemittancesFormFormatted) {
      args = [this.contractId, this.consultRemittancesFormFormatted.value];
    } else {
      args = [this.contractId, this.consultRemittancesForm.value];
    }
    if (this.listRemittancesObservable) {
      this.listRemittancesObservable.unsubscribe();
    }
    if (this.listRemittancesObservable) {
      this.listRemittancesObservable.unsubscribe();
    }
    this.loading = true;
    this.listRemittancesObservable = this.listRemittances.next(args).subscribe(this.successRemittances, this.errorRemittances);
  }

  private successRemittances = (myResult) => {
    this.loading = false;
    this.remittances = myResult.data;
    if (this.remittances) {
      this.showIncidents(myResult.data);
    }
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorRemittances = (error) => {
    this.loading = false;
    console.log(error);
  }
  //Funcion para mandar cantidades formateadas como importe (se elimina. de miles y la , es un .)
  prepareAmounts() {
    let amount = this.consultRemittancesForm.get('amountFrom').value;
    if (amount && amount !== null && amount !== '') {
      this.amountFrom = this.consultRemittancesForm.get('amountFrom').value;
      amount = amount.replace(/\./g, '').replace(/,/g, '.');
      this.consultRemittancesFormFormatted.get('amountFrom').setValue(amount);
    }

    amount = this.consultRemittancesForm.get('amountTo').value;
    if (amount && amount !== null && amount !== '') {
      this.amountTo = this.consultRemittancesForm.get('amountTo').value;
      amount = amount.replace(/\./g, '').replace(/,/g, '.');
      this.consultRemittancesFormFormatted.get('amountTo').setValue(amount);
    }
  }
  showIncidents(result: ConfirmingRemittances[]) {
    let sum: number;
    for (let rem of result) {
      sum = 0;
      sum += rem.numOfRejectedOrders;
      sum += rem.numOfDeniedOrders;
      this.remittancesIncidents.push(sum);
    }
  }

  viewOrder(remittance: ConfirmingRemittances) {
    this.viewOrderDetail.emit(remittance);
  }


  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonDivClass = 'hidden-md col-xs-12 col-sm-3 mb-1 mt-1';
    this.formConfig.formsControl = [

      {
        type: SEARCH_CONFIG_TYPE.AMOUNT,
        labelDiv: 'ONESAIT-CONFIRMING.ORDERS-REMITTANCES.ORDERS.AMOUNT', //Texto para sustituir a la propiedad label (para meter texto mas largo que el ancho del campo)
        labelDivClass: 'col-sm-6 col-md-4', //clase de labelDiv (se debe construir una fila con todos los labelDiv, si no, se descuadran el resto de campos)
        class: 'col-xs-6 col-sm-3 col-md-2 mt-5',
        formControlName: 'amountFrom',
        placeholder: 'COMMON.FROM',
        textToImport: true
      },
      {
        type: SEARCH_CONFIG_TYPE.AMOUNT,
        class: 'col-xs-6 col-sm-3 col-md-2 mt-5',
        formControlName: 'amountTo',
        placeholder: 'COMMON.TO',
        textToImport: true
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        labelDiv: 'ONESAIT-NB-EXPRESS.ORDERS-REMITTANCES.ORDERS.EXPIRATION-DATE',
        labelDivClass: 'col-sm-6 col-md-4 ',
        class: 'col-xs-6 col-sm-3 col-md-2 mt-5',
        formControlName: 'dateFrom',
        placeholder: 'COMMON.FROM'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        class: 'col-xs-6 col-sm-3 col-md-2 mt-5',
        formControlName: 'dateTo',
        placeholder: 'COMMON.TO'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-NB-EXPRESS.ORDERS-REMITTANCES.REMITTANCES.STATE',
        labelDiv: 'ONESAIT-CONFIRMING.ORDERS-REMITTANCES.REMITTANCES.STATE',
        labelDivClass: 'hidden-sm col-sm-2 col-md-4',
        labelClass: 'hidden-md',
        class: 'col-xs-12 col-sm-3 col-md-4 mt-5',
        formControlName: 'state',
        elements: this.statusTypes,
        selectText: 'name',
        selectValue: 'id'
      }
    ];
  }


}
