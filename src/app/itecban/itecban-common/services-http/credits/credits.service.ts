import { Injectable } from '@angular/core';
import { RequestService, AppConfigService } from 'onesait-core';
import { CreditsEndpoints } from 'onesait-api';
import { UtilsService } from 'onesait-core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private utilsService: UtilsService,
    private appConfigService: AppConfigService
  ) {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_CREDITS');
  }

  getCredits() {
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_CREDITS).pipe(map(res => {
      for (let item of res.data) {
        this.utilsService.transformAccount(item, item.formats);
      }
      return res;
    }));
  }

  getCredit(id: any) {
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_CREDIT, { id: id }).pipe(map(res => {
      this.utilsService.transformAccount(res.data, res.data.formats);
      return res;
    }));
  }
}
