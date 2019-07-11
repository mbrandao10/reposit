import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuConfig, MenuConfigElement, User } from 'onesait-api';
import { RouterHelperService } from '../../services/router-helper-service/router-helper.service';
import { UtilsService } from '../../services/utils-service/utils.service';
import { UserSessionService } from '../../services/user-session-service/user-session.service';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { MenuService } from '../../services/menu-service/menu.service';
import { DeviceUtilsService, GridType } from '../../services/device-utils-service/device-utils.service';

@Component({
  selector: 'osb-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  @ViewChild('subMenu') subMenu: ElementRef;

  @ViewChild('subMenuList', { read: ElementRef})
  ulsubmenu: ElementRef;

  @Input()
  menuConfig: MenuConfig;

  SUBMENU_TOP = 'menu_padding_top_desktop';
  menuElements: MenuConfigElement[];
  children: MenuConfigElement[];
  subscriptionMenu: Subscription;

  protected elementSelected: MenuConfigElement;
  protected pageSelected: MenuConfigElement;
  protected subMenuOpened: boolean;
  lastConnectionDate: any;

  activeProfile: string;
  user: User;
  changeProfileSusbscription: Subscription;

  constructor(
    protected router: Router,
    protected renderer: Renderer2,
    protected utilsService: UtilsService,
    protected userSessionService: UserSessionService,
    protected appConfigService: AppConfigService,
    protected menuService: MenuService,
    protected deviceUtilsService: DeviceUtilsService
  ) {
    this.user = JSON.parse(this.utilsService.getItemSessionStorage('user'));
    this.activeProfile = userSessionService.getActiveProfile();

    this.changeProfileSusbscription = userSessionService.getChangeProfileEvent().subscribe(() => {
      this.user = JSON.parse(this.utilsService.getItemSessionStorage('user'));
      this.activeProfile = userSessionService.getActiveProfile();

      this.setMenu();
      this.resetActiveMenu(this.router.url);
    });

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.menuConfig && this.menuElements) {
        this.resetActiveMenu(val.url);
      }
    });

    this.subscriptionMenu = this.menuService.notifyObservable.subscribe((value) => {
      if (value.action === 'closeSubMenu') {
        this.resetActiveMenu(this.router.url);
        this.closeSubMenu();
      } else if (value.action === 'closeMenu') {
        this.resetActiveMenu(this.router.url);
      }
    });
  }

  ngOnInit() {
    this.lastConnectionDate = this.user.lastConnectionDate;
    this.setMenu();
    this.resetActiveMenu(this.router.url);
  }

  resetActiveMenu(url: string): any {
    if (!url.endsWith('/')) {
      url = url + '/';
    }
    this.pageSelected = null;
    // TODO cambiar por un regex y misma funcion para elemento y subelemento
    if (this.menuElements) {
      this.menuElements.forEach(element => {
        let path = RouterHelperService.getPathFromId(element.routeId);
        element.showChildren = false;
        element.active = false;

        if (element.children) {
          element.children.forEach(subelement => {
            let subpath = RouterHelperService.getPathFromId(subelement.routeId);
            if (subpath && url.indexOf(subpath) >= 0) {
              this.pageSelected = element;
              subelement.active = true;
              if (this.deviceOpenSubmenu()) {
                this.openSubmenu(element);
              } else {
                element.active = true;
              }
            } else {
              subelement.active = false;
            }
          });
        } else if (path && url.indexOf(path) >= 0) {
          element.active = true;
          this.pageSelected = element;
        } else {
          element.active = false;
        }
      });
      if (this.pageSelected && !this.pageSelected.children) {
        this.closeSubMenu();
      }
    }
  }

  deviceOpenSubmenu(): any {
     let gridType: GridType = this.deviceUtilsService.getGrid();
     switch (gridType) {
       case GridType.xs:
         return true;
       case GridType.sm:
       case GridType.md:
         return true;
       default:
         return false;
     }
  }

  setMenu() {
    this.menuElements = this.utilsService.cloneObjectAssignArr(this.appConfigService.getConfig('menuConfig.elements'));
    if (this.menuConfig && this.menuElements) {
      this.menuElements =  _.reject(this.menuElements, (element: any) => {
        if (element.children) {
          element.children = _.reject(element.children, (child: any) => {
            return child.hidden && child.hidden.includes(this.user.activeProfileObj.relationShip.id);
          });
        }
        return element.hidden && element.hidden.includes(this.user.activeProfileObj.relationShip.id);
      });
    }
  }


  viewGlobalPosition() {
    let link = [this.menuConfig.homeRoute];
    this.router.navigate(link);
  }

  goTo(element: MenuConfigElement, liElement?: HTMLElement) {
    if (element.children) {
      this.openSubmenu(element, liElement);
    } else {
      this.subMenuOpened = false;
      this.closeSubMenu();
      // this.renderer.removeClass(this.subMenu.nativeElement, 'submenu-show');
      if (element.available) {
        let link = [RouterHelperService.getPathFromId(element.routeId)];
        this.router.navigate(link);
      } else {
        let link = [RouterHelperService.getPathFromId('in-progress-page')];
        this.router.navigate(link);
      }
      if (window.innerWidth < this.appConfigService.getConfig('grid.sizes.md')) {
        this.menuService.closeMenu();
      }
    }
    // Siempre dejamos activa el elemento seleccionado para la página
    if (this.pageSelected) {
      this.pageSelected.active = true;
    }
  }

  openSubmenu(element: MenuConfigElement, liElement?: HTMLElement) {
    this.children = element.children;
    this.selectElement(element);
    setTimeout(() => {
      this.placeSubmenu(liElement);
      this.evaluateSubMenu(this.elementSelected.showChildren);
    });
  }

  selectElement(element: MenuConfigElement): any {
    // Si es la primera opcion que escogemos, o estamos cambiando de elemento
    if (!this.elementSelected || this.elementSelected.name !== element.name) {
      if (this.elementSelected) {
        this.elementSelected.showChildren = false;
        this.elementSelected.active = false;
      }
      this.elementSelected = element;
      this.elementSelected.showChildren = true;
      this.elementSelected.active = true;
    } else {
      // Estamos clickando sobre la misma opcion, jugamos con mostrar ocultar elementos
      this.elementSelected.showChildren = !this.elementSelected.showChildren;
      if (this.pageSelected.name !== this.elementSelected.name) {
        this.elementSelected.active = this.elementSelected.showChildren;
      } else {
        this.elementSelected.active = true;
      }
    }


  }

  placeSubmenu(liElement?: HTMLElement) {
    if (liElement) {
      let rect = liElement.getBoundingClientRect();
      let submenu = this.subMenu.nativeElement;
      let cilckPositionY = rect.top;
      let submenuTopDistance = submenu.getBoundingClientRect().top;
      let submenuHeight = submenu.getBoundingClientRect().height;
      let padding = cilckPositionY - submenuTopDistance;
      let subeMenuListSize = this.ulsubmenu.nativeElement.offsetHeight;

      let liSize = 0;
      let lis = this.ulsubmenu.nativeElement.getElementsByTagName('li');
      if (lis && lis.length > 0) {
        liSize = lis[0].offsetHeight;
      }

      let centerTop = padding - ((subeMenuListSize / 2) - (liSize / 2));
      // se nos sale el submenu por debajo
      if (centerTop + subeMenuListSize > submenuHeight) {
        centerTop = submenuHeight - subeMenuListSize;
      } else if (centerTop < 0 ) {
        // se sale por arriba
        centerTop = 0;
      }
      this.renderer.setStyle(this.subMenu.nativeElement, 'padding-top', centerTop + 'px');

      this.utilsService.setItemSessionStorage(this.SUBMENU_TOP, centerTop);
    } else {
      let centerTop = this.utilsService.getItemSessionStorage(this.SUBMENU_TOP);
      this.renderer.setStyle(this.subMenu.nativeElement, 'padding-top', centerTop + 'px');
    }
  }

  evaluateSubMenu(open: boolean) {
    if (open) {
      this.openSubMenu();
    } else {
      this.closeSubMenu();
    }
  }

  openSubMenu() {
      this.renderer.addClass(this.subMenu.nativeElement, 'submenu-show');
  }

  closeSubMenu() {
    this.renderer.removeClass(this.subMenu.nativeElement, 'submenu-show');
  }

  OnDestroy() {
    this.changeProfileSusbscription.unsubscribe();
  }

}
