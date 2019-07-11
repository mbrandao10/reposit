
const BASE_URL =  '/consents';
const FUNDS = '/funds_confirmations';

export const ConsentsEndpoints = {
    BASIC: BASE_URL,
    GET_CONSENTS: BASE_URL,
    GET_CONSENTS_AUX: BASE_URL + '/consentsByApiCustomerId',
    POST_CONSENTS: BASE_URL + '/:consentsId',
    DELETE_CONSENTS: BASE_URL + '/:consentsId',
    GET_FUNDS_CONFIRMATIONS: FUNDS + '/:consentsId'
};
