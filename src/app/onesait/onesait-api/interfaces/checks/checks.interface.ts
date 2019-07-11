import { Amount } from '../common/amount.interface';

export interface Checks {
    id: string;
    status: ChecksStatus;
    amount: Amount;
    date: string;
}

export interface ChecksStatus {
    id: string;
    name: string;
}
