import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';
import { ConsentsEndpoints } from 'onesait-api';
import { AppConfigService } from '../../services/app-config-service/app-config.service';


@Injectable()
export class ConsentsService {

    serverUrl: string;

    constructor(private req: RequestService,
        private appConfigService: AppConfigService) {
      
        this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL') 
          + this.appConfigService.getServerConfig('PREFIX_CONSENTS');
    }

    getConsents() {
        return this.req.get(this.serverUrl + ConsentsEndpoints.GET_CONSENTS);
    }

    postConsents(consentsId: string) {
        let opts: RequestServiceOptions = {};
        return this.req.post(this.serverUrl +ConsentsEndpoints.POST_CONSENTS, opts, {consentsId: consentsId});
    }
}
