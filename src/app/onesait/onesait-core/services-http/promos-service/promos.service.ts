import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultResponse, UsersEndpoints } from 'onesait-api';
import { RequestService } from '../../services/request-service/request.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';


@Injectable()
export class PromosService {
  serverUrl: string;
  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_USERS');
  }

  getPromo(campaignCode?: string): Observable<ResultResponse> {
    return this.req.get(this.serverUrl + UsersEndpoints.GET_CAMPAIGN, { campaignCode: campaignCode }).pipe(map(res => {
      return res;
    }));
  }

  postPromo(campaignCode: string): Observable<ResultResponse> {
    let params = {
      campaignCode: campaignCode,
      action: 'Deactivate'
    }
    return this.req.post(this.serverUrl + UsersEndpoints.POST_CAMPAIGN, params).pipe(map(res => {
      return res;
    }));
  }

}
