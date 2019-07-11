const BASE_URL = '/direct-debits';

export const DirectdebitsEndpoints = {
    BASIC: BASE_URL,
    GET_CONTRACTS: BASE_URL + '/contracts',
    POST_CONTRACT: BASE_URL + '/contracts',
    GET_CONTRACT: BASE_URL + '/contracts/:contractId',
    PUT_CONTRACT: BASE_URL + '/contracts/:contractId',
    DELETE_CONTRACT: BASE_URL + '/contracts/:contractId',
    GET_PAYMENTS: BASE_URL + '/contracts/:contractId/payments',
    GET_REFUND_PAYMENTS: BASE_URL + '/contracts/:contractId/refundPayments',
    PUT_PAYMENT: BASE_URL + '/contracts/:contractId/payments/:paymentId',
    GET_PAYMENT_STATUS: BASE_URL + '/dataCatalogs/paymentStatus',
    GET_PAYMENT_RETURN: BASE_URL + '/dataCatalogs/paymentReturnReceipt',
    GET_ENTERPRISE_SERVICES: BASE_URL + '/enterpriseServices'


};
