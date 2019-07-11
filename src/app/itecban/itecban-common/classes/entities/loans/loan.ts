import { AccountOS, ProductData } from '../accounts/account';
import { Currency } from '../generics/money';
import { Holders } from '../generics/generics';
import { Amount } from 'onesait-api';

export class Loan {
    account: AccountOS;
    connectedAccount: AccountOS;
    pendingAmount: Amount;
    startAmount: Amount;
    limitAmount: Amount;
    product: ProductData;
    currency: Currency;
    lastMovementDate: Date;
    status: StatusProduct;
    startingCapital: Amount;
    outstandingCapital: Amount;
    startDate: Date;
    expiryDate: Date;
    settlementPeriodicity: string;
    amortizationPeriodicity: string;
    reviewPeriodicity: string;
    interestRate: number;
    interest: number;
    nextReviewDate: Date;
    differential: number;
    varInterestDif: number;
    varInterestReferential: number;
    isVarInterest: boolean;
    holders: Holders[];
}

export class StatusProduct {
    id: string;
    name: string;
    href: string;
}

export class TypeRepayment {
    id: string;
    name: string;
    href: string;
}

export class LoanNew {
    productCode: string;
    amount: {
        amount: number,
        currency: string
    };
    period: string;
}
