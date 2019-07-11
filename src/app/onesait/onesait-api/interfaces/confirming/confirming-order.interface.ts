import { Amount } from '../common/amount.interface';

export interface ConfirmingOrder {
    id: string;
    supplier: string;
    concept: string;
    amount: Amount;
    creationDate: string;
    expirationDate: string;
    paymentDate: string;
    status: {
        id: string;
        name: string;
    };
    remitanceId: string | null;
}
