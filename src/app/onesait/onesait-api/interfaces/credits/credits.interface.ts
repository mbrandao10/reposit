import { Amount } from '../common/amount.interface';
import { Currency } from '../common/currency.interface';
import { GenericIdNameElement } from '../common/response.interface';
import { Formats } from '../common/common.interface';


export interface CreditElement {
    id: string;
    outstandingBalance: Amount;
    postedBalance: Amount;
    productData: CreditProductData;
    currency: Currency;
    formats: Formats[];
}

export interface CreditNew {
    productCode: string;
    amount: {
        amount: number,
        currency: string
    };
    expirationDate: string;
}

export interface CreditCreateSuccess {
    id: string;
}

export interface CreditProductsDetail {
    code: string;
    name: string;
    interest: number;
    tae: number;
    settlementTerm: string;
}

export interface CreditDetail {
    id: string;
    outstandingBalance: Amount;
    postedBalance: Amount;
    productData: CreditProductData;
    currency: Currency;
    formats: Formats[];
    status: GenericIdNameElement;
    openingDate: Date;
    expirationDate: Date;
    interestCreditor: number;
    interestDebtor: number;
    interestExceeded: number;
}

export interface CreditIntervenersCollection {
    personId: string;
    name: string;
    participation: CreditIntervenersCollectionParticipation[];
}

export interface CreditMovementsCollection {
    id: string;
    amount: Amount;
    type: GenericIdNameElement;
    reason: string;
    operationDate: Date;
    valueDate: Date;
    balance: Amount;
}

export interface CreditRetentionsCollection {
    reason: string;
    startDate: Date;
    endDate: Date;
    amount: Amount;
}
export interface CreditLocksCollection {
    reason: string;
    startDate: Date;
    endDate: Date;
}

export interface GenericAccountCreditInfo {
    userId: string;
    username: string;
    attorney: string;
    product?: CreditProductData;
}

export interface CreditProductData {
    id: string;
    description: string;
    type: GenericIdNameElement;
    subtype: GenericIdNameElement;
}

export interface CreditIntervenersCollectionParticipation {
    order: number;
    participantType: GenericIdNameElement;
}

export interface AccountProductDataCredits {
    id: string;
}

export interface ProductsByCurrencyCredits {
    divisa: string;
    balanceAmount?: number;
    credits?: CreditDetail;
}

export interface BalanceCredits {
    code: number;
}

export interface CurrenciesCredits {
    ISOCode?: string;
    code?: string;
    id?: string;
    position?: string;
    sign?: string;
}
