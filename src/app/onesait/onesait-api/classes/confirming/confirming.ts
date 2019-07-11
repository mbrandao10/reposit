import { Amount } from '../../interfaces/common/amount.interface';
import { ConfirmingSuppilierAddress } from '../../interfaces/confirming/confirming.interface';

export class ConfirmingNewContract {
    productId: string;
    expirationDate: string;
    estimatedAnnualTurnover: Amount;
}

export class ConfirmingOrder {
    // account: Account;
    contractId: string;
    concept: string;
    amount: Amount;
    expirationDate: string;
    supplier: string | ConfirmingNewSupplier;
    account: {
        id: string;
    };
}

export class ConfirmingNewSupplier {
    name: string;
    legalDocument: string;
    // account: string;
    phoneNumber: number;
    address: ConfirmingSuppilierAddress;
}


