import { Amount } from '../../interfaces/common/amount.interface';

export class AccountNew {
    productType: string;
}


export class AccountNewCheckbook {
    accountId: string;
    type: string;
    quantity: number;
}

export class AccountSimulation {
    toAccount: {
        id: string;
        type: string;
        coelsaAccountType?: string;
    };
    amount: Amount;
    reason: string;
    transferInd: number;
    beneficiary: {
        description: string;
        legalDocument: {
            id: string;
            type: string;
        };
        personType: string;
    };
}
