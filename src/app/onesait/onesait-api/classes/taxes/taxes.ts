import { Amount } from '../../interfaces/common/amount.interface';
import { TaxForm } from '../../interfaces/taxes/taxes.interface';


export class RentaTaxPayment {
    accountId: string;
    taxPaymentClass: string;
    taxForm: TaxForm;
    type: string;
    taxYear: number;
    taxPeriod: string;
    paymentAmount: Amount;
    splitPaymentAmount: Amount;
    isDirectDebit: boolean;
}

export class IvaTaxPayment {
    accountId: string;
    taxPaymentClass: string;
    taxForm: TaxForm;
    type: string;
    taxYear: number;
    taxPeriod: string;
    paymentAmount: Amount;
}

export class SociedadesTaxPayment {
    accountId: string;
    taxPaymentClass: string;
    taxForm: TaxForm;
    type: string;
    taxYear: number;
    taxPeriod: string;
    paymentAmount: Amount;
}

export class NotificationsAndFeesTaxPayment {
    accountId: string;
    taxPaymentClass: string;
    taxForm: TaxForm;
    formId: string;
    paymentAmount: Amount;
}

export class OthersTaxPayment {
    accountId: string;
    taxPaymentClass: string;
    taxForm: TaxForm;
    taxYear: number;
    taxPeriod: string;
    paymentAmount: Amount;
}

export class TgssTaxPayment {
    accountId: string;
    taxPaymentClass: string;
    issuerEntity: string;
    reference: string;
    identification: string;
    paymentAmount: Amount;
    isDirectDebit: boolean;
}
