import { GenericIdNameElement } from '../../interfaces/common/response.interface';
import { Address } from '../../interfaces/customers/customers.interface';

export enum CustomerProductType {
    SAVING_ACCOUNTS= 'saving-accounts',
    CURRENT_ACCOUNTS= 'current_accounts',
    FIXED_TERM_DEPOSITS= 'fixed-term-deposits',
    FUNDS = 'funds',
    EQUITIES = 'equities',
    RETIREMENTS = 'retirements',
    DEPOSITS_CERTIFICATES = 'deposit-certificates',
    OVERDRAFTS = 'overdrafts',
    GUARANTEES = 'guarantees',
    LOANDS = 'loans',
    FACTORING = 'factoring',
    CONFIRMING = 'confirming',
    CREDITS_CARDS = 'credit-cards',
    CREDITS = 'credit',
    DEBIT_CARDS = 'debit-cards',
    EXPRESS_BILL = 'express-bill'
}

export class CustomerNewInvitation {
    accountId: string;
    bondType: string;
    userNumber: string;
    name: string;
    email: string;
    text: string;
    birthDate: Date;
    legalDocument: {
        id: string;
        type: string;
    };
}

export class Customer {
    id: string;
    legalDocument?: {
        id: string;
        type: any;
    };
    secondarylegalDocument?: {
        id: string;
        type: any;
    };
    name?: string;
    surname?: string;
    secondSurname?: string;
    bussinesName?: string;
    birthDateOrCreationDate?: Date;
    contactInfo?: {
        mobileNumber?: string;
        mobileNumberPrefix?: any;
        phoneNumber?: string;
        phoneNumberPrefix?: any;
        email?: string;
    };
    fiscalObligations?: boolean;
    fiscalRelationType?: GenericIdNameElement;
    sex?: GenericIdNameElement;
    maritalStatus?: GenericIdNameElement;
    indicators?: {
        id: string;
        value: boolean
    };
    economicRegime?: GenericIdNameElement;
    addresses?: Address[];
}

