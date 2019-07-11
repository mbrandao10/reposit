const BASE_URL = '/credits';

export const CreditsEndpoints = {
    BASIC: BASE_URL,
    GET_CREDITS: BASE_URL,
    POST_CREDITS: BASE_URL,
    GET_PRODUCTS: BASE_URL + '/products/:productCode',
    GET_CREDIT: BASE_URL + '/:creditId',
    GET_INTERVENERS: BASE_URL + '/:creditId/interveners',
    GET_MOVEMENTS: BASE_URL + '/:creditId/movements',
    GET_RETENTIONS: BASE_URL + '/:creditId/retentions',
    GET_LOCKS: BASE_URL + '/:creditId/locks',
    GET_STATUS_TYPES: BASE_URL + '/dataCatalogs/statusTypes',
    GET_PARTICIPANT_TYPES: BASE_URL + '/dataCatalogs/participantTypes',
    GET_MOVEMENT_TYPES: BASE_URL + '/dataCatalogs/movementTypes'
 };
