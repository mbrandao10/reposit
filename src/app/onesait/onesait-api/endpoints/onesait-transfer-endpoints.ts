const BASE_URL = '/transfers';

export const TransferEndpoints = {
    // --- Domestic --- //
    BASIC: BASE_URL ,
    GET_TRANSFER: BASE_URL + '/:transferId',
    DELETE_TRANSFER: BASE_URL + '/:transferId',
    POST_TRANSFER: BASE_URL + '/:transferId',
    POST_SIMULATE: BASE_URL + '/_simulate',

    // --- Periodicos --- //
    GET_PERIODICS: BASE_URL + '/scheduled',
    POST_PERIODIC: BASE_URL + '/scheduled',
    POST_PERIODIC_SIMULATE: BASE_URL + '/scheduled/_simulate',
    GET_PERIODIC_DETAIL: BASE_URL + '/scheduled/:transferId',
    PUT_PERIODIC_ID: BASE_URL + '/scheduled/:transferId',
    DELETE_PERIODIC_ID: BASE_URL + '/scheduled/:transferId',

    // --- DataCatalogs --- //
    GET_ACCOUNT_FORMATS: BASE_URL + '/dataCatalogs/accountFormats',
    GET_LEGAL_DOCUMENTS_TYPES: BASE_URL + '/dataCatalogs/legalDocumentTypes',
    GET_FRECUENCY_TYPES: BASE_URL + '/dataCatalogs/frecuencyTypes',
    GET_TRANSFER_TYPES: BASE_URL + '/dataCatalogs/transferTypes',
    GET_TRANSFER_STATUS: BASE_URL + '/dataCatalogs/statusTypes',
    GET_PURPOSE_TYPES: BASE_URL + '/dataCatalogs/purposeTypes',
    GET_CURRENCIES: BASE_URL + '/dataCatalogs/currencies',
    GET_TRANSFER_MODES: BASE_URL + '/dataCatalogs/transferModes',
    GET_CHARGES: BASE_URL + '/dataCatalogs/transferCharges',
    GET_COUNTRIES: BASE_URL + '/dataCatalogs/countries',

    // --- Favourites --- // No está aún en el API
    GET_FAVOURITES: BASE_URL + '/favorites',
    DELETE_FAVOURITE: BASE_URL + '/favorites/:favoriteId',
    POST_FAVOURITES: BASE_URL + '/favorites'
};
