import { Injectable } from '@angular/core';
import { RequestService, AppConfigService } from 'onesait-core';
import { CashpoolingEndpoints, GenericListResponse, AccountCashPooling } from 'onesait-api';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CashpoolingService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService
  ) {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_CASH_POOLING');
  }

  getCashpoolingAccounts(accountId: any, params: any ): Observable<GenericListResponse<AccountCashPooling>> {
    if (!params) { params = {}; }
    params.accountId = accountId;

    return this.req.get(this.serverUrl + CashpoolingEndpoints.GET_CASHPOOLING_ACCOUNTS, params);
  }

  getRelationShip() {
    return this.req.get(this.serverUrl + CashpoolingEndpoints.GET_RELATIONSHIP);
  }
}
