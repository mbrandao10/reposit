import { Amount, AccountFormat, Currency } from 'onesait-api';

export interface NewFund {
    productId: string;
    accountId: string;
}

export interface FundListByFunds {
    fund?: FundDetail;
    accountFundId?: string;
    formats?: AccountFormat [];
    empty?: boolean;
}

export interface FundList {
    accountFundId: string;
    formats: AccountFormat [];
    funds: FundDetail [];
}

export interface FundDetail {
    id: string;
    name: string;
    liquidationValue: Amount;
    effectiveValue: Amount;
    costEffectiveness: number;
    isin: string;
    gains_losses: number;
    totalCost: Amount;
}

export interface FundCreateSuccess {
    id: string;
}

export interface AccountsFundsLinkable {
    id: string;
    formats: AccountFormat [];
    currency: Currency;
}
