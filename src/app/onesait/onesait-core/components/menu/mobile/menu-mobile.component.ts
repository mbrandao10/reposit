import { Component, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserMenuConfig } from '../../../models/interfaces/user-menu-config.interface';
import { MenuService } from '../../../services/menu-service/menu.service';
import { UtilsService } from '../../../services/utils-service/utils.service';
import { MenuComponent } from '../menu.component';
import { Subscription } from 'rxjs';
import { UserSessionService } from '../../../services/user-session-service/user-session.service';
import { AppConfigService } from '../../../services/app-config-service/app-config.service';
import { DeviceUtilsService } from '../../../services/device-utils-service/device-utils.service';



@Component({
  selector: 'osb-menu-mobile',
  templateUrl: './menu-mobile.component.html'
})
export class MenuMobileComponent extends MenuComponent implements OnDestroy {

  @Input()
  userMenuConfig: UserMenuConfig;

  SUBMENU_TOP = 'menu_padding_top_mobile';
  show: boolean;

  private subscription: Subscription;


  constructor(
    router: Router,
    renderer: Renderer2,
    utilsService: UtilsService,
    userSessionService: UserSessionService,
    appConfigService: AppConfigService,
    menuService: MenuService,
    deviceUtilsService: DeviceUtilsService
  ) {
    super(router, renderer, utilsService, userSessionService, appConfigService, menuService, deviceUtilsService);
    this.subscription = menuService.notifyObservable.subscribe((value) => {
      if (value.action === 'showMenu') {
        this.show = true;
      } else if (value.action === 'closeMenu') {
        this.show = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  viewGlobalPosition() {
    this.menuService.closeMenu();
    super.viewGlobalPosition();
  }

}
