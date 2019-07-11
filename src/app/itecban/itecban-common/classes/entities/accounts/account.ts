import { Currency } from '../generics/money';
import { Amount } from 'onesait-api';


export class AccountOS {
    id: string;
    balance: Amount;
    postedBalance: Amount;
    pendingAmount: Amount;
    lastMovementDate: Date;
    openingDate: Date;
    operationalStatus: string;
    alias: string;
    currency: Currency;
    productData: ProductData;
    status: TypeProduct;
    interest: number;
    dispositionType: TypeProduct;
    agreedBalanceAccepted: Amount;
    prepaidBalance: Amount;
    chargesMngLimit: Amount;
    financingLimit: Amount;
    outstandingBalance: Amount;
    amount: Amount;
    formats: Formats[];
    hasLocks: boolean;
}

export class ProductData {
    id: string;
    description: string;
    type: TypeProduct;
    subType: TypeProduct;
}

export class TypeProduct {
    id: string;
    name: string;
    href: string;
}

export class Formats {
    format: TypeProduct;
    value: string;
}
