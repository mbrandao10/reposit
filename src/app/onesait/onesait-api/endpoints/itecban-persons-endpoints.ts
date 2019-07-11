
const BASE_URL = '';

export const PersonsEndpoints = {
    BASIC: BASE_URL + '/customers',
    GET_PERSONAL_DATA: BASE_URL + '/customers',
    UPDATE_PERSONAL_DATA: BASE_URL + '/customers',
    GET_GLOBALPOSITION: BASE_URL + '/customers/position',
    GET_PRODUCTS: BASE_URL + '/customers/products',
    GET_GENDERS: BASE_URL + '/customers/dataCatalogs/genders',
    GET_MARITAL_STATUS: BASE_URL + '/customers/dataCatalogs/maritalStatus',
    GET_STREET_TYPES: BASE_URL + '/customers/dataCatalogs/streetTypes',
    GET_BOND_TYPES: BASE_URL + '/customers/dataCatalogs/bondType',
    GET_ECONOMIC_REGIME_URL: BASE_URL + '/customers/dataCatalogs/economicRegime',
    GET_PHONE_PREFIXES: BASE_URL + '/customers/dataCatalogs/phoneNumberPrefixes',
    GET_ADDRESS_TYPES: BASE_URL + '/customers/dataCatalogs/addressTypes',
    GET_ADDRESS_PERSONAL_DATA: BASE_URL + '/customers/addresses',
    UPDATE_ADDRESS_PERSONAL_DATA: BASE_URL + '/customers/addresses/:addressId',
    GET_FISCAL_RELATION_TYPES: BASE_URL + '/customers/dataCatalogs/fiscalRelationTypes',
    GET_PROVINCES: BASE_URL + '/customers/dataCatalogs/states',
    GET_CITIES: BASE_URL + '/customers/dataCatalogs/cities',
    PIN: BASE_URL + '/customers/pin',
    GET_INVERSIS_SINGLE_SIGN_ON: BASE_URL + '/customers/_externalSignIn'

    // NO EXISTEN EN EL API


};

export const SignaturesEndpoints = {
    BASIC:  '/signatures',
    GET_PENDING_OPERATIONS:  '/signatures/pendingOperations',
    GET_PENDING_OPERATION_DETAIL:  '/signatures/pendingOperations/:id',
    PUT_PENDING_OPERATION_DETAIL:  '/signatures/pendingOperations/:id',
    GET_PENDING_SIGNATURES_SIGNER_STATUS_TYPES:  '/signatures/dataCatalogs/signerStatusTypes',
    GET_PENDING_SIGNATURES_OPERATION_STATUS_TYPES:  '/signatures/dataCatalogs/operationStatusTypes',
    GET_PENDING_SIGNATURES_OPERATION_GROUP_TYPES:  '/signatures/dataCatalogs/operationGroupTypes',
};
