
const BASE_URL = '';

export const UsersEndpoints = {
    BASIC: BASE_URL,
    GET_ME: BASE_URL + '/users/me',
    GET_CAMPAIGN: BASE_URL + '/users/me/graphics/:campaignCode',
    POST_CAMPAIGN: BASE_URL + '/users/me/campaign/action',
    GET_MYADVISOR: BASE_URL + '/users/me/myAdvisor'
};

