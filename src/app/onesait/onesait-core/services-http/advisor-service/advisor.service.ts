import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultResponse, UsersEndpoints } from 'onesait-api';
import { RequestService } from '../../services/request-service/request.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';

@Injectable()
export class AdvisorService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService
  ) {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_USERS');
  }



  getMyAdvisor(): Observable<ResultResponse> {
    return this.req.get(this.serverUrl + UsersEndpoints.GET_MYADVISOR).pipe(map(res => {
      return res.data;
    }))
  }

  // sendMessage(params: any): Observable<ResultResponse> {
  //   return this.req.post(this.serverUrl + UsersEndpoints.SEND_MESSAGE, params).pipe(map(res => {
  //     return res;
  //   }));
  // }

}
