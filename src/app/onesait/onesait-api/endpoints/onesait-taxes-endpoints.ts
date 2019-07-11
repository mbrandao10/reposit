const BASE_URL = '/taxes';

export const TaxesEndpoints = {
    BASIC: BASE_URL,
    GET_TAXES: BASE_URL + '/:organism',
    POST_TAXES: BASE_URL, // + '/:organism', //Se añade el organismo en el servicio
    GET_TAX_TYPES: BASE_URL + '/:organism/dataCatalogs/taxPaymentTypes',
    GET_TAX_FORMS: BASE_URL + '/:organism/dataCatalogs/:taxPaymentType/taxForms',
    GET_TAX_YEARS: BASE_URL + '/:organism/dataCatalogs/taxYears',
    GET_TAX_PERIODS: BASE_URL + '/:organism/dataCatalogs/:taxPaymentType/taxPeriods',
    GET_TAX_ISSUER_ENTITIES: BASE_URL + '/:organism/dataCatalogs/:taxPaymentType/issuerEntities'
};
