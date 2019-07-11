import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../utils-service/utils.service';
// import { LoginService } from '../login-service/login.service';
import { RequestService } from '../request-service/request.service';
import { UserSessionService } from '../user-session-service/user-session.service';
import { Subscription } from 'rxjs';
import { LogoutEvent } from '../logoutEvent-Service/logoutEvent.service';
// import { TokenService } from '../token-service/token.service';
// import { map } from 'rxjs/operators';

export interface LogoutInterface {
  logout(): any;
  exit(): void;
}

@Injectable()
export class LogoutService implements LogoutInterface {

  constructor(
    private utils: UtilsService,
    private userSessionService: UserSessionService,
    private requestService: RequestService,
    // private tokenService: TokenService
  ) { }


  logout(): any {
    // this.tokenService.stopCheckToken();
    this.utils.clearSessionStorage();
    this.requestService.deleteHeader('Authorization');
    this.userSessionService.setMaxSessionTimeout(99999999);
  }
  exit(){
    this.logout();
  }
}

@Injectable()
export class LogoutServiceDesktop extends LogoutService implements LogoutInterface {

  subscription: Subscription;

  constructor(
    private router: Router,
    utilsService: UtilsService,
    // private loginService: LoginService,
    userSession: UserSessionService,
    request: RequestService,
    // tokenService: TokenService,
    private logoutEv: LogoutEvent
  ) {
    super(utilsService, userSession, request);
    this.subscription = this.logoutEv.logoutObservable.subscribe(() => {
      this.logout();
    });
  }

  logout(): any {
    // return this.loginService.logout().pipe(map(() => {
    //   super.logout();
    //   let link = ['/errorLogin'];
    //   this.router.navigate(link);
    // }));
    super.logout();
    let link = ['/errorLogin'];
    this.router.navigate(link);
  }

  exit(){
    super.logout();
  }

}
