const BASE_URL = '/loans';

export const LoansEndpoints = {
    GET_LOANS: BASE_URL,
    POST_NEW_LOAN: BASE_URL,
    GET_LOANS_PRE_GRANTED: BASE_URL + '/pre-granted',
    GET_LOANS_REPAYMENTS: BASE_URL + '/:id/repayments',
    GET_LOANS_RECEIPTS: BASE_URL + '/:id/receipts',
    GET_LOANS_DETAIL: BASE_URL + '/:id',
    GET_MOVEMENTS: BASE_URL + '/:loanAccountId/movements',
    DELETE_LOANS: BASE_URL + '/:id',
    GET_REPAYMENTS_TYPES: BASE_URL + '/dataCatalogs/repaymentTypes',
    GET_LOANS_CREDITMATRIX: BASE_URL + '/pre-granted/:productCode/creditMatrix',
    POST_LOAN_SIMULATION: BASE_URL + '/:loanAccountId/repayments/simulate',
    POST_LOAN_REPAYMENTS: BASE_URL + '/:loanAccountId/repayments',
    POST_LOAN: BASE_URL + '/:id/repayments',
    POST_LOANS_PRE_GRANTED: BASE_URL + '/pre-granted',
    UPDATE_ALIAS: BASE_URL + '/:id/alias',
    GET_LOAN_SIMULATE_CANCEL: BASE_URL + '/:id/_simulateCancel',
    GET_LOAN_PRODUCT: BASE_URL + '/products/:productCode'

};
