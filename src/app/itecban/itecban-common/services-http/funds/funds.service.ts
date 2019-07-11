import { Injectable } from '@angular/core';
import { RequestService, SignatureEntity, RequestServiceOptions, AppConfigService } from 'onesait-core';
import { FundsEndpoints, GenericListResponse, GenericResponse } from 'onesait-api';
import { Observable } from 'rxjs';
import { FundCreateSuccess, AccountsFundsLinkable, FundList } from '../../interfaces/funds/funds.interface';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
    + this.appConfigService.getServerConfig('PREFIX_FUNDS');
  }

  getFunds(accountId?: any): Observable <GenericListResponse<FundList>> {
    let params: any;
    if (accountId) {
      params = {
        accountId: accountId
      };
    }
    return this.req.get(this.serverUrl + FundsEndpoints.GET_FUNDS, params);
  }

  postFunds(fund: any, signatureEntity?: SignatureEntity): Observable<GenericResponse<FundCreateSuccess>> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + FundsEndpoints.POST_FUNDS, fund, opts);
  }

  getAccountsLinkable(): Observable<GenericListResponse<AccountsFundsLinkable>> {
    return this.req.get(this.serverUrl + FundsEndpoints.GET_ACCOUNTS_LINKABLE);
  }
}
