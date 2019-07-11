import { Money } from '../generics/money';

export class Movement {
    id: string;
    reference: string;
    amount: Money;
    type: any;
    reason: string;
    operationNumber: string;
    valueDate: Date;
    operationDate: Date;
    operationDateHour: string;
    time: string;
    balance: Money;
    hasDetail: boolean;
    hasDocument: boolean;
    documentId: string;
// tslint:disable-next-line:eofline
}
