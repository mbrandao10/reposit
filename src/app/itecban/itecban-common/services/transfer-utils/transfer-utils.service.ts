import { Injectable } from '@angular/core';
import { Json2PdfFieldDefinition } from 'onesait-core';

@Injectable()
export class TransferUtilsService {

  constructor() { }

  getExportToPdfFieldsDef(transferDetail): Json2PdfFieldDefinition[] {
    const fieldDef: Json2PdfFieldDefinition[] = [];
    if (transferDetail.id) {
      fieldDef.push({
        field: 'id',
        fieldTranslateKey: 'ITECBAN-TRANSFER.PERFORMED.REFERENCE.NUMBER',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (transferDetail.amount && transferDetail.amount.amount) {
      const cCode = (transferDetail.amount.currency) ?
        transferDetail.amount.currency.code : null;
      fieldDef.push({
        field: 'amount.amount',
        fieldTranslateKey: 'ITECBAN-TRANSFER.TRANSFERS.MONTO',
        fieldType: {
          type: 'currency',
          currencyCode: cCode
        }
      });
    }

    if (transferDetail.orderer.fromAccount.id !== undefined) {
      fieldDef.push({
        field: 'orderer.fromAccount.id',
        fieldTranslateKey: 'ITECBAN-TRANSFER.MAKE-TRANSFER.ORIGIN',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (transferDetail.orderer.description !== undefined) {
      fieldDef.push({
        field: 'orderer.description',
        fieldTranslateKey: 'ITECBAN-TRANSFER.PERFORMED.ON.BEHALFOF',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (transferDetail.beneficiary.toAccount.id !== undefined) {
      fieldDef.push({
        field: 'beneficiary.toAccount.id',
        fieldTranslateKey: 'ITECBAN-TRANSFER.TRANSFERS.DESTINATION',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (transferDetail.beneficiary.description !== undefined) {
      fieldDef.push({
        field: 'beneficiary.description',
        fieldTranslateKey: 'ITECBAN-TRANSFER.TRANSFERS.BENEFICIARY',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (transferDetail.reasonType.name !== undefined) {
      fieldDef.push({
        field: 'reasonType.name',
        fieldTranslateKey: 'ITECBAN-TRANSFER.TRANSFERS.CONCEPT',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (transferDetail.reason !== undefined) {
      fieldDef.push({
        field: 'reason',
        fieldTranslateKey: 'ITECBAN-TRANSFER.TRANSFERS.DESCRIPTION',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (transferDetail.transferDateHour !== undefined) {
      fieldDef.push({
        field: 'transferDateHour',
        fieldTranslateKey: 'ITECBAN-TRANSFER.PERFORMED.DATE.OPERATION',
        fieldType: {
          type: 'string'
        }
      });
    }

    if (transferDetail.beneficiary.email !== undefined) {
      fieldDef.push({
        field: 'beneficiary.email',
        fieldTranslateKey: 'ITECBAN-TRANSFER.PERFORMED.EMAIL.BENEFICIARY',
        fieldType: {
          type: 'string'
        }
      });
    }

    return fieldDef;
  }


}
