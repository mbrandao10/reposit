
const BASE_URL = '/documents';

export const DocumentsEndpoints = {
    BASIC: BASE_URL,
    GET_DOCUMENT: BASE_URL + '/:id',
    GET_CATEGORIES: BASE_URL + '/dataCatalogs/categories',
    GET_TYPES: BASE_URL + '/categories/:id/types',
    GET_COUNTER: BASE_URL + '/counter'
};
