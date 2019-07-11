import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ConditionsElement } from 'itecban-common';

@Component({
selector: 'app-card-conditions',
templateUrl: './card-conditions.component.html'
})
export class CardConditionsComponent implements OnInit, OnDestroy {

  @Input() condition: string;
  @Output() cancelEvent = new EventEmitter();
  @Output() backEvent = new EventEmitter();
  @Output() acceptEvent = new EventEmitter();

  conditions: ConditionsElement;
  conditions10: ConditionsElement = {
    data: [
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'DebitCard/Condiciones_NBnet_Debito.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.CONTRACTUAL', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'DebitCard/INFORMACION_PRECONTRACTUAL_NBNet_Debito.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.ACCIDENT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'DebitCard/Seguro_Accidentes.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.ASSISTANCE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'DebitCard/Seguros_Asistencia.pdf', read: false},
    ]};
  conditions20: ConditionsElement = {
    data: [
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Clasic/Condiciones_Credito_Clasic.pdf', read: false},
     {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.CONTRACTUAL', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Clasic/INFORMACION_PRECONTRACTUAL_NBNet_Clasica.pdf', read: false},
     {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.ACCIDENT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Clasic/Seguro_Accidentes.pdf', read: false},
     {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.ASSISTANCE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Clasic/Seguros_Asistencia.pdf', read: false},
    ]};
  conditions30: ConditionsElement = {
    data: [
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Gold/Condiciones_Credito_Oro.pdf', read: false},
     {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.CONTRACTUAL', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Gold/INFORMACION_PRECONTRACTUAL_NBnet_Oro.pdf', read: false},
     {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.ACCIDENT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Gold/Seguro_Accidentes.pdf', read: false},
     {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.ASSISTANCE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Gold/Seguros_Asistencia.pdf', read: false},
    ]};
  conditions40: ConditionsElement = {
    data: [
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Gold/Condiciones_Credito_Oro.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.CONTRACTUAL', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Gold/INFORMACION_PRECONTRACTUAL_NBnet_Oro.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.ACCIDENT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Gold/Seguro_Accidentes.pdf', read: false},
      {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-CARDS.DOCUMENTS.ASSISTANCE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'CreditCard/Gold/Seguros_Asistencia.pdf', read: false},
    ]};
  activeBoton = false;
  checkControl = false;

  constructor(
    ) {
  }

  ngOnInit() {
    switch (this.condition) {
        case '1':
          this.conditions = this.conditions10;
          break;
        case '2':
          this.conditions = this.conditions20;
          break;
        case '3':
          this.conditions = this.conditions30;
          break;
        case '4':
          this.conditions = this.conditions40;
          break;
    }}

  ngOnDestroy(): void { }

  controlCheck() {
    this.checkControl = !this.checkControl;
  }

  cancel() {
    this.cancelEvent.emit();
  }

  back() {
    this.backEvent.emit();
  }

  returnOperation(event: boolean) {
    this.activeBoton = event;
  }

  accept() {
    this.acceptEvent.emit();
  }

}
