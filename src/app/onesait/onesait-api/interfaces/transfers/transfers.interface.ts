import { GenericIdNameElement } from '../common/response.interface';
import { AccountFormat, AccountElement } from '../accounts/accounts.interface';
import { Amount } from '../common/amount.interface';
import { SignatureHolderData } from '../common/common.interface';
import { TransferPeriodicNew, TransferNew } from '../../classes/transfers/transfers.class';
import { FormGroup } from '@angular/forms';
import { CreditElement } from '../credits/credits.interface';



export enum TransferPersonType {
    F = 'F',
    J = 'J'
}

export enum TransferChargeBearer {
    DEBT = 'DEBT',
    CRED = 'CRED',
    SHAR = 'SHAR',
    SLEV = 'SLEV'
}

// Urgente o standard
export enum TransferExecutionType {
    N = 'N',
    S = 'S'
}

// Now, programed, schedulled
export enum TransferExecutionMoment {
    N = 'N',
    P = 'P',
    S = 'S'
}

export enum TransferPeriodicityType {
    PERIODIC = 'PERIODIC',
    UNIQUE = 'UNIQUE'
}

export enum TransferExecutionRule {
    E = 'E',
    L = 'L'
}

export class TransferState {
    title: string;
    currencies: GenericIdNameElement[];
    frequencyTypes: GenericIdNameElement[];
    accounts: AccountElement[];
    credits: CreditElement[];
    favourites: TransferFavouriteOutput[];
    transferPeriodic: TransferPeriodicNew;
    transfer: TransferNew;
    transferForms: FormGroup[];
    currentStep: number;
    formSteps: number;
    step: TRANSFER_STEPS;
    simulation: TransferSimulation;
    chargeBearer:  GenericIdNameElement[];
    beneficiaryCountriesInternational:  GenericIdNameElement[];
    beneficiaryCountriesTarget:  GenericIdNameElement[];
    purposeTypes: GenericIdNameElement[];
    beneficiaryResident: string;
  }

  export enum TRANSFER_STEPS {
    FORM,
    VERIFY,
    TOKEN,
    RESUME
  }

  export enum TRANSFER_MODE {
    INTERNATIONAL = 'INTERNATIONAL',
    TARGET2 = 'TARGET2',
    NB = 'NB',
    TRASPASO = 'INTERNAL',
    SEPA = 'SEPA'
  }

export interface TransferOutput {
    id: string;
    date: Date;
    operationDate: Date;
    orderer: TransferOrderer;
    beneficiary: TransferBeneficiary;
    amount: Amount;
    reason: string;
    purposeType: GenericIdNameElement;
    aditionalInfo: string;
    transferType: GenericIdNameElement;
    status: GenericIdNameElement;
    isCancellable: boolean;
    fee: Amount;
    totalAmount: Amount;
}


export interface TransferPeriodicOutput {
    id: string;
    date: Date;
    orderer: TransferOrderer;
    creationDate: Date;
    beneficiary: TransferBeneficiary;
    amount: Amount;
    reason: string;
    purposeType: GenericIdNameElement;
    aditionalInfo: string;
    transferType: GenericIdNameElement;
    nextExecutionDate: Date;
    periodicity: {
        type: TransferPeriodicityType;
        frequency: string;
        firstExecutionDate: Date;
        lastExecutionDate: Date;
        executionRule: TransferExecutionRule
    };
    status: GenericIdNameElement;
}

export interface TransferPeriodicDetailOutput {
    id: string;
    date: Date;
    orderer: TransferOrderer;
    beneficiary: TransferBeneficiary;
    amount: Amount;
    reason: string;
    purposeType: GenericIdNameElement;
    aditionalInfo: string;
    transferType: GenericIdNameElement;
    transferMode: GenericIdNameElement;
    nextExecutionDate: Date;
    periodicity: {
        frequency: GenericIdNameElement;
        firstExecutionDate: Date;
        lastExecutionDate: Date;
        executionRule: TransferExecutionRule
    };
    fee: Amount;
    totalAmount: Amount;
}

export interface TransferDetail {
    id: string;
    date: Date;
    orderer: TransferOrderer;
    beneficiary: TransferBeneficiary;
    amount: Amount;
    reason: string;
    purposeType: GenericIdNameElement;
    aditionalInfo: string;
    transferType: GenericIdNameElement;
    transferMode: GenericIdNameElement;
    nextExecutionDate: Date;
    status: GenericIdNameElement;
    isCancellable: boolean;
}

export interface TransferSimulation {
    riskScoring: GenericIdNameElement;
    signatureData: {
        isSignatureRequired: boolean;
        factorType: GenericIdNameElement;
        type: GenericIdNameElement;
        count: number;
        holderList: SignatureHolderData[]
    };
    amount: Amount;
    fee: Amount;
    total: Amount;
    beneficiary: TransferBeneficiary;
    exchangeRate: number;
    chargeBearer: GenericIdNameElement;
    mailCharge?: Amount;
    expenses?: Amount;
}

export interface TransferBeneficiary {
    toAccount: {
        type?: GenericIdNameElement;
        id: string;
        formats?: AccountFormat[];
        swift?: string;
    };
    description?: string;
    email?: string;
    legalDocument?: {
        id: string;
        type?: GenericIdNameElement;
    };
    address?: string;
    city?: string;
    country?:  GenericIdNameElement;
    personType?: TransferPersonType;
    entity?: {
        country: GenericIdNameElement;
        name: string;
    }
}

export interface TransferOrderer {
    fromAccount: {
        type?: GenericIdNameElement;
        id: string;
        formats?: AccountFormat[];
    };
    description?: string;
    legalDocument?: {
        id: string;
        type?: GenericIdNameElement;
    };
    address?: string;
    city?: string;
    country?: string;
    personType?: TransferPersonType;
}

export interface TransferFavouriteOutput extends TransferDetail {
    alias: string;
}

export interface InterTransferSearch {
    dateFrom: string;
    dateTo: string;
    accountId: string;
    type?: string;
    mode?: string;
}
