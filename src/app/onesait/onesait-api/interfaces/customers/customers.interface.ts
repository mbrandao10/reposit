import { AccountFormat } from '../accounts/accounts.interface';
import { GenericIdNameElement } from '../common/response.interface';
import { Amount } from '../common/amount.interface';
import { Currency } from '../common/currency.interface';

export interface ProductExt {
    id: string;
    description: string;
    type: GenericIdNameElement;
    subtype: GenericIdNameElement;
    name: string;
    currency: Currency;
}

export interface AccountHolderInvitation {
    id: string;
    account: Account;
    userNumber: string;
    userName: string;
    guestUserNumber: string;
    guestUserName: string;
    operationDate: Date;
    guestEmail: string;
    state: GenericIdNameElement;
    text: string;
    bondType: GenericIdNameElement;
    expirationDate: Date;
    productCode: string;
    productName: string;
    creationDate: Date;
    participantType: GenericIdNameElement;
}

export interface Address {
    addressId: string;
    type?: any;
    country?: string;
    postcode?: string;
    province?: string;
    city?: string;
    district?: string;
    streetType?: GenericIdNameElement;
    streetName?: string;
    streetNumber?: string;
    portal?: string;
    stairs?: string;
    floor?: string;
    door?: string;
    aditionalInfo?: string;
    isPrincipal?: boolean;
}


export interface Cities {
    id: string;
    idProvince: string;
    name: string;
}


export interface CustomerPosition {
    accounts: SummaryCommon[];
    credits: SummaryCredit[];
    cards: SummaryCards[];
    deposits: SummaryCommon[];
    loans: SummaryLoan[];
    confirming: SummaryConfirming[];
    factoring: SummaryFactoring[];
    leasing: SummaryLeasing[];
    investmentfunds: SummaryCommon[];
    equities: SummaryCommon[];
    guarantees: SummaryGuarantee[];
}

export interface SummaryCommon {
    id: string;
    type: string;
    formats: AccountFormat[];
    postedBalance: Amount;
    balance: Amount;
}

export interface SummaryCredit {
    id: string;
    type: string;
    formats: AccountFormat[];
    postedBalance: Amount;
    outstandingBalance: Amount;
}

export interface SummaryCards {
    id: string;
    postedBalance: Amount;
    outstandingBalance: Amount;
}

export interface SummaryLoan {
    id: string;
    type: string;
    formats: AccountFormat[];
    outstandingBalance: Amount;
    pendingAmount: Amount;
}

export interface SummaryConfirming {
    id: string;
    type: string;
    formats: AccountFormat[];
    agreedBalanceAccepted: Amount;
    prepaidBalance: Amount;
}

export interface SummaryFactoring {
    id: string;
    type: string;
    formats: AccountFormat[];
    chargesMngLimit: Amount;
    financingLimit: Amount;
}

export interface SummaryLeasing {
    id: string;
    type: string;
    formats: AccountFormat[];
    outstandingBalance: Amount;
}

export interface SummaryGuarantee {
    id: string;
    type: string;
    formats: AccountFormat[];
    amount: Amount;
}

export interface SummaryFiscal {
    productClass: string;
    product: {
        id: string,
        description: string,
    };
    account: {
        id: string,
        type: string
    };
    ownerShipPercentage: number | string;
    interests: Amount;
}
export interface SummaryFiscalSavings extends SummaryFiscal {
    taxes: Amount;
    debtorInterests: Amount;
    currencySymbol?: string;
}

export interface SummaryFiscalCredits extends SummaryFiscal {
    balanceAtEnding: Amount;
    amortizedAmount: Amount;
    currencySymbol?: string;
}

export interface externalSignOut {
    accessToken: string,
    tokenType: string,
    refreshToken: string,
    expiresIn: number,
    scope: string,
    institution: string,
    channel: string,
    url: string
}

export interface GDPRManagement {
    indicatorMSMC: boolean;
    indicatorCNFP: boolean;
    indicatorCPSTP: boolean;
}
