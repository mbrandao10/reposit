import { Amount, AccountFormat, Currency } from 'onesait-api';

export interface NewEquity {
    productId: string;
    accountId: string;
}

export interface EquListByEquities {
    accountEquityId?: string;
    formats?: AccountFormat [];
    equity?: EquityDetail;
    empty?: boolean;
}

export interface EquitiesList {
    accountEquityId: string;
    formats: AccountFormat [];
    equities: EquityDetail [];
    date: Date;
    totalValue: Amount;
}

export interface EquityDetail {
    id: string;
    name: string;
    date: Date;
    numberTitles: number;
    totalValue: Amount;
}

export interface EquitiesCreateSuccess {
    id: string;
}

export interface AccountsEquitiesLinkable {
    id: string;
    formats: AccountFormat [];
    currency: Currency;
}
