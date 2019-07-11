import { GenericIdNameElement, Amount } from 'onesait-api';

export interface LoanProductData {
    id: string;
    description: string;
    type: GenericIdNameElement;
    subtype: GenericIdNameElement;
}

export interface LoanProductsDetail {
    code: string;
    name: string;
    interest: number;
    tae: number;
    settlementTerm: string;
}

export interface GenericAccountLoanInfo {
    userId: string;
    username: string;
    attorney: string;
    product?: LoanProductData;
}

export interface LoanMovement {
    id: string;
    amount: Amount;
    type: GenericIdNameElement;
    reason: string;
    operationDate: Date;
    valueDate: Date;
    balance: Amount;
}
