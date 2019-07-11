import { Injectable } from '@angular/core';
import { PensionsEndpoints, GenericListResponse, PensionElement, ManagerCompany, TransferType } from 'onesait-api';
import { Observable } from 'rxjs';

// Se importan por separado porque si se importan todas de 'onesait-core' da el siguiente error.
// Error: Entry point onesait-core has a circular dependency on itself.
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { SignatureEntity  } from '../../services/signature-token-service/signature-token.service';

@Injectable()
export class PensionsService { 
    serverUrl: string;

    constructor(private req: RequestService,
        private appConfigService: AppConfigService) 
    {
        this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL') 
            + this.appConfigService.getServerConfig('PREFIX_PENSIONS');
    }

    getPensions(): Observable<GenericListResponse<PensionElement>> {
        return this.req.get(this.serverUrl + PensionsEndpoints.BASIC);
    }

    getManagerCompanies(): Observable<GenericListResponse<ManagerCompany>> {
        return this.req.get(this.serverUrl + PensionsEndpoints.MANAGER_COMPANIES);
    }

    getTransferTypes(): Observable<GenericListResponse<TransferType>> {
        return this.req.get(this.serverUrl + PensionsEndpoints.TRANSFER_TYPES);
    }

    loadToken(signatureEntity?: SignatureEntity): 
        Observable<GenericListResponse<PensionElement>> 
    {
        let opts: RequestServiceOptions = {};
        opts.headers = signatureEntity? 
            signatureEntity.getHeaders() : null;

        return this.req.post(this.serverUrl + 
            PensionsEndpoints.BASIC, opts);
    }
}