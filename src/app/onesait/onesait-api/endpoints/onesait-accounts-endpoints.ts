const BASE_URL = '/accounts';

export const AccountsEndpoints = {
    BASIC: BASE_URL,
    GET_ACCOUNTS: BASE_URL,
    GET_ACCOUNT: BASE_URL + '/:id',
    POST_CANCEL: BASE_URL + '/:accountId/cancellation',
    GET_CANCEL_ACCOUNT: BASE_URL + '/:id/cancellation/_simulate',

    /*
    GET_PRODUCTS: BASE_URL + '/products',
    */
    GET_PRODUCT: BASE_URL + '/products/:code',
    GET_MOVEMENTS: BASE_URL + '/:accountId/movements',
    GET_MOVEMENT: BASE_URL + '/:accountId/movements/:movementId',
    GET_INTERVENERS: BASE_URL + '/:accountId/interveners',
    GET_RETENTIONS: BASE_URL + '/:accountId/retentions',
    GET_LOCKED: BASE_URL + '/:accountId/locks',
    GET_INCOME_AND_SPENDING: BASE_URL + '/:accountId/reports/incomeAndSpending',
    GET_ACCOUNT_FORMATS: BASE_URL + '/dataCatalog/accountFormats',
    GET_PARTICIPATION_TYPES: BASE_URL + '/dataCatalog/participationDispositionTypes',
    SAVE_ACCOUNT: BASE_URL,
    UPDATE_ALIAS: BASE_URL + '/:accountId/alias',
    POST_INTERVENERS: BASE_URL + '/:accountId/interveners',
    POST_STATEMENT_REQUESTS: BASE_URL + '/:accountId/statementRequests',
    POST_CONTRACT_CHECKBOOK: BASE_URL + '/:accountId/chequeBooks',
    POST_STATEMENTS: BASE_URL + '/:accountId/reports/statements',
    GET_CHECKBOOK_TYPES: BASE_URL + '/dataCatalogs/chequeBookTypes',
    GET_SETTLEMENT_DATES: BASE_URL + '/:accountId/reports/settlement/settlementDates',
    GET_SETTLEMENT: BASE_URL + '/:accountId/reports/settlement'
};
