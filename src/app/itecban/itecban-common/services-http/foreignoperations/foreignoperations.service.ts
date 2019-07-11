import { Injectable } from '@angular/core';
import { RequestService, AppConfigService } from 'onesait-core';
import { ForeingOperationsEndpoints } from 'onesait-api';

@Injectable({
  providedIn: 'root'
})
export class ForeignoperationsService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
    + this.appConfigService.getServerConfig('PREFIX_FOREIGN_OPERATIONS');
  }

  getExchangeCurrency(params: any) {
    return this.req.get(this.serverUrl + ForeingOperationsEndpoints.GET_EXCHANGE_CURRENCY, params);
  }
}
