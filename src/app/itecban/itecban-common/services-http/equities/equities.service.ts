import { Injectable } from '@angular/core';
import { RequestService, SignatureEntity, RequestServiceOptions, AppConfigService } from 'onesait-core';
import { EquitiesEndpoints, GenericResponse, GenericListResponse } from 'onesait-api';
import { Observable } from 'rxjs';
import { EquitiesCreateSuccess, AccountsEquitiesLinkable, EquitiesList } from '../../interfaces/equities/equities.interface';



@Injectable({
  providedIn: 'root'
})
export class EquitiesService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
    + this.appConfigService.getServerConfig('PREFIX_EQUITIES');
  }

  getEquities(accountId?: any): Observable<GenericListResponse<EquitiesList>> {
    let params;
    if (accountId) {
      params = {
        accountEquityId: accountId
      };
    }
    return this.req.get(this.serverUrl + EquitiesEndpoints.GET_EQUITIES, params);
  }

  postEquity(equity: any, signatureEntity?: SignatureEntity): Observable<GenericResponse<EquitiesCreateSuccess>>  {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + EquitiesEndpoints.POST_EQUITY, equity, opts);
  }

  getAccountsLinkable(): Observable<GenericListResponse<AccountsEquitiesLinkable>> {
    return this.req.get(this.serverUrl + EquitiesEndpoints.GET_ACCOUNTS_LINKABLE);
  }

}
