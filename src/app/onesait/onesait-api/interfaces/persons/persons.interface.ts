import { GenericIdNameElement } from "../common/response.interface";
import { Amount } from "../common/amount.interface";
import { AccountElement } from "../accounts/accounts.interface";


export interface PendingSignature {
    id: string;
    description: string;
    group: GenericIdNameElement;
    date: Date;
    transactionId: string;
    creator: string;
    state: GenericIdNameElement;
    amount: Amount;
    pendingSignatures: number;
}

export interface PendingSignatureDetail {
   group: GenericIdNameElement;
   amount: Amount;
   requiredSignatures: number;
   transactionId: string;
   signers: Signer;
   account: AccountElement;
}

export interface PendingSignatureCounter {
    numOfNewSignatures: number;
    hasNewSignatures: boolean;
 }

export interface Signer {
    name: string;
    userNumber: string;
    date: Date;
    status: GenericIdNameElement;
}
