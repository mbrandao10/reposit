import { Amount } from '../common/amount.interface';
import { AccountFormat } from '../accounts/accounts.interface';
import { SignatureHolderData } from '../common/common.interface';

export interface FactoringContracts {
    id: string;
    productData: {
        id: string;
        description: string;
        type: {
            id: string;
            name: string;
            href?: string;
        };
        subtype: {
            id: string;
            name: string;
            href?: string;
        };
    };
    subscriptionAccount: {
        id: string;
        type?: any;
        formats?: AccountFormat[]
    };
    collectionManagementLimit: Amount;
    financingLimit: Amount;
}

export interface FactoringContract {
    id: string;
    productData: {
        id: string;
        description: string;
        type?: {
            id: string;
            name: string;
            href?: string;
        };
        subtype?: {
            id: string;
            name: string;
            href?: string;
        };
    };
    openingDate?: string;
    expirationDate?: string;
    factoringType: {
        id: string;
        name: string;
        href?: string;
    };
    maxPercentageToAnticipate: number;
    percentageOfCoverage: number;
    collectionManagementLimit: Amount;
    financingLimit: Amount;
    financing: {
        isAutomatic: boolean;
        fixedRate?: number;
        referenceIndex?: string;
        differentialRate?: number;
        latePaymentRate?: number;
    };
    subscriptionAccount: {
        id: string;
        type?: any;
        formats?: AccountFormat[];
    };
    settlementType: {
        id: string;
        name: string;
        href?: string;
    };
    settlementSubType: {
        id: string;
        name: string;
        href?: string;
    };
    collectionsAmount: Amount;
    financedAmount: Amount;
}



export interface FactoringInvoices {
    id: string;
    reference: string;
    debtorDescription: string;
    amount: Amount;
    status: FactoringInvoiceType;
    contractId?: string;
    creationDate: string;
}

export interface FactoringInvoice {
    id: string;
    reference: string;
    debtorDescription: string;
    amount: Amount;
    status: FactoringInvoiceType;
    contractId?: string;
    creationDate: string;
    expirationDate: string;
    acceptanceDate?: string;
    advanceDate: string;
    financedAmount?: Amount;
    nominalInterestRate?: number;
    latePaymentRate?: number;
    fees?: Amount;
    outstandingAmount?: Amount;
}

export interface FactoringSimulation {
    amount: Amount;
    financedAmount: Amount;
    nominalInterestRate?: number;
    latePaymentRate?: number;
    fees?: Amount;
    signatureData?: {
        isSignatureRequired: boolean;
        factorType?: {
            id: string;
            name: string;
            href?: string
        };
        type?: {
            id: string;
            name: string;
            href?: string;
        };
        count?: number;
        holderList?: SignatureHolderData;
    };
}


export interface FactoringInvoiceType {
    id: string;
    name: string;
    ref?: string;
}

export interface FactoringFileResponse {
    fileType?: {
        id: string,
        name: string,
        href?: string
    };
    fileName: string;
    numOfItems?: number;
    date?: Date;
    documentId: string;
}
