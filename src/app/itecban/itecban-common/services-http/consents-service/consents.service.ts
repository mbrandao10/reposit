import { Injectable } from '@angular/core';
import { ConsentsEndpoints } from 'onesait-api';
import { RequestService, RequestServiceOptions, AppConfigService, UtilsService } from 'onesait-core';


@Injectable()
export class ConsentsService {

    serverUrl: string;
    urlAux = true;
    // this.serverUrl = 'https://10.22.205.101:8443/psd2/v1';
    constructor(
        private req: RequestService,
        private appConfigService: AppConfigService,
        private utilsService: UtilsService
    ) {
        if (!this.urlAux) {
            this.serverUrl = 'http://10.31.98.15/api-psd2-consents/v1';
        } else {
            this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
                + this.appConfigService.getServerConfig('PREFIX_CONSENTS');
        }
    }

    getConsents() {
        let userId: string;
        let user = this.utilsService.getUser();
        let userAux = user.activeProfile;
        console.log('USUARIO --> ', userAux);
        if (!this.urlAux) {
            let opts = {
                'X-CHANNEL-KEY': 'PBE',
                'X-USER-PROFILE-ID': userAux,
            };
            return this.req.get(this.serverUrl + ConsentsEndpoints.GET_CONSENTS_AUX, { consentsId: userId }, opts);
        } else {
            return this.req.get(this.serverUrl + ConsentsEndpoints.GET_CONSENTS);
        }
    }

    postConsents(consentsId: string) {
        let opts: RequestServiceOptions = {};
        return this.req.post(this.serverUrl + ConsentsEndpoints.POST_CONSENTS, { consentsId: consentsId }, opts);
    }

    removeConsents(consentsId: string) {
        let opts: RequestServiceOptions = {};
        return this.req.delete(this.serverUrl + ConsentsEndpoints.DELETE_CONSENTS, { consentsId: consentsId }, opts);
    }

    getFundsConfirmations(consentsId: string) {
        if (!this.urlAux) {
            let opts = {
                'X-CHANNEL-KEY': 'PBE',
                'X-USER-PROFILE-ID': '002704794302',
            };
            return this.req.get(this.serverUrl + ConsentsEndpoints.GET_FUNDS_CONFIRMATIONS, {consentsId: consentsId}, opts );
        } else {
            return this.req.get(this.serverUrl + ConsentsEndpoints.GET_FUNDS_CONFIRMATIONS, {consentsId: consentsId});
        }

    }
}
