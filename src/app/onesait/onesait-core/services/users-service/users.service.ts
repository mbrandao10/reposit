import { Injectable } from '@angular/core';
import { RequestService } from '../request-service/request.service';
import { UserSessionService } from '../user-session-service/user-session.service';
import { UsersEndpoints, User } from 'onesait-api';
import { map } from 'rxjs/operators';
import { AppConfigService } from '../app-config-service/app-config.service';

@Injectable()
export class UsersService {

   serverUrl: string;

  constructor(
      private req: RequestService,
      private sessionService: UserSessionService,
      private appConfigService: AppConfigService
   ) {
      this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL') + this.appConfigService.getServerConfig('PREFIX_USERS');
   }

   getUserInformation() {
      return this.req.get(this.serverUrl + UsersEndpoints.GET_ME).pipe(map( (res: any) => {
         if ( res.data.sessionTimeout ) {
            this.sessionService.setMaxSessionTimeout(res.data.sessionTimeout);
         } else {
            // Establecemos la sessión a 10 min si no viene informada en el servicio.
            this.sessionService.setMaxSessionTimeout(600);
         }
       return User.createUserfromAny( res.data);
      }));
  }

}
