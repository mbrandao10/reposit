import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserMenuConfig } from '../../../../models/interfaces/user-menu-config.interface';
import { UserMenuComponent } from '../../../user-menu/user-menu.component';
import { LogoutService } from '../../../../services/logout-service/logout.service';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { MenuService } from '../../../../services/menu-service/menu.service';
import { AppConfigService } from '../../../../services/app-config-service/app-config.service';

@Component({
  selector: 'osb-user-menu-mobile-top',
  templateUrl: './top/user-menu-mobile-top.component.html'
})
export class UserMenuMobileTopComponent extends UserMenuComponent {

  @Input()
  userMenuConfig: UserMenuConfig;
  col: string;

  constructor(
    router: Router,
    logoutService: LogoutService,
    modalService: ModalService,
    private menuService: MenuService,
    private appConfigService: AppConfigService
  ) {
    super(router, logoutService, modalService);

    this.resizeCol(this.appConfigService.getConfig('userMenuConfig.sections').length);
  }

  goTo(element) {
    this.menuService.closeMenu();
    super.goTo(element);
  }

  resizeCol(size: number) {

    switch (size) {
      case 2:
        this.col = 'col-xs-6';
        break;
      case 3:
        this.col = 'col-xs-4';
        break;
      case 4:
        this.col = 'col-xs-3';
        break;
      case 5:
      case 6:
        this.col = 'col-xs-2';
        break;
      default:
        this.col = 'col-xs-1';
        break;
    }
  }


}

@Component({
  selector: 'osb-user-menu-mobile-bottom',
  templateUrl: './bottom/user-menu-mobile-bottom.component.html'
})
export class UserMenuMobileBottomComponent extends UserMenuComponent {

  @Input()
  userMenuConfig: UserMenuConfig;
  @Input() lastConnectionDate: any;

  constructor(
    router: Router,
    logoutService: LogoutService,
    modalService: ModalService,
    private menuService: MenuService
  ) {
    super(router, logoutService, modalService);
  }

  goTo(element) {
    this.menuService.closeMenu();
    super.goTo(element);
  }


}
