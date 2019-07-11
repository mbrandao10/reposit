import { GenericIdNameElement } from './response.interface';

export interface SignatureHolderData {
    authorizerName: string;
    authorizedOption: GenericIdNameElement;
    status: GenericIdNameElement;
}

export interface Formats {
    format: GenericIdNameElement;
    value: string;
}
