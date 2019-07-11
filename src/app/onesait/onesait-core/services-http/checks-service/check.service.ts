import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request-service/request.service';
import { Observable } from 'rxjs';
import { GenericListResponse, ChecksEndpoints, Checks, ChecksStatus } from 'onesait-api';
import { Pageable } from '../../models/classes/Pageable';
import { AppConfigService } from '../../services/app-config-service/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService
  ) {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL') + this.appConfigService.getServerConfig('PREFIX_CHEQUES');
  }

  getChecks(accountId: string, consult?: any, pag?: Pageable): Observable<GenericListResponse<Checks>> {
    let params: any;
    if (consult) {
      consult.accountId = accountId;
      params = consult;
    } else {
      params = {
        accountId: accountId
      };
    }
    return this.req.get(this.serverUrl +ChecksEndpoints.GET_CHECKS, params, null, pag);
  }

  getChecksStatus(): Observable<GenericListResponse<ChecksStatus>> {
    return this.req.get(this.serverUrl +ChecksEndpoints.GET_CHECK_STATUS);
  }
}
