import { Injectable } from '@angular/core';
import { RequestService } from '../request-service/request.service';
import { UserSessionService } from '../user-session-service/user-session.service';
import { map } from 'rxjs/operators';
import { LoginEndpoints } from 'onesait-api';
import { Observable } from 'rxjs';
import { Token } from 'onesait-api';
import { AppConfigService } from '../app-config-service/app-config.service';

@Injectable()
export class LoginService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private sessionService: UserSessionService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL');
  }

  loginUserPassword(myCredentials: FormData): Observable<Token> {
    return this.req.post( this.serverUrl + LoginEndpoints.POST_LOGIN, myCredentials, {disableError401: true}).pipe(map( (res: any) => {
      return Token.createTokenfromAny( res );
    }));
  }

  // getProfiles(): Observable<Profile[]> {
  //   return this.req.get( this.serverUrl + LoginEndpoints.GET_PROFILES).pipe(map( (res: any) => {
  //     return Profile.createProfilefromAnyArray( res.data );
  //   }));
  // }
  setProfile(profileId: string) {
    this.sessionService.setActiveProfile(profileId);
  }

  logout() {
    return this.req.delete( this.serverUrl + LoginEndpoints.LOGOUT, undefined);
  }

}
