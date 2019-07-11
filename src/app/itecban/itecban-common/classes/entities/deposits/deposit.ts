import { Money, Currency } from '../generics/money';
import { Amount } from 'onesait-api';

export class Deposit {
    id: string;
    balance: Money;
    postedBalance: Money;
    productData: Product;
    alias: string;
    currency: Currency;
    formats: any;
    connectedAccount: any;
    autoRenewal: any;
    initialAmount: any;
}

export class Product {
    id: string;
    description: string;
    type: any;
    subtype: any;
}

export class ProductDeposit {
    code: string;
    name: string;
    tae: number;
    interest: number;
}

export class ProductDepositDetail {
    code: string;
    name: string;
    tae: number;
    interest: number;
    renewal: boolean;
    settlementTerm: string;
    currency: Currency;
    cancelFare: Amount;
    minimalAmount: Amount;
    duration: number;
}

export class NewDeposit {
    accountId: string;
    amount: Amount;
    productCode: string;
    duration: number;
}
