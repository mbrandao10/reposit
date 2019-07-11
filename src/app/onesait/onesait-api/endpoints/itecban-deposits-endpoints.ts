const BASE_URL = '/term-deposits';

export const DepositsEndpoints = {
    BASIC: BASE_URL,
    GET_DEPOSITS: BASE_URL,
    POST_DEPOSITS: BASE_URL,
    GET_PRODUCTS: BASE_URL + '/products/:productCode',
    GET_PRODUCT: BASE_URL + '/products/:productCode',
    POST_PRODUCT_SIMULATE: BASE_URL + '/simulate',
    GET_DEPOSIT: BASE_URL + '/:depositId',
    PUT_DEPOSIT: BASE_URL + '/:depositId',
    PUT_ALIAS: BASE_URL + '/:depositId/alias',
    GET_RENEWALS: BASE_URL + '/:depositId/renewals',
    GET_RETENTIONS: BASE_URL + '/:depositId/retentions',
    GET_LOCKS: BASE_URL + '/:depositId/locks',
    UPDATE_ALIAS: BASE_URL + '/:depositId/alias',
};

