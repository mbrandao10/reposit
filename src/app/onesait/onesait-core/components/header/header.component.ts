import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderConfig, HeaderSectionsConfig } from '../../models/interfaces/header-config.interface';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { UtilsService } from '../../services/utils-service/utils.service';
import { MenuService } from '../../services/menu-service/menu.service';
import { HeaderService } from '../../services/header-service/header.service';
import { RouterHelperService } from '../../services/router-helper-service/router-helper.service';
import { UserSessionService } from '../../services/user-session-service/user-session.service';
import { HeaderTitle } from '../../models/classes/header';

import * as _ from 'underscore';
import { Profile, User } from 'onesait-api';
import { HttpCacheService } from '../../services/cache-service/cache.service';
import { FooterMenuComponent } from '../footer-menu/footer-menu.component';
import { ShareService } from '../../services/share-service/share.service';


@Component({
  selector: 'osb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild(FooterMenuComponent) footerMenu: FooterMenuComponent;

  private subscription: Subscription;

  headerConfig: HeaderConfig;
  headerTitle: HeaderTitle;
  titleMobile: any;
  profiles: Profile[];
  activeProfileName: string;
  activeProfileTitle: string;
  activeProfile: string;
  showMenu: boolean;
  showFooterMenu = false;
  sections: HeaderSectionsConfig[];
  sectionsFooterMenu: HeaderSectionsConfig;

  active = false;

  private subscriptionMenu: Subscription;

  user: User;
  avatarAlias: string;

  // @Output() envio: EventEmitter<any> = new EventEmitter<any>();
  @Input() recivoH: boolean;

  constructor(
    private router: Router,
    public appConfigService: AppConfigService,
    protected utilsService: UtilsService,
    protected userSessionService: UserSessionService,
    protected menuService: MenuService,
    private headerService: HeaderService,
    private httpCacheService: HttpCacheService,
    protected shareService: ShareService
  ) {
    this.getAvatarAlias();

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.headerTitle = null;
      }
    });

    this.subscriptionMenu = this.menuService.notifyObservable.subscribe((value) => {
      if (value.action === 'showMenu') {
        this.showMenu = true;
      } else if (value.action === 'closeMenu') {
        this.showMenu = false;
      }
    });


    this.loadHeadersOption();

    this.profiles = userSessionService.getProfiles();
    this.activeProfile = userSessionService.getActiveProfile();
    this.profiles.forEach(pr => {
      if (pr.id === this.activeProfile) {
        this.activeProfileName = (pr.contractName.length > 20) ? (pr.contractName.substring(0, 17) + '...') : pr.contractName;
        this.activeProfileTitle = pr.relationShip.name;
      }

    });

  }

  ngOnInit() {

    this.subscription = this.headerService.notifyObservable.subscribe((header: HeaderTitle) => {
      this.headerTitle = header;
      if (this.headerTitle.level3) {
        this.titleMobile = this.headerTitle.level3;
      } else if (this.headerTitle.level2) {
        this.titleMobile = this.headerTitle.level2;
      } else {
        this.titleMobile = this.headerTitle.level1;
      }
    });

    this.filterSectionsFooter();
  }

  loadHeadersOption() {
    let sections = this.appConfigService.getConfig('headerConfig.sections');
    let sectionTarget = Object.assign([{}], sections);

    sectionTarget.forEach((section, index, object) => {
      if (section.hidden && section.hidden.includes(this.user.activeProfileObj.relationShip.id)) {
        object.splice(index, 1);
      } else if (section.operations) {
        section.operations = _.reject(section.operations, (operation: any) => {
          return operation.hidden && operation.hidden.includes(this.userSessionService.getActiveProfile());
        });
      }
    });

    this.sections = sectionTarget;

    this.headerConfig = {
      userInitials: this.utilsService.getInitialsUser(),
      mySpaceUrl: this.appConfigService.getConfig('headerConfig.mySpaceUrl'),
      sections: sectionTarget
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionMenu.unsubscribe();
  }

  getAvatarAlias() {
    this.user = this.utilsService.getUser();
    let firsLetter: string = '';
    let secondLetter: string = '';
    if (this.user.userName && this.user.userName.length >= 1) {
      firsLetter = this.user.userName.substring(0, 1).toUpperCase();
    }
    if (this.user.userFirstSurname && this.user.userFirstSurname.length >= 1) {
      secondLetter = this.user.userFirstSurname.substring(0, 1).toUpperCase();
    }
    this.avatarAlias = firsLetter + secondLetter;
  }

  mySpace() {
    let link = [RouterHelperService.getPathFromId(this.headerConfig.mySpaceUrl)];
    this.router.navigate(link);
  }

  toogleMenu() {
    this.menuService.toogleMenu();
  }

  changeProfile(profile: Profile) {
    if (profile.id !== this.userSessionService.getActiveProfile()) {
      this.httpCacheService.clearAllCache();
      this.userSessionService.setActiveProfile(profile.id);
      this.activeProfileName = (profile.contractName.length > 20) ? (profile.contractName.substring(0, 17) + '...') : profile.contractName;
      this.activeProfileTitle = profile.relationShip.name;
      this.user = this.utilsService.getUser();
      this.loadHeadersOption();
      let link = [RouterHelperService.getPathFromId('global-position-page')];
      this.router.navigate(link);
      this.userSessionService.changeProfileEvent();
    }
  }

  changeComboBoxMenu(operation) {
    let link = [RouterHelperService.getPathFromId(operation.routeId)];
    if(operation.name === 'HEADER.OPERATION.TRANSFER') {
      let viewToTransfer: string = 'SEPA';
      this.shareService.setData('viewToTransfer', viewToTransfer);
    } else if (operation.name ===  'HEADER.OPERATION.TRANSFER-DOM') {
      let viewToTransfer: string = 'INTERNAL';
      this.shareService.setData('viewToTransfer', viewToTransfer);
    }
    this.router.navigate(link);
  }

  // Footer menu
  filterSectionsFooter() {
    this.sectionsFooterMenu = _.findWhere(this.sections, { name: 'HEADER.OPERATION.TEXT' });
  }

  openFooterMenu() {
    this.footerMenu.open();
  }

}
