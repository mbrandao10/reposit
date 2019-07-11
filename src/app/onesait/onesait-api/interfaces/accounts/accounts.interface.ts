import { Amount } from '../common/amount.interface';
import { Currency } from '../common/currency.interface';
import { Formats } from '../common/common.interface';
import { GenericIdNameElement } from '../common/response.interface';


export interface AccountElement {
    id: string;
    balance: Amount;
    postedBalance: Amount;
    productData: AccountProduct;
    operationalStatus: string;
    alias: string;
    currency: Currency;
    status: AccountsStatus;
    formats: AccountFormat[];
    hasLocks: boolean;
}

export interface AccountDetail {
    id: string;
    balance: Amount;
    postedBalance: Amount;
    lastMovementDate: Date;
    openingDate: Date;
    operationalStatus: string;
    alias: string;
    currency: Currency;
    productData: AccountProduct;
    status: AccountsStatus;
    interest: number;
    dispositionType: {
        id: string;
        name: string
    };
    formats: AccountFormat[];
    hasLocks: boolean;
}

export class AccountMovement {
    id: string;
    reference: string;
    amount: Amount;
    type: {
        id: string;
        name: string;
    };
    reason: string;
    operationNumber: string;
    valueDate: Date;
    hasDetail: boolean;
    balance: Amount;
    aditionalInfo: {
        [propName: string]: any;
    };
}

export class AccountMovementDetail {
    reason: string;
    operationDate: Date;
    valueDate: Date;
    amount: Currency;
    beneficiaryAccount: string;
    ordererName: string;
    beneficiaryName: string;
    movementClass: string;
    id: string;
    reference: string;
    type: {
        id: string;
        name: string;
    };
    hasDocument: boolean;
    documentId: string;
    state: string;
    [propName: string]: any;

}

export class AccountIntervener {
    personId: string;
    name: string;
    participation: {
        order: number;
        participantType: {
            id: string;
            name: string;
        };
    };
}

export class AccountRetentions {
    reason: string;
    startDate: Date;
    endDate: Date;
    amount: Amount;
}

export class DatesFromTo {
    dateFrom: string;
    dateTo: string;
}

export class AccountLocks {
    reason: string;
    startDate: Date;
    endDate: Date;
    amount: Amount;
}

export interface AccountProduct {
    id: string;
    description: string;
    type: {
        id: string;
        name: string;
    };
    subtype: {
        id: string;
        name: string;
    };
}

export interface GenericAccountInfo {
    userId: string;
    username: string;
    attorney: string;
    product?: AccountProductDetail;
}

export interface AccountProductDetail {
    code: string;
    name: string;
    interest: number;
    tae: number;
    settlementTerm: string;
}

export interface AccountFormat {
    format: GenericIdNameElement;
    value: string;
}

export interface AccountSettlement {
    dateFrom: Date;
    dateTo: Date;
    netAmount: Amount;
    balanceAtBeginning: Amount;
    balanceAtEnd: Amount;
    accountingDates: number;
    items: AccountSettlementElement[];
}

export interface AccountSettlementElement {
    concept: {
        id: string;
        name: string;
    };
    amount: Amount;
}

export interface SettlementDates {
    date: string;
}

export interface AccountCreateSuccess {
    id: string;
}

export interface Settlements {
    dateFrom: string;
    dateTo: string;
    netAmount: Amount;
    balanceAtBeginning: Amount;
    balanceAtEnd: Amount;
    interests: [{
        concept: {
            id: string;
            name: string;
        },
        amount: Amount;
    }];
    fees: [{
        concept: {
            id: string;
            name: string;
        },
        amount: Amount;
    }];
    breakDown: [{
        date: string;
        description: string;
        balance: Amount;
        numOfDays: number;
        accountingDates: number;
        interestRate: number;
        interest: Amount;
    }];
}
////////
export interface AccountCurrencies {
    ISOCode: string;
    code: string;
    id: string;
    position: string;
    sign: string;
}

export interface AccountProductsByCurrency {
    accounts?: AccountsAccounts;
    balanceAmount?: number;
    divisa?: string;
}

export interface AccountsAccounts {
    account: AccountElement[];
    balanceAmount?: number;
    postedBalanceAmount?: number;
}

export interface AccountsAccount {
    CCC: string;
    IBAN: string;
    alias: string;
    balance: Amount;
    currency: Currency;
    formats: Formats[];
    hasLocks: boolean;
    id: string;
    operationalStatus: string;
    postedBalance: Amount;
    productData: AccountProduct;
    status: AccountsStatus;
}

export interface AccountsStatus {
    id: string;
    name: string;
    href?: string;
}

export interface AccountsSelectTransfer {
    id: string;
    formats: AccountFormat[];
    currency: Currency;
}
