import { Injectable } from '@angular/core';
import { constants, AppConfigService } from 'onesait-core';
import { RequestService, RequestServiceOptions } from 'onesait-core';
import { NotificationsEndpoints } from 'onesait-api';

@Injectable()
export class NotificationsService {

    serverUrl: string;

    constructor(
        private req: RequestService,
        private appConfigService: AppConfigService
        ) {
        this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
        + this.appConfigService.getServerConfig('PREFIX_NOTIFICATIONS');
    }

    getAlerts() {
        return this.req.get(this.serverUrl + NotificationsEndpoints.GET_EVENTS);
    }

    getAlertsId(eventId: any, token: any) {
        let headers: any = {};
        headers[constants.SIGNATURE_KEY] = token;
        let params = {eventId: eventId};
        return this.req.delete(this.serverUrl + NotificationsEndpoints.GET_EVENTS_ID, params, {headers: headers});
    }

    getPeriods() {
        return this.req.get(this.serverUrl + NotificationsEndpoints.GET_PERIODS);
    }

    getSubscriptions(linkedElementId: any, eventGroup: any, opts?: RequestServiceOptions) {
        let params = {linkedElementId: linkedElementId, eventGroup: eventGroup};
        return this.req.get(this.serverUrl + NotificationsEndpoints.GET_SUSCRIPTIONS, params, opts);
    }

    putSubscription(params: any, token: any) {
        let headers: any = {};
        headers[constants.SIGNATURE_KEY] = token;
        return this.req.put(this.serverUrl + NotificationsEndpoints.GET_SUSCRIPTIONS, params, {headers: headers});
    }

    postSubscription(params: any, token: any) {
        let headers: any = {};
        headers[constants.SIGNATURE_KEY] = token;
        return this.req.post(this.serverUrl + NotificationsEndpoints.GET_SUSCRIPTIONS, params, {headers: headers});
    }

    deleteSubscription(params: any, token: any) {
        let headers: any = {};
        headers[constants.SIGNATURE_KEY] = token;
        return this.req.deleteWithBody(this.serverUrl + NotificationsEndpoints.GET_SUSCRIPTIONS, params, {headers: headers});
    }
}
