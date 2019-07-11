const BASE_URL = '/mailBox/conversations';

export const MailboxEndpoints = {
    BASIC: BASE_URL,
    GET_CONVERSATIONS_TRASH: BASE_URL + '/trash',
    GET_CONVERSATION: BASE_URL + '/:id',
    GET_CONVERSATIONS_COUNTER: BASE_URL + '/counter',
    GET_CONVERSATIONS_TYPES: BASE_URL + '/types',
    POST_CONVERSATIONS_RESPOND: BASE_URL + '/:conversationId',
};
