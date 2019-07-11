
// Objects returned in get and post operations

export interface ResultResponse {
    result: ResultObjectResponse;
    data: {
        [propName: string]: any;
    };
    signatureData: SignatureData;
}

export interface SignatureData {
    isSignatureRequired: boolean;
    factorType: GenericIdNameElement;
    type: GenericIdNameElement;
    count: number;
    holderList: Holder[];
}

export interface Holder {
    authorizerName: string;
    authorizedOption: GenericIdNameElement;
    status: GenericIdNameElement;
}

export interface ResultObjectResponse {
    code: string;
    info: string;
    errors: ErrorResponse[];
}

export interface ErrorResponse {
    errorDescription: string;
    errorCode: string;
    errorType: string;
    info: any;
}

export interface GenericListResponse<T> {
    data: T[];
    result: ResultObjectResponse;
    paging: {
        hasMorePages: boolean;
        nextPaginationKey: string;
    };
}

export interface GenericResponse<T> {
    data: T;
    result: ResultObjectResponse;
    paging: {
        hasMorePages: boolean;
        nextPaginationKey: string;
    };
}

export interface GenericIdNameElement {
    id: string;
    name?: string;
}

