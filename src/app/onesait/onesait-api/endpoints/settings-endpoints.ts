const BASE_URL = '';

export const SettingsEndpoints = {
    BASIC: BASE_URL + '/settings',
    // PUT_CHANGE_PASSWORD: BASE_URL+"/settings/password",
    PUT_CHANGE_PASSWORD: '/users/me/password',
    PUT_CHANGE_SIGNATUREKEY: '/users/me/signatureKey',
    GET_PUBLIC_RESOURCE: BASE_URL + '/public_resource/version',
    POST_CARD_ACTIVATE: BASE_URL + '/users/me/card/:action'
};
