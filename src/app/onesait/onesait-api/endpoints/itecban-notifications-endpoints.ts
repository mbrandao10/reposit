const BASE_URL = '';

export const NotificationsEndpoints = {
    BASIC: BASE_URL + '/notifications',
    GET_EVENTS: BASE_URL + '/notifications/events',
    GET_EVENTS_ID: BASE_URL + '/notifications/events/:eventId',
    GET_SUSCRIPTIONS: BASE_URL + '/notifications/suscriptions',
    GET_PERIODS: BASE_URL + '/notifications/dataCatalogs/periods'
};


