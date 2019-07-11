import { AccountsEndpoints, PersonsEndpoints, CreditsEndpoints } from 'onesait-api';

import { LoansEndpoints } from 'onesait-api';
import { CardsEndpoints } from 'onesait-api';
import { DepositsEndpoints } from 'onesait-api';
import { ConfirmingEndpoints, FactoringEndpoints } from 'onesait-api';
import { ServerConfig } from './config-server';


export const CacheConfig = {
    entities: ['accounts', 'loans', 'term-deposits', 'cards', 'transfers', 'fixed-term', 'confirming-contracts', 'confirming-contract', 'factoring-contracts', 'factoring-contract', 'factoring-invoice'],
    paths: {
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_CUSTOMERS + PersonsEndpoints.GET_GLOBALPOSITION]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_ACCOUNTS + AccountsEndpoints.GET_ACCOUNTS]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_LOANS + LoansEndpoints.GET_LOANS]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_DEPOSITS + DepositsEndpoints.GET_DEPOSITS]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_CARDS + CardsEndpoints.GET_CARDS]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_CREDITS + CreditsEndpoints.GET_CREDITS]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_CONFIRMING + ConfirmingEndpoints.GET_CONTRACTS]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_CONFIRMING + ConfirmingEndpoints.GET_CONTRACT]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_FACTORING + FactoringEndpoints.GET_CONTRACTS]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_FACTORING + FactoringEndpoints.GET_CONTRACT]: {
            TTL: 60
        },
        [ServerConfig.SERVER_URL + ServerConfig.PREFIX_FACTORING + FactoringEndpoints.GET_INVOICE]: {
            TTL: 60
        }
    },
    entitiesClearCache: {
        'transfers': {
            clearRelatedEntities: ['accounts']
        },
        'accounts': {
            methodsClearCache: ['POST', 'PUT', 'DELETE'],
            /*specificPaths:{
                [AccountsEndpoints.SAVE_ACCOUNT]:{
                    clearPaths: [AccountsEndpoints.GET_ACCOUNTS]
                }
            }*/
        },
        'loans': {
            methodsClearCache: ['POST', 'PUT', 'DELETE'],
            clearRelatedEntities: ['accounts', 'loans']
        },
        'fixed-term': {
            methodsClearCache: ['POST', 'PUT', 'DELETE'],
            clearRelatedEntities: ['accounts']
        },
        'cards': {
            methodsClearCache: ['POST', 'PUT', 'DELETE']
        },
        'confirming-contracts': {
            methodsClearCache: ['POST', 'PUT', 'DELETE'],
        },
        'factoring-contracts': {
            methodsClearCache: ['POST', 'PUT', 'DELETE'],
        }
    }
};
