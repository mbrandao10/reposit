import { GenericIdNameElement, Amount, Formats } from 'onesait-api';

export interface DocumentElement {
    id: string;
    date: Date;
    accountId: string;
    accounts: Formats;
    cardId: string;
    type: GenericIdNameElement;
    amount: Amount;
    fileName: string;
    isRead: boolean;
}
