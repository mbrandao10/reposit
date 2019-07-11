const BASE_URL = '/factoring';

export const FactoringEndpoints = {
    BASIC: BASE_URL,
    GET_CONTRACTS: BASE_URL,
    POST_CONTRACTS: BASE_URL,
    GET_CONTRACT: BASE_URL + '/:contractId',
    GET_INVOICES: BASE_URL + '/:contractId/invoices',
    GET_INVOICE: BASE_URL + '/:contractId/invoices/:invoiceId',
    POST_INVOICE_ADVANCE: BASE_URL + '/:contractId/invoices/:invoiceId/advance',
    POST_INVOICE_SIMULATION: BASE_URL + '/:contractId/invoices/:invoiceId/advanceSimulation',
    GET_INVOICE_TYPES: BASE_URL + '/dataCatalogs/invoicesStatusTypes',
    POST_INVOICE_FILE: BASE_URL + '/invoices-bulk-uploader/:contractId/_uploadFile',
    POST_INVOICE_FILE_CONFIRM: BASE_URL + '/invoices-bulk-uploader/:contractId/_confirmUpload'
};
