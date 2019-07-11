import { TransferChargeBearer, TransferPeriodicityType } from '../../interfaces/transfers/transfers.interface';
import { GenericIdNameElement } from '../../interfaces/common/response.interface';
import { Amount } from '../../interfaces/common/amount.interface';
import { TransferExecutionType, TransferBeneficiary, TransferOrderer, TransferExecutionRule } from '../../interfaces/transfers/transfers.interface';

export class TransferNew {
    transferMode: string;
    orderer: TransferOrderer;
    beneficiary: TransferBeneficiary;
    amount: Amount;
    reason: string;
    purposeType?: string;
    aditionalInfo?: string;
    transferType?: string;
    chargeBearer?: TransferChargeBearer;
    executionType: TransferExecutionType;
    endtoendId?: string;
    alias?: string;
}

export class TransferPeriodicNew {
    orderer: TransferOrderer;
    beneficiary: TransferBeneficiary;
    amount: Amount;
    reason?: string;
    purposeType?: string;
    aditionalInfo?: string;
    transferType?: string;
    chargeBearer?: TransferChargeBearer;
    transferMode: string;
    periodicity: {
        type: TransferPeriodicityType,
        frequency?: GenericIdNameElement;
        firstExecutionDate: string;
        lastExecutionDate?: string;
        executionRule?: TransferExecutionRule,
        periodicUndefined?: boolean
    };
    alias?: string;
}

export class TransferPeriodicUpdate {
    periodicity: {
        type: string;
        frequency: string;
        firstExecutionDate: string;
        lastExecutionDate?: string;
        executionRule?: TransferExecutionRule
    };
    orderer: TransferOrderer;
    beneficiary: TransferBeneficiary;
    amount: Amount;
    reason: string;
    purposeType?: string;
    transferId: string;
}

export class TransferFavNew {
    orderer: TransferOrderer;
    beneficiary: TransferBeneficiary;
    amount: Amount;
    reason: string;
    purposeType: string;
    aditionalInfo?: string;
    transferType?: string;
    transferMode: string;
    chargeBearer?: TransferChargeBearer;
    alias: string;
}
