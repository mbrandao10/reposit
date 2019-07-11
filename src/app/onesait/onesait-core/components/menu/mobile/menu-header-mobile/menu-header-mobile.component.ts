import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../../services/app-config-service/app-config.service';
import { UtilsService } from '../../../../services/utils-service/utils.service';
import { MenuService } from '../../../../services/menu-service/menu.service';
import { HeaderService } from '../../../../services/header-service/header.service';
import { UserSessionService } from '../../../../services/user-session-service/user-session.service';
import { Profile } from 'onesait-api';
import { HttpCacheService } from '../../../../services/cache-service/cache.service';
import { ShareService } from '../../../../services/share-service/share.service';

@Component({
  selector: 'osb-menu-header-mobile',
  templateUrl: './menu-header-mobile.component.html'
})
export class MenuHeaderMobileComponent extends HeaderComponent {

  constructor(
    router: Router,
    appConfigService: AppConfigService,
    utilsService: UtilsService,
    userSessionService: UserSessionService,
    menuService: MenuService,
    headerService: HeaderService,
    httpCacheService: HttpCacheService,
    shareService: ShareService
  ) {
    super(router, appConfigService, utilsService, userSessionService, menuService, headerService, httpCacheService, shareService);
  }

  mySpace() {
    this.close();
    super.mySpace();
  }

  close() {
    this.menuService.closeMenu();
  }


  changeProfileMobile( profile: Profile) {
    if ( profile.id !==  this.userSessionService.getActiveProfile() ) {
      this.menuService.closeMenu();
      this.changeProfile(profile);
    }
  }

}
