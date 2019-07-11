import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterHelperService } from '../router-helper-service/router-helper.service';
import { NotificationsManagerService } from '../notifications-manager/notifications-manager.service';

export interface HttpManagerInterface {
  launch401(): void;
  launch40x(error: any): void;
  launch500(error: any): void;
  launchSession(error: any): void;
}


@Injectable()
export class HttpManagerService implements HttpManagerInterface {

  constructor(
    private router: Router,
    private notificationsManagerService: NotificationsManagerService,
    private translateService: TranslateService
  ) {

  }

  launch401() {
    this.router.navigate(['/']);
  }

  launch40x(error: HttpErrorResponse) {
    let body = error.error;
    let code = 'ERROR.CODE.';
    if (body.result && body.result.errors) {
      code = 'ERROR.CODE.' + body.result.errors[0].errorCode;
    } else {
      code = 'ERROR.CODE.' + error.status;
    }

    this.translateService.get(code).subscribe(result => {
      let message = code !== result ? result : body.result.errors[0].errorDescription;
      this.notificationsManagerService.errorNotificationBusiness( message );
    });
  }

  launch500() {
    this.router.navigate(['/error500']);
  }

  launchSession(error: HttpErrorResponse) {
    let link = RouterHelperService.getPathFromId('errorSession-error', {error: error});
    this.router.navigate([link]);
  }
}
