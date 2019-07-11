import {  Amount  } from '../common/amount.interface';
import { Currency } from '../common/currency.interface';

export interface PensionElement {
    id: string;
    productData: PensionProduct;
    createDate: string;
    balanceContributed: Amount;
    postedBalance: Amount;
    operationIndicator: string;
    currency: Currency;
    formats: PensionFormat[];
    minAmount: Amount;
    contributionLimit: Amount;
    lastValoration: string;
    totalContributing: Amount;
}

export interface PensionListData {
    pension?: PensionElement;
    pensionAccountId?: string;
    formats?: PensionFormat[];
    empty?: boolean;
}

export interface PensionProduct {
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

export interface PensionFormat  {
    format: {
        id: string;
        name: string;
    };
    value: string;
}

export interface ManagerCompany {
    id: string,
    name: string
}

export interface TransferType {
    id: string,
    name: string
}