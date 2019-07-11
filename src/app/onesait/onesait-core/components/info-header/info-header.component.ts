import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { InfoHeaderService } from '../../services/info-header-service/info-header.service';
import { UserSessionService } from '../../services/user-session-service/user-session.service';
import { LogoutService } from '../../services/logout-service/logout.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { DeviceUtilsService } from '../../services/device-utils-service/device-utils.service';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'osb-info-header',
  templateUrl: './info-header.component.html'
})
export class InfoHeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  show: any;
  showLogout: any;
  action: string | null;
  message: string;
  type: string;
  time: number;
  lbTime: string;
  bgColor: string;
  intervalo: any;

  constructor(
    private infoHeaderService: InfoHeaderService,
    private userSession: UserSessionService,
    private usersService: UsersService,
    private logoutService: LogoutService,
    private appConfigService: AppConfigService,
    protected deviceUtilsService: DeviceUtilsService
  ) {

  }

  ngOnInit() {
    let me = this;

    this.subscription = this.infoHeaderService.notifyObservable.subscribe((value) => {

      if (value.action === 'show') {
        this.message = value.message;
        this.show = true;
        this.type = value.type;

        if (this.appConfigService.getConfig('infoHeader.timeVisible')) {
          setTimeout(function () {
            me.show = false;
          }, this.appConfigService.getConfig('infoHeader.timeVisible'));
        }
      }
    });

    this.intervalo = setInterval(function () {
      me.time = Math.floor(me.userSession.getSessionTimeoutLimit() / 1000);
      if (me.userSession.getSessionTimeoutLimit() < 60000) {
        me.lbTime = me.time.toString();
        if (me.time < 1) {
          me.logoutService.logout();
          me.stopIntervalo();
        }
        me.showLogout = true;
      } else {
        me.showLogout = false;
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.show = false;
  }

  stopIntervalo() {
    clearInterval(this.intervalo);
  }

  ping() {
    let me = this;
    this.usersService.getUserInformation().subscribe();
    setTimeout(function () {
      me.time = Math.floor(me.userSession.getSessionTimeoutLimit() / 1000);
    }, 1000);
    this.show = false;
    this.action = null;
  }


}
