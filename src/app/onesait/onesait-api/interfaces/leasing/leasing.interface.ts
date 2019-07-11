import { Amount } from '../common/amount.interface';
import { Currency } from '../common/currency.interface';
import { AccountElement } from '../accounts/accounts.interface';

export interface LeasingContract {
    id: string;
    productData: {
        id: string;
        description: string;
        type?: {
            id: string;
            name: string;
        },
        subtype?: {
            id: string;
            name: string;
        }
    };
    currency: Currency;
    accountId: string;
    requestedAmount: Amount;
    grantedAmount: Amount;
    availableAmount: Amount;
    drawnAmount: Amount;
    outstandingAmount: Amount;
    formalisationDate: Date;
    expiryDate: Date;
    period: String;
    nextSettlementDate: Date;
    nextAmortizationDate: Date;
    installmentAmount: Amount;
    residualValue: Amount;
    depositAmount: Amount;
    installmentTaxRate: number;
    interestRate: number;
    interestReferential: number;
    interestDifferential: number;
    reviewPeriodicity: String;
    nextReviewDate: Date;
}

export interface LeasingContracts {
    id: string;
    productData: {
        id: string;
        description: string;
        type?: {
            id: string;
            name: string;
        },
        subtype?: {
            id: string;
            name: string;
        }
    };
    availableAmount: Amount;
    drawnAmount: Amount;
    outstandingAmount: Amount;
    account: AccountElement;
}

export interface LeasingRepayment {
    number: number;
    expiryDate: String;
    pendingAmount: Amount;
    fixedFee: Amount;
    installmentAmount: Amount;
    interest: Amount;
    taxRate: number;
}
