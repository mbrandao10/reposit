import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SearchConfig, SEARCH_CONFIG_TYPE, List, AccountService, TaxesService } from 'onesait-core';
import { GenericListResponse, TaxConsultTaxes, AccountElement, TaxPaymentType } from 'onesait-api';
import * as _moment from 'moment';
const moment = _moment;

enum ORGANISMS {
  AEAT = 'aeat',
  TGSS = 'tgss'
}

@Component({
  selector: 'osb-tax-inquiry',
  templateUrl: './inquiry.component.html'
})
export class InquiryComponent implements OnInit {

  organisms = ORGANISMS;

  formConfig: SearchConfig;

  showingLastMovements: boolean;
  loading: boolean;
  consulted: boolean;

  consultMovementsForm: FormGroup;

  protected listAeats: List;
  protected listAeatsObservable: any;

  aeatMovements: GenericListResponse<TaxConsultTaxes>;
  accounts: AccountElement[];
  movementType: TaxPaymentType[];

  hasMoreData: boolean;

  constructor(private accountService: AccountService,
    private taxesService: TaxesService) {

    this.listAeats = new List(this.taxesService, 'getConsultTaxes');
    this.consulted = false;
  }

  ngOnInit() {
    this.prepareSearch();
    this.showingLastMovements = true;

    // Cambiar por método que llama a servicio y devuelva lsta de tipos de movimiento
    this.movementType = [{ id: '', name: 'Todos' }, { id: 'income', name: 'Ingreso' }, { id: 'refund', name: 'Devolución' }];

    this.createFormControl();
    this.getAccounts();
  }

  getAccounts(): void {
    this.loading = true;
    this.accountService.getAccounts().subscribe(result => {
      this.loading = false;
      this.accounts = result.data;
      this.consultMovementsForm.patchValue({ account: this.accounts[0].id });
      this.prepareSearch();
    }, () => this.loading = false);
  }

  createFormControl(): void {
    this.consultMovementsForm = new FormGroup({
      account: new FormControl(''),
      movementType: new FormControl(''),
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
    });
  }

  prepareSearch(): void { 
    this.formConfig = new SearchConfig();
    this.formConfig.buttonDivClass = 'hidden-md col-xs-12 col-sm-3 mb-1 mt-1';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-TAXES.INQUIRYS.ACCOUNT',
        class: 'col-xs-8 col-sm-8 col-md-3',
        formControlName: 'account',
        elements: this.accounts,
        selectText: 'id',
        selectValue: 'id'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-TAXES.INQUIRYS.TYPE',
        class: 'col-xs-4 col-sm-4 col-md-3',
        formControlName: 'movementType',
        elements: this.movementType,
        selectText: 'name',
        selectValue: 'id'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.FROM',
        class: 'col-xs-6 col-sm-4 col-md-3',
        formControlName: 'dateFrom'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.TO',
        class: 'col-xs-6 col-sm-4 col-md-3',
        formControlName: 'dateTo'
      }
    ];
  }

  consultMovements(): void {
    let consultMovements = true;
    let emptyFormInvoices = false;

    if (!this.consultMovementsForm.value.account) {
      consultMovements = false;
    }
    if ((!this.consultMovementsForm.value.movementType) && (!this.consultMovementsForm.value.dateFrom) && (!this.consultMovementsForm.value.dateTo)) {
      emptyFormInvoices = true;
    }

    if (consultMovements) {
      this.consulted = true;
      if (emptyFormInvoices) {
        this.showingLastMovements = true;
      } else {
        this.showingLastMovements = false;
        if (this.consultMovementsForm.value.dateFrom) {
          this.consultMovementsForm.value.dateFrom = moment(this.consultMovementsForm.value.dateFrom).format('YYYY-MM-DD');
        }
        if (this.consultMovementsForm.value.dateTo) {
          this.consultMovementsForm.value.dateTo = moment(this.consultMovementsForm.value.dateTo).format('YYYY-MM-DD');
        }
      }
      this.resetList();
    }
  }

  resetList() {
    this.listAeats.reset();
    this.next();
  }

  next(): void {
    let args = [this.organisms.AEAT, this.consultMovementsForm.value];

    if (this.listAeatsObservable) {
      this.listAeatsObservable.unsubscribe();
    }
    this.loading = true;
    this.listAeatsObservable = this.listAeats.next(args).subscribe(this.successAeats, this.errorAeats);
  }

  private successAeats = (myResult) => {
    this.loading = false;
    this.aeatMovements = myResult;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorAeats = (error) => {
    this.loading = false;
    console.log(error);
  }

}
