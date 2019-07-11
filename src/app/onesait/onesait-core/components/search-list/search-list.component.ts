import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchConfig, SEARCH_CONFIG_TYPE } from '../../models/classes/page-config';
import { InputValidatorOptions } from '../input-validator/input-validator.component';
import * as _ from 'underscore';

@Component({
  selector: 'osb-search-list',
  templateUrl: './search-list.component.html'
})

export class SearchListComponent implements OnInit, AfterViewInit {


  @ViewChild('formGR', { read: FormGroup }) myForm: FormGroup;

  @Input()
  formGroup: FormGroup;

  @Output()
  search: EventEmitter<any> = new EventEmitter<any>();

  // output opcional para detectar evento de cambio en select con propiedad selectChange habilitada
  @Output()
  selectChange?: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  formConfig: SearchConfig;

  @Input()
  opts: InputValidatorOptions;

  SEARCH_CONFIG_TYPE = SEARCH_CONFIG_TYPE;

  showMobileSearcher: boolean;

  buttonContainer: string;

  constructor() {
    this.buttonContainer = 'col-xs-12 col-sm-3 col-md-3 mb-1 mt-1';
  }

  ngOnInit() {
    if (this.formConfig.buttonDivClass) {
      this.buttonContainer = this.formConfig.buttonDivClass;
    }
  }

  ngAfterViewInit(): void {

  }

  execSearch() {
    this.showMobileSearcher = false;
    this.search.emit(this.formGroup);
  }

  selectChangeEvent(event: any) {
    this.selectChange.emit(event);
  }

  open() {
    this.showMobileSearcher = true;
  }

  close() {
    this.showMobileSearcher = false;
  }

  blurFunction(formName: string) {
    //Texto a formato importe
    if ((_.findWhere(this.formConfig.formsControl, { formControlName: formName })).textToImport) {
      if (!this.formGroup.get(formName).invalid) {
        let n = this.formGroup.get(formName).value;
        if (n !== '') {
          n = n.replace(/\./g, '');
          n = n.replace(/,/g, '.');
          n = + n;
          n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.formGroup.get(formName).setValue(n);
        }
      }
    }
  }

}
