import { Amount } from '../common/amount.interface';
import { AccountElement } from '../accounts/accounts.interface';

export interface ConfirmingContract {
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

export interface ConfirmingContracts {
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

export interface ConfirmingOrders {
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

export interface ConfirmingRemittances {
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

export interface ConfirmingSuppliers {
    id: string;
    name: string;
}

export interface ConfirmingAdvances {
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

export interface ConfirmingAdvance {
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

export interface ConfirmingStatusTypes {
    id: string;
    name: string;
    href?: string;
}

export interface ConfirmingSupplier {
    name: string;
    legalDocument: string;
    accountId: string;
    phoneNumber: number;
    address: ConfirmingSuppilierAddress;
}

export interface ConfirmingSuppilierAddress {
    streetType: string;
    streetName: string;
    streetNumber: number;
    postCode: string;
    city: string;
    province: string;
    country: string;
}


export interface ConfirmingSupplierCountries {
    id: string;
    name: string;
}

export interface ConfirmingFileResponse {
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

export interface ConfirmingOrderResponse {
    amount: Amount;
    numOrderer: string;
    creationDate: Date;
    expirationDate: Date;
    idOrderer: string;
}
