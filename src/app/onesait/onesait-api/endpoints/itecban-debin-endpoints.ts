const BASE_URL = '/debin';

export const DebinEndpoints = {
    BASIC: BASE_URL,
    POST_DEBIN: BASE_URL,
    POST_SIMULATE_DEBIN: BASE_URL + '/_simulate',
    GET_LINKED_ACCOUNTS: BASE_URL + '/linkedAccounts',
    POST_LINKED_ACCOUNT: BASE_URL + '/linkedAccounts',
    DELETE_LINKED_ACCOUNT: BASE_URL + '/linkedAccounts/:accountId',
    GET_DEBINS: BASE_URL + '/payments',
    GET_COUNTER_DEBIN_PENDIENT: BASE_URL + '/payments/counter',
    GET_DEBIN_DETAIL: BASE_URL + '/payments/:debinId',
    POST_CONFIRM_DEBIN: BASE_URL + '/payments/:debinId/_confirm',
    POST_DISCARD_DEBIN: BASE_URL + '/payments/:debinId/_discard',
    POST_CANCEL_DEBIN: BASE_URL + '/payments/:debinId/_cancel',
    GET_PREAUTH: BASE_URL + '/preauth',
    POST_PREAUTH: BASE_URL + '/preauth',
    POST_CONFIRM_PREAUTH: BASE_URL + '/preauth/:preauthId/_confirm',
    POST_DISCARD_PREAUTH: BASE_URL + '/preauth/:preauthId/_discard',
    POST_CANCEL_PREAUTH: BASE_URL + '/preauth/:preauthId/_cancel',
    POST_PREAUTH_DEBIN_ACTION: BASE_URL + '/preauth/:preauthId/_doAction',
    GET_LIMITS: BASE_URL + '/limits',
    GET_CONSUMPTIONS: BASE_URL + '/consumptions',
    GET_STATUS_TYPES: BASE_URL + '/dataCatalogs/statusTypes',
    GET_PREAUTH_STATUS_TYPES: BASE_URL + '/dataCatalogs/preauth/statusTypes',
    GET_CONCEPT_TYPES: BASE_URL + '/dataCatalogs/conceptTypes',
    GET_EXPIRATION_TIMES: BASE_URL + '/dataCatalogs/expirationTimeOptions',
    GET_PREAUTH_PERIOD_OPTIONS: BASE_URL + '/dataCatalogs/preauth/periodOptions'
};
