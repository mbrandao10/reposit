import { Component } from '@angular/core';
import { Json2PdfFieldDefinition } from 'onesait-core';
import { MovementBaseComponent } from '../movement-base';

@Component({
  selector: 'app-movement-card',
  templateUrl: './movement-card.component.html'
})
export class MovementCARDComponent extends MovementBaseComponent {

  constructor() {
    super();
  }

  getExportToPdfFieldsDef(): Json2PdfFieldDefinition[] {

    const fieldDef: Json2PdfFieldDefinition[] = [];

    if (this.movementDetail.amount && this.movementDetail.amount.amount) {
      const cCode = (this.movementDetail.amount.currency) ?
        this.movementDetail.amount.currency.code : null;
      fieldDef.push({
        field: 'amount.amount',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.MONTO',
        fieldType: {
          type: 'currency',
          currencyCode: cCode
        }
      });
    }

    if (this.movementDetail.reason) {
      fieldDef.push({
        field: 'reason',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.CONCEPT',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (this.movementDetail.cardNumber) {
      fieldDef.push({
        field: 'cardNumber',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.CARD',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (this.movementDetail.operationDateHour) {
      fieldDef.push({
        field: 'operationDateHour',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.OPERATION.DATE',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (this.movementDetail.city) {
      fieldDef.push({
        field: 'city',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.OPERATION.CITY',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (this.movementDetail.shop && this.movementDetail.shop.name) {
      fieldDef.push({
        field: 'shop.name',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.COMMERCE',
        fieldType: {
          type: 'string'
        }
      });
    }

    return fieldDef;
  }

}
