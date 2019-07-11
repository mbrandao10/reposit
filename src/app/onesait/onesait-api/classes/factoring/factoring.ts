import { Amount } from '../../interfaces/common/amount.interface';

export class FactoringNewContract {
    productId: string;
    factoringType: string;
    collectionManagementLimit?: Amount;
    financingLimit?: Amount;
}
