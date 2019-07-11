import { Amount } from '../common/amount.interface';
import { Currency } from '../common/currency.interface';
import { GenericIdNameElement } from '../common/response.interface';
import { Formats } from '../common/common.interface';

export interface DirectdebitsAccounts {
    CCC: string;
    IBAN: string;
    balance: Amount;
    currency: Currency;
    formats: Formats[];
    hasLocks: boolean;
    id: string;
    operationalStatus: string;
    postedBalance: Amount;
    productData: any;
    status: DirectdebitsStatus;
}
export interface DirectdebitsContract {
    account: DirectdebitsAccount;
    alias: string;
    creationDate: Date;
    holder: string;
    id: string;
    issuerLegalDocument: GenericIdNameElement;
    issuerName: string;
    reference: string;
}

export interface DirectdebitsPayment {
    amount: Amount;
    chargeDate: Date;
    id: string;
    incomingDate: Date;
    maxReturnDate: Date;
    reason: string;
    state: GenericIdNameElement;
}

export interface DirectdebitsParams {
    id: string;
    name: string;
    text: string;
}

export interface DirectdebitsPaymentReasonReturns {
    id: string;
    name: string;
}

export interface DirectdebitsStatus {
    href: string;
    id: string;
    name?: string;
}

export interface DirectdebitsProductData {
    id: string;
    description: string;
    type: GenericIdNameElement;
    subtype: GenericIdNameElement;
}

export interface DirectdebitsAccount {
    id: string;
    formats: Formats[];
}

export interface DirectdebitRefundPayments {
    id: string;
    reason: string;
    chargeDate: Date;
    minReturnDate: Date;
    maxReturnDate: Date;
    nif: string;
    holder: string;
    reference: string;
    lastBillingDate: Date;
    entity: string;
    amount: Amount;
}
