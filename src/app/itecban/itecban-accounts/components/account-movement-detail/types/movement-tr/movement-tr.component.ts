import { Component } from '@angular/core';
import { Json2PdfFieldDefinition } from 'onesait-core';
import { MovementBaseComponent } from '../movement-base';

@Component({
  selector: 'app-movement-tr',
  templateUrl: './movement-tr.component.html'
})
export class MovementTRComponent extends MovementBaseComponent {

  constructor() {
    super();
  }

  getExportToPdfFieldsDef(): Json2PdfFieldDefinition[] {

    const fieldDef: Json2PdfFieldDefinition[] = [];

    if (this.movementDetail.reference) {
      fieldDef.push({
        field: 'reference',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.REFERENCE.NUMBER',
        fieldType: {
          type: 'string'
        }
      });
    }

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

    if (this.movementDetail.orderer) {
      if (this.movementDetail.orderer.account) {
        if (this.movementDetail.orderer.account.id) {
          fieldDef.push({
            field: 'orderer.account.id',
            fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.ORIGIN',
            fieldType: {
              type: 'string'
            }
          });
        }
      }

      if (this.movementDetail.orderer.name) {
        fieldDef.push({
          field: 'orderer.name',
          fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.SINCE',
          fieldType: {
            type: 'string'
          }
        });
      }
    }

    if (this.movementDetail.beneficiary) {
      if (this.movementDetail.beneficiary.account && this.movementDetail.beneficiary.account.id) {
        fieldDef.push({
          field: 'beneficiary.account.id',
          fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.DESTINATION',
          fieldType: {
            type: 'string'
          }
        });
      }

      if (this.movementDetail.beneficiary.name) {
        fieldDef.push({
          field: 'beneficiary.name',
          fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.BENEFICIARY',
          fieldType: {
            type: 'string'
          }
        });
      }
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

    if (this.movementDetail.state) {
      fieldDef.push({
        field: 'state',
        fieldTranslateKey: 'ITECBAN-ACCOUNT.MOVEMENT.DESCRIPTION',
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

    return fieldDef;
  }

}

