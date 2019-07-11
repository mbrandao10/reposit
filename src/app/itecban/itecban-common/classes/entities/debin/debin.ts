import { Money } from '../generics/money';
import { OptionList, BankData } from '../generics/generics';

export class Debin {
    amount: Money;
    buyerName: string;
    concept: OptionList;
    expirationDate: Date;
    id: string;
    reason: string;
    sellerName: string;
    status: OptionList;
}

export class DebinDetail {
    amount: Money;
    buyerBank: BankData;
    buyerCbu: string;
    buyerName: string;
    buyerlegalDocumentId: string;
    concept: OptionList;
    expirationDate: Date;
    id: string;
    operationDate: Date;
    reason: string;
    requestDate: Date;
    sellerBank: BankData;
    sellerCbu: string;
    sellerName: string;
    sellerlegalDocumentId: string;
    status: OptionList;
}

export class DebinConsuptionsLimit {
    consumptAmountArs: string;
    consumptQuantityArs: string;
    consumptAmountUsd: string;
    consumptQuantityUsd: string;
    maxAmountArs: string;
    maxQuantityArs: string;
    maxAmountUsd: string;
    maxQuantityUsd: string;
}
