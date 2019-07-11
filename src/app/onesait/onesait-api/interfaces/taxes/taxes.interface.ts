import { Amount } from '../common/amount.interface';

export interface TaxConsultTaxes {
    referenceNumber: string;
    executionDate: Date;
    type: string;
    taxForm: {
      id: string,
      name: string
    };
    paymentAmount: Amount;
}

export interface TaxPaymentType {
    id: string;
    name: string;
}

export interface TaxPaymentTypeCombo {
    id: string;
    name: string;
    organism: string;
}

export interface TaxForm {
    id: string;
    name: string;
}

export interface TaxYear {
    id: string;
    name: string;
}

export interface TaxPeriod {
    id: string;
    name: string;
}

export interface TaxIssuerEntities {
    id: string;
    name: string;
}
