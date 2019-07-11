
const BASE_URL = '';
export const LoginEndpoints = {
    BASIC: BASE_URL,
    // GET_PROFILES: BASE_URL + '/user/profiles',
    POST_LOGIN: BASE_URL + '/auth-server/oauth/token',
    POST_PROFILE: BASE_URL + '/set_profile',
    LOGOUT: BASE_URL + '/user/session'
};

export const ResourceEndpoints = {
    GET_RESOURCE: BASE_URL + '/resource/:name',
};
