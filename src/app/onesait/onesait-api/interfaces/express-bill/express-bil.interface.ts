import { Amount } from '../common/amount.interface';
import { AccountElement } from '../accounts/accounts.interface';

export interface EBContract {
    id: string;
    openingDate: string;
    expirationDate: string;
    totalAmountOfAdvanceOrders: Amount;
    totalAmountOfActiveOrders: Amount;
    advancesMaxAmount: Amount;
    confirmingMaxAmount: Amount;
    productData: {
        id: string;
        description: string;
        type?: {
            id: string;
            name: string;
            href?: string;
        },
        subtype: {
            id: string;
            name: string;
            href?: string;
        }
    };
}

export interface EBContracts {
    account: AccountElement;
    id: string;
    productData: {
        id: string;
        description: string;
        type?: {
            id: string;
            name: string;
            href?: string;
        },
        subtype?: {
            id: string;
            name: string;
            href?: string;
        }
    };
    totalAmountOfAdvanceOrders: Amount;
    totalAmountOfActiveOrders: Amount;
}

export interface EBOrders {
    id: string;
    supplier: string;
    concept: string;
    amount: Amount;
    creationDate: string;
    expirationDate: string;
    paymentDate: string;
    status: {
        id: string;
        name: string;
        href?: string;
    };
    remitanceId?: string | null;
}

export interface EBRemittances {
    id: string;
    totalAmount: Amount;
    creationDate: string;
    expirationDate?: string;
    lastModificationDate: string;
    numOfAuthorizedOrders: number;
    numOfPendingOrders: number;
    numOfRejectedOrders: number;
    numOfDeniedOrders: number;
    contractId: string;
}

export interface EBSuppliers {
    id: string;
    name: string;
}

export interface EBAdvances {
    id: string;
    debtor: string;
    concept: string;
    amount: Amount;
    creationDate: string;
    expirationDate: string;
    status: {
        id: string;
        name: string;
        href?: string;
    };
}

export interface EBAdvance {
    id: string;
    debtor: string;
    concept: string;
    amount: Amount;
    creationDate: string;
    expirationDate: string;
    status: {
        id: string;
        name: string;
        href?: string;
    };
    termInDays: number;
    ivaAmount: Amount;
    interestAmount: Amount;
    feeAmount: Amount;
    totalAmount: Amount;
}

export interface EBStatusTypes {
    id: string;
    name: string;
    href?: string;
}

export interface EBSupplier {
    name: string;
    legalDocument: string;
    accountId: string;
    phoneNumber: number;
    address: EBSuppilierAddress;
}

export interface EBSuppilierAddress {
    streetType: string;
    streetName: string;
    streetNumber: number;
    postCode: string;
    city: string;
    province: string;
    country: string;
}


export interface EBSupplierCountries {
    id: string;
    name: string;
}

export interface EBFileResponse {
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
