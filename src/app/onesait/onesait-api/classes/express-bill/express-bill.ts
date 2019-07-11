import { Amount } from '../../interfaces/common/amount.interface';
import { EBSuppilierAddress } from '../../interfaces/express-bill/express-bil.interface';

export class EBNewContract {
    productId: string;
    expirationDate: string;
    estimatedAnnualTurnover: Amount;
}

export class EBOrder {
    // account: Account;
    contractId: string;
    concept: string;
    amount: Amount;
    expirationDate: string;
    supplier: string | EBNewSupplier;
    account: {
        id: string;
    };
}

export class EBNewSupplier {
    name: string;
    legalDocument: string;
    phoneNumber: number;
    address: EBSuppilierAddress;
}


