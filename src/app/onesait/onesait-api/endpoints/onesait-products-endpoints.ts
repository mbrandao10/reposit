
const BASE_URL = '/products';

export const ProductsEndpoints = {
    BASIC: BASE_URL,
    GET_ACCOUNTS: BASE_URL + '/accounts',
    GET_ACCOUNTS_PRODUCT: BASE_URL + '/accounts/:productCode',
    GET_CARDS_CREDIT: BASE_URL + '/cards/credit',
    GET_CARDS_DEBIT: BASE_URL + '/cards/debit',
    GET_CREDITS: BASE_URL + '/credits',
    GET_CREDITS_PRODUCT: BASE_URL + '/credits/:productCode',
    GET_EQUITIES: BASE_URL + '/equities',
    GET_CONFIRMING: BASE_URL + '/confirming',
    GET_CONFIRMING_PRODUCT: BASE_URL + '/confirming/:productCode',
    GET_FACTORING: BASE_URL + '/factoring',
    GET_FACTORING_PRODUCT: BASE_URL + '/factoring/:productCode',
    GET_FUNDS: BASE_URL + '/funds',
    GET_FUNDS_PRODUCT: BASE_URL + '/funds/:productCode',
    GET_LOANS: BASE_URL + '/loans',
    GET_LOANS_PRODUCT: BASE_URL + '/loans/:productCode',
    GET_DEPOSITS: BASE_URL + '/term-deposits',
    GET_DEPOSITS_PRODUCT: BASE_URL + '/term-deposits/:productCode'
};
