import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { defineLocale } from 'ngx-bootstrap/bs-moment';
// import { es } from 'ngx-bootstrap/locale';
import { UtilsService, AppConfigService } from 'onesait-core';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('es', esLocale);

export interface ListSearchOptions {
  label: string;
  type: string;
  id: string;
  range?: number;
  model?: any;
  modelDefault?: string;
  required?: boolean;
  disabled?: boolean;
  selectlable?: boolean;
  isNull?: boolean;
  placeholder?: string;
}

export interface CleanConfig { refreshClean: boolean; }
export interface InitConfig { runStart: boolean; }

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html'
})

export class ListSearchComponent implements OnInit {

  @Input() searchForm: ListSearchOptions[];
  @Input() cleanConfig: CleanConfig = { refreshClean: true };
  @Input() initConfig: InitConfig = { runStart: false };
  @Input() getResp: any;

  @Output() applyFilters: EventEmitter<any> = new EventEmitter<any>();
  @Output() showApplyFilters: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() btnOk: EventEmitter<any> = new EventEmitter<any>();


  searchFormOriginal: ListSearchOptions[];
  searchparams: any;
  view = 'inputs';
  filterApply = false;
  _continue = true;
  _existRange = false;
  _invalidRange = false;
  _rangeOk = true;
  bsConfig: any;
  _permis: any;
  _msgValor: boolean;
  _msg: any;


  public today: Date = new Date();
  public dateFrom: Date = new Date();
  public dateTo: Date = new Date();
  public rangeDays: number;

  constructor(
    protected utilsService: UtilsService,
    appConfigService: AppConfigService
  ) {
    this.bsConfig = appConfigService.getConfig().bsDatepicker.bsConfig;
  }
  // constructor(protected utilsService:UtilsService, private bsLocaleService: BsLocaleService) {
  //   esLocale.invalidDate = '';
  //   defineLocale('custom locale', esLocale);
  //   this.bsLocaleService.use('custom locale');

  // }

  ngOnInit() {
    this.initValues();
    if (this.initConfig.runStart) {
      this.search();
    }
    this._continue = true;
    this._permis = '';
  }

  initValues() {
    this.searchFormOriginal = [];
    this.searchForm.forEach(element => {
      switch (element.type) {
        case 'select':
          element.model = (element.modelDefault) ? element.modelDefault : undefined;
          break;
        case 'date':
          // - Rellenamos fechas
          switch (element.id) {
            case 'dateFrom':
              if (element.isNull) {
                element.model = undefined;
              } else {
                element.model = (element.model) ? element.model : this.dateFrom;
              }
              break;
            case 'dateTo':
              if (element.range) {
                this.rangeDays = element.range;
                this.dateTo.setDate(this.today.getDate() + this.rangeDays);
                element.model = this.dateTo;
                this._existRange = true;
              } else {
                if (element.isNull) {
                  element.model = undefined;
                } else {
                  element.model = (element.model) ? element.model : this.dateTo;
                }
              }
              break;
            case 'dateFromH':
              if (element.range) {
                this.rangeDays = element.range;
                this.dateFrom.setDate(this.today.getDate() - this.rangeDays);
                this._existRange = true;
              }
              element.model = (element.model) ? element.model : this.dateFrom;
              break;

            case 'dateToH':
              element.model = (element.model) ? element.model : this.dateTo;
              break;
          }
          break;
      }
    });
    this.searchFormOriginal = this.utilsService.cloneObjectAssignArr(this.searchForm);
  }

  search() {
    this._continue = true;

    let existDateFrom = false,
      existDateTo = false;
    let compDateFrom = null,
      compDateTo = null;


    this.searchparams = {};
    this.searchForm.forEach((element: any) => {
      if (element.model) {
        if (element.type === 'date') {
          switch (element.id) {
            case 'dateFromH':
              // -console.log("1. element.id: " + element.id + " element.model: " + element.model  );
              existDateFrom = true;
              compDateFrom = new Date(element.model).getTime();
              break;
            case 'dateToH':
              // -console.log("2. element.id: " + element.id + " element.model: " + element.model  );
              if (element.range) { this._existRange = true; }
              existDateTo = true;
              compDateTo = new Date(element.model).getTime();
              break;
          }
        }
        if (element.type === 'select') {
          if (element.option.value) {
            this.searchparams[element.id] = element.model[element.option.value];
          } else {
            this.searchparams[element.id] = element.model.id;
          }
        } else {
          this.searchparams[element.id] = element.model;
        }
      }
    });

    if (existDateFrom && existDateTo) {
      // -console.log("Existen desde" + compDateFrom + " y hasta " + compDateTo);
      this._invalidRange = false;
      if (compDateFrom > compDateTo) {
        this._continue = false;
        this._invalidRange = true;
      } else {
        if (this._existRange) {
          // Set the unit values in milliseconds.
          let msecPerDay = 1000 * 60 * 60 * 24;
          let rangeMsec = msecPerDay * (this.rangeDays + 1);

          // Comprobamos que la fecha seleccionada esta dentro del rango
          if ((compDateFrom + rangeMsec) < compDateTo) {
            this._rangeOk = false;
            this._continue = false;
          }
        }
      }
    }

    if (this._continue) {
      this.view = 'filters';
      this.applyFilters.emit(this.searchparams);
      this.filterApply = true;
      this.showApplyFilters.emit(this.filterApply);
    }
  }

  onChangeSelect(anyThing: any) {
    // console.log("emitimos model select: " + anyThing.model);

    if (anyThing.type === 'date') {
      if (anyThing.model === 'Invalid Date' || anyThing.model === '') {
        this.searchForm.forEach(element => {
          if (element.id === anyThing.id && element.id === 'dateFromH') {
            let y = new Date();
            y.setDate(y.getDate() - 1);
            element.model = y;
            this._msg = '  Formato de fecha incorrecto ';
            this._msgValor = true;
          }
          if (element.id === anyThing.id && element.id === 'dateToH') {
            element.model = new Date();
            this._msgValor = false;
          }
        });
        this._continue = false;
      } else {
        this._continue = true;
        this._msgValor = false;
      }
    }
    this.selectChange.emit(anyThing);
  }

  clean() {
    this.view = 'inputs';
    while (this.searchForm.length) {
      this.searchForm.pop();
    }

    let me = this;
    this.searchFormOriginal.forEach((element: any) => {
      let elem: any = me.utilsService.cloneObject(element);
      this.searchForm.push(elem);
    });

    this.filterApply = false;
    this.showApplyFilters.emit(this.filterApply);
    if (this.cleanConfig.refreshClean) {
      this.search();
    }
  }

  ok(buyerCbu: any) {
    // let buyerCbu=document.getElementsByName("buyerCbu");
    this.btnOk.emit(buyerCbu);
    console.log(this.getResp);
  }



}
