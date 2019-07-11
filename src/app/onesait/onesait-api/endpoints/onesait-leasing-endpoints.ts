const BASE_URL = '/leasing';

export const LeasingEndpoints = {
    BASIC: BASE_URL,
    GET_CONTRACTS: BASE_URL,
    GET_CONTRACT: BASE_URL + '/:contractId',
    GET_REPAYMENTS : BASE_URL + '/:contractId/repayments'
};
