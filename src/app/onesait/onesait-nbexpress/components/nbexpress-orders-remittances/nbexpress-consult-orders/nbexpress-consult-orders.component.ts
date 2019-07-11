import { Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { List, ShareService, SEARCH_CONFIG_TYPE, SearchConfig, NBExpressBillService, UtilsService } from 'onesait-core';
import { ConfirmingStatusTypes, ConfirmingOrders } from 'onesait-api';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'osb-nbexpress-consult-orders',
  templateUrl: './nbexpress-consult-orders.component.html'
})
export class NbExpressConsultOrdersComponent implements OnInit, OnChanges {

  @Input() statusTypes: ConfirmingStatusTypes[];
  @Input() remittanceId: String;
  @Input() contractId: string;
  filterOrders: string;

  protected listOrdersObservable: any;
  protected listOrders: List;
  orders: ConfirmingOrders[];

  loading: boolean;
  showingLastOrders: boolean;

  consultOrdersForm: FormGroup;
  consultOrdersFormFormatted: FormGroup;
  formConfig: SearchConfig;

  hasMoreData: boolean;
  currencySymbol = '€';

  // variables para almacenar las cantidades en filtro de busqueda con formato importe
  amountFrom: string;
  amountTo: string;

  constructor(private nbExpresBillService: NBExpressBillService,
    private shareService: ShareService,
    private utilsService: UtilsService) {

    this.showingLastOrders = true;
    this.createFormControl();
    this.listOrders = new List(this.nbExpresBillService, 'getOrders');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contractId) {
      this.filterOrdersContract();
      this.resetList();
    } else if (changes.remittanceId) {
      this.resetList();
    } else if (changes.statusTypes) {
      this.prepareSearch();
    }
  }

  ngOnInit() {
    this.prepareSearch();
  }

  createFormControl() {
    this.consultOrdersForm = new FormGroup({
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      amountFrom: new FormControl(''),
      amountTo: new FormControl(''),
      concept: new FormControl(''),
      status: new FormControl(''),
    });
    this.consultOrdersFormFormatted = new FormGroup({
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

  filterOrdersContract() {
    this.filterOrders = this.shareService.getDataAndClear('filterOrders');
    if (this.filterOrders) {
      if (this.filterOrders === 'advance') {
        console.log('Se filtran ordenes anticipadas');
        // Asignar al combo el estado de la orden anticipada
        // this.consultOrdersForm.value.status = [código de anticipada]];

      } else {
        console.log('Se filtran ordenes vivas');
        // Asignar al combo el estado de la orden viva (si existe) o filtrar las órdenes que no se consideren vivas en el listado obtenido
        // this.consultOrdersForm.value.status = [código de viva];
      }
    }
  }

  consultOrders(): void {
    let consultOrders = true;
    let emptyFormOrders = false;
    this.listOrders.reset();

    if ((!this.consultOrdersForm.value.dateFrom && !this.consultOrdersForm.value.dateTo)
      && (!this.consultOrdersForm.value.amountFrom || this.consultOrdersForm.value.amountFrom == null)
      && (!this.consultOrdersForm.value.amountTo || this.consultOrdersForm.value.amountTo == null) && (!this.consultOrdersForm.value.status)) {
      if (this.showingLastOrders) {
        consultOrders = false;
      }
      emptyFormOrders = true;
    }

    if (consultOrders) {
      if (emptyFormOrders) {
        this.showingLastOrders = true;
      } else {
        this.showingLastOrders = false;
      }
      this.consultOrdersFormFormatted = this.utilsService.cloneAbstractControl(this.consultOrdersForm);

      if (this.consultOrdersForm.value.dateFrom) {
        this.consultOrdersFormFormatted.get('dateFrom').setValue(moment(this.consultOrdersForm.value.dateFrom).format('YYYY-MM-DD'));
      }
      if (this.consultOrdersForm.value.dateTo) {
        this.consultOrdersFormFormatted.get('dateTo').setValue(moment(this.consultOrdersForm.value.dateTo).format('YYYY-MM-DD'));
      }
      if (this.filterOrders) {
        this.filterOrders = '';
      }
      this.prepareAmounts();
      this.next();
    }
  }

  resetList() {
    this.listOrders.reset();
    this.next();
  }

  next() {
    let args = [];
    if (this.consultOrdersFormFormatted) {
      args = [this.contractId, this.consultOrdersFormFormatted.value, this.remittanceId];
    } else {
      args = [this.contractId, this.consultOrdersForm.value, this.remittanceId];
    }

    if (this.listOrdersObservable) {
      this.listOrdersObservable.unsubscribe();
    }
    this.loading = true;
    this.listOrdersObservable = this.listOrders.next(args).subscribe(this.successOrders, this.errorOrders);
  }

  private successOrders = (myResult) => {
    this.loading = false;
    this.orders = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorOrders = (error) => {
    this.loading = false;
    console.log(error);
  }

  //Funcion para mandar cantidades formateadas como importe (se elimina. de miles y la , es un .)
  prepareAmounts() {
    let amount = this.consultOrdersForm.get('amountFrom').value;
    if (amount && amount !== null && amount !== '') {
      this.amountFrom = this.consultOrdersForm.get('amountFrom').value;
      amount = amount.replace(/\./g, '').replace(/,/g, '.');
      this.consultOrdersFormFormatted.get('amountFrom').setValue(amount);
    }

    amount = this.consultOrdersForm.get('amountTo').value;
    if (amount && amount !== null && amount !== '') {
      this.amountTo = this.consultOrdersForm.get('amountTo').value;
      amount = amount.replace(/\./g, '').replace(/,/g, '.');
      this.consultOrdersFormFormatted.get('amountTo').setValue(amount);
    }
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonFloatRight = true;
    this.formConfig.buttonDivClass = 'hidden-md col-xs-12 col-sm-3 mb-1 mt-1';
    this.formConfig.formsControl = [

      {
        type: SEARCH_CONFIG_TYPE.AMOUNT,
        labelDiv: 'ONESAIT-CONFIRMING.ORDERS-REMITTANCES.ORDERS.AMOUNT', //Texto para sustituir a la propiedad label (para meter texto mas largo que el ancho del campo)
        labelDivClass: 'col-sm-6 col-md-4', //clase de labelDiv (se debe construir una fila con todos los labelDiv, si no, se descuadran el resto de campos)
        class: 'col-xs-6 col-sm-3 col-md-2 mt-5',
        formControlName: 'amountFrom',
        placeholder: 'COMMON.FROM',
        textToImport: true,
      },
      {
        type: SEARCH_CONFIG_TYPE.AMOUNT,
        class: 'col-xs-6 col-sm-3 col-md-2 mt-5',
        formControlName: 'amountTo',
        placeholder: 'COMMON.TO',
        textToImport: true,
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
        type: SEARCH_CONFIG_TYPE.TEXT,
        label: 'ONESAIT-NB-EXPRESS.ORDERS-REMITTANCES.ORDERS.CONCEPT',
        labelDiv: 'ONESAIT-CONFIRMING.ORDERS-REMITTANCES.ORDERS.CONCEPT',
        labelDivClass: 'hidden-sm col-sm-3 col-md-2',
        labelClass: 'hidden-md', //necesario si se usan labelDiv que ocupan más de una fila en tablet por ejemplo
        class: 'col-xs-12 col-sm-3 col-md-2 mt-5',
        formControlName: 'concept'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-NB-EXPRESS.ORDERS-REMITTANCES.ORDERS.STATE',
        labelClass: 'hidden-md',
        labelDiv: 'ONESAIT-CONFIRMING.ORDERS-REMITTANCES.ORDERS.STATE',
        labelDivClass: 'hidden-sm col-sm-3 col-md-2',
        class: 'col-xs-12 col-sm-3 col-md-2 mt-5',
        formControlName: 'status',
        elements: this.statusTypes,
        selectText: 'name',
        selectValue: 'id'
      }
    ];
  }
}
