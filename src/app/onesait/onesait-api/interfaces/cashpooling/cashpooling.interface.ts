import { Amount } from '../common/amount.interface';
import { AccountFormat } from '../accounts/accounts.interface';


export interface AccountCashPooling {
    mainAccount: CashpoolingElement;
    secondaryAccount: CashpoolingElement;
    relationType: RelationType;
    maxBalance: Amount;
    minBalance: Amount;
}

export interface CashpoolingElement {
    id: string;
    formats: AccountFormat[];
}

export interface RelationType {
    id: string;
    name: string;
}
