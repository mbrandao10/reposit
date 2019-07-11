import { Injectable } from '@angular/core';
import { UtilsService } from '../utils-service/utils.service';
import { constants } from '../../config/constants';
import { Subject, Observable } from 'rxjs';
import { RequestServiceOptions, RequestService } from '../request-service/request.service';
import { Token, LoginEndpoints, User } from 'onesait-api';
import { AppConfigService } from '../app-config-service/app-config.service';
import { map, debounceTime } from 'rxjs/operators';

@Injectable()
export class TokenService {

  serverUrl: string;

  notify = new Subject<any>();
  notifyObservable: Observable<any> = this.notify.asObservable();

  ms: number;
  tokenExpiration: number;
  remainingSessionTime: number;
  refresh = false;

  interval = 10000;
  thresholdTime = 20000;
  initTimeOut = 3000;
  user: User;

  constructor(private req: RequestService,
    private utilsService: UtilsService,
    private appConfigService: AppConfigService) {
  }

  init() {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL');
    this.tokenExpiration = +this.utilsService.getItemSessionStorage(constants.TOKEN_EXPIRATION);
    this.user = JSON.parse(this.utilsService.getItemSessionStorage(constants.USER));
    if (this.tokenExpiration && this.user) {
      this.refreshTokenExpiration();
    } else {
      setTimeout(() => {
        this.init();
      }, this.initTimeOut);
    }
  }

  refreshTokenExpiration() {
    // console.log("RefreshToken");
    this.checkTokenExpiration();
    this.notifyObservable.subscribe(() => {
      this.postRefreshToken();
    });
  }

  checkTokenExpiration() {
    // console.log("checkTokenExpiration");
    let dateTime: number;

    this.ms = window.setInterval(() => {
      // console.log("Interval");
      if (!this.tokenExpiration || this.tokenExpiration === 0 || this.refresh) {
        this.tokenExpiration = +this.utilsService.getItemSessionStorage(constants.TOKEN_EXPIRATION);
        this.refresh = false;
        // console.log("Get session data " + this.tokenExpiration);
      }

      dateTime = new Date().getTime();
      this.remainingSessionTime = this.tokenExpiration - dateTime;

      if ((this.tokenExpiration != 0) && (this.tokenExpiration > 0) && (this.remainingSessionTime <= this.thresholdTime)) {
        if (this.utilsService.getItemSessionStorage(constants.TOKEN_REFRESH)!= null) {
          // console.log("Notify");
          this.notify.next();
        }
      }
    }, this.interval);
  }

  postRefreshToken() {
    // console.log("postRefreshToken");
    let opts: RequestServiceOptions = {};
    let params = new FormData();

    this.req.setHeader('Authorization', this.appConfigService.getConfig('BASIC_HEADER_AUTHORIZATION'));
    opts.disableError401 = true;

    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', this.utilsService.getItemSessionStorage(constants.TOKEN_REFRESH));

    this.req.post(this.serverUrl + LoginEndpoints.POST_LOGIN, params, opts).pipe(debounceTime(this.interval), map((res: any) => {
      return Token.createTokenfromAny(res);
    })).subscribe((result: Token) => {
      // console.log(result);
      this.req.deleteHeader('Authorization');
      this.req.setHeader('Authorization', 'Bearer ' + result.access_token);

      this.utilsService.setItemSessionStorage(constants.ACCESS_TOKEN, result.access_token);
      this.utilsService.setItemSessionStorage(constants.TOKEN_EXPIRATION, new Date().getTime() + result.expires_in * 1000);
      this.utilsService.setItemSessionStorage(constants.TOKEN_REFRESH, result.refresh_token);
      this.refresh = true;
    }, e => {
      console.error('Token' + e);
      this.stopCheckToken();
    });
  }

  stopCheckToken() {
    clearInterval(this.ms);
    if (this.notify) {
      this.notify.unsubscribe;
    }
    this.init();
  }
}
