import { Amount } from '../common/amount.interface';
import { Currency } from '../common/currency.interface';

export interface AmountCurrencyLoans {
    amount: number;
    currency: Currency;
}

export interface ProductLoan {
    description: string;
    id: string;
    subtype: SubtypeLoan;
    type: TypeLoan;
}

export interface SubtypeLoan {
    href: string;
    id: string;
    name: string;
}

export interface TypeLoan {
    href: string;
    id: string;
    name: string;
}

export interface LoanDetail {
    account: Amount;
    currency: Currency;
    lastMovementDate: Date;
    limitAmount: AmountCurrencyLoans;
    pendingAmount: AmountCurrencyLoans;
    product: ProductLoan;
    startAmount: AmountCurrencyLoans;
}

export interface LoansDetail {
    loanDetail: LoanDetail [];
    pendingAmount: number;
}

export interface ProductsByCurrencyLoans {
    divisa: string;
    loans?: LoansDetail[];
    pendingAmount?: number;
}

export interface CurrenciesLoans {
    ISOCode?: string;
    code?: string;
    id?: string;
    position?: string;
    sign?: string;
}

export interface DataLoan {
    id: string;
    currency: Currency;
}

export class LoanAmort {
    type: string;
    amount: Amount;
    loanAccountId: string;
    chargeAccount: string;
}

export class SimulateAmortizeResult {
    pendingTerms: number;
    pendingAmount: Amount;
    termAmount: Amount;
    feeAmount: Amount;
    newExpirationDate: Date;
}

export class AmortizeData {
    title?: string;
    subTitle?: string;
    resultsPost?: SimulateAmortizeResult;
}

export class LoanRepayment {
    number: number;
    date: Date;
    nominal: Amount;
    interest: Amount;
    pendingAmount: Amount;
    installment: Amount;
    iva: Amount;
    fixedFee: Amount;
    insurance: Amount;
    stampTax: Amount;
}
