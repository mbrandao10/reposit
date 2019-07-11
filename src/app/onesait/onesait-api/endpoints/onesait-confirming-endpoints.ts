const BASE_URL = '/confirming';

export const ConfirmingEndpoints = {
    BASIC: BASE_URL,
    GET_CONTRACTS: BASE_URL,
    POST_CONTRACT: BASE_URL,
    GET_CONTRACT: BASE_URL + '/:id',
    GET_ORDERS: BASE_URL + '/:id/orders',
    POST_ORDERS: BASE_URL + '/:id/orders',
    GET_REMITTANCES: BASE_URL + '/:id/remittances',
    POST_REMITTANCES: BASE_URL + '/bulk-uploader/:id/_uploadFile',
    POST_REMITTANCES_CONFIRM: BASE_URL + '/bulk-uploader/:id/_confirmUpload',
    GET_SUPPLIERS: BASE_URL + '/suppliers',
    GET_ADVANCES: BASE_URL + '/advances',
    POST_ORDER_ADVANCE: BASE_URL + '/advances/:orderId/_advance/_simulate',
    POST_ORDER_ADVANCE_CONFIRM: BASE_URL + '/advances/:orderId/_advance',
    GET_ORDER_TYPES: BASE_URL + '/dataCatalogs/orderStatusTypes',
    GET_REMITTANCE_TYPES: BASE_URL + '/dataCatalogs/remittanceStatusTypes',
    GET_SUPPLIER_COUNTRIES: BASE_URL + '/dataCatalogs/supplierCountries'
};
