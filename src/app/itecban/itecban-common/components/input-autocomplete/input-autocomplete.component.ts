import { Component, OnInit, EventEmitter, Input, Output, OnChanges, ElementRef, ChangeDetectorRef, SimpleChanges, AfterViewChecked, AfterViewInit } from '@angular/core';
import { UtilsService } from 'onesait-core';
import * as _ from 'underscore';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html'
})
export class InputAutocompleteComponent implements OnInit, OnChanges, AfterViewChecked, AfterViewInit {

  @Input() type: any;
  @Input() citySelected: any;
  @Input() cities: any;
  @Input() provinceSelected: any;
  @Input() provinces: any;
  @Input() disabledCmb: any;

  @Output() idSelectedEvent = new EventEmitter();
  @Output() idSelectedEventValid = new EventEmitter();

  item: any = {};

  typeCity = 'CITY';
  typeProvince = 'PROVINCE';

  citiesOrig: any;
  provincesOrig: any;

  citiesByProvince: any;
  inputIsValid: any = {};
  list: any;
  // query: any = '';
  filteredList: any = [];
  filteredListValidate: any = [];
  showList = true;
  elementRef: any;

  constructor(
    myElement: ElementRef,
    private utilsService: UtilsService,
    private cdRef: ChangeDetectorRef) {
    this.elementRef = myElement;
  }


  ngOnInit() {
    // console.log("PROVINCIA  " , this.type);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.type === this.typeProvince && this.provinceSelected !== undefined) {
      if (changes.provinceSelected) {
        let curVal = JSON.stringify(changes.provinceSelected.currentValue);
        let prevVal = JSON.stringify(changes.provinceSelected.previousValue);
        if (curVal !== prevVal) {
          this.init();
          this.filter();
        }
      }

    }
    // this.citiesByProvince = _.groupBy(this.cities, function(elem:any){ return elem.idProvince; });
    if (this.type === this.typeCity && this.citySelected !== undefined) {
      if (changes.citySelected) {
        let curVal = JSON.stringify(changes.citySelected.currentValue);
        let prevVal = JSON.stringify(changes.citySelected.previousValue);
        if (curVal !== prevVal) {
          this.init();
          this.filter();
        }
      }
    }
  }

  init() {
    switch (this.type) {
      case this.typeProvince:
        this.item = (this.provinceSelected) ? this.provinceSelected : null;
        // this.query = (this.provinceSelected)?this.provinceSelected:"";
        break;
      case this.typeCity:
        this.item = (this.citySelected) ? this.citySelected : null;
        // this.query = (this.citySelected)?this.citySelected:"";
        break;
    }
    // console.log(this.item);
  }


  filterScreen() {
    // Busca a cuando ya hemos escrito un caracter
    if (this.item.name.length > 1) {
      this.filter();
    } else {
      this.filteredList = [];
    }
  }

  filter() {
    this.list = [];
    this.showList = true;
    // console.log(" DENTRO DE FILTERSCREEN ",this.item.name);
    switch (this.type) {
      case this.typeProvince:
      this.list = this.utilsService.cloneObject(this.provinces);
      break;
      // Si se estรก modificando una ciudad y se tiene seleccionada una provincia se filtran las ciudades
      case this.typeCity:
      if (this.provinceSelected !== undefined && this.provinceSelected.name.trim() !== '') {
        let provinceSelected = this.provinceSelected;
        let provinceFinded = _.find(this.provincesOrig, function (elem: any) {
          return (elem.name.toLowerCase() === provinceSelected.name.toLowerCase()) ? elem : '';
        });
        if (provinceFinded) { this.list = this.citiesByProvince[provinceFinded.id]; }
      }
      break;
    }
    if (this.item.name !== '' && this.list && this.provinces.length > 0) {
      let list: any = [];
      list = this.provinces.filter(function (elem: any) {
        return elem.name.toLowerCase().indexOf(this.item.name.toLowerCase()) > -1;
      }.bind(this));
      if (list.length === 1 && list[0].name.toLowerCase() === this.item.name.toLowerCase()) {
        this.item = list[0];
        this.showList = false;
      }
      this.filteredList = list.slice(0, 10);
    } else {
      this.filteredList = [];
    }
    this.filteredListValidate = this.utilsService.cloneObject(this.filteredList);
    this.idSelectedEvent.emit(this.item);
  }

  select(item: any) {
    this.item.id = item.id;
    this.item.name = item.name;
    this.filteredList = [];
    this.idSelectedEvent.emit(this.item);
  }

  // @HostListener('click', ['$event.target'])
  handleClick(event) {
    // console.log("EVENTO: ", event);
    let clickedComponent = event.target;
    do {
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    this.filteredList = [];
  }

  isValid(valid: any) {
    this.inputIsValid = valid;
    this.idSelectedEventValid.emit(valid);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.citiesByProvince = _.groupBy(this.cities, function (elem: any) { return elem.idProvince; });
    this.citiesOrig = this.utilsService.cloneObject(this.cities);
    this.provincesOrig = this.utilsService.cloneObject(this.provinces);
  }

}


