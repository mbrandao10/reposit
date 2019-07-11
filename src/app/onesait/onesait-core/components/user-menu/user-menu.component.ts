import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserMenuConfig } from '../../models/interfaces/user-menu-config.interface';
import { LogoutService } from '../../services/logout-service/logout.service';
import { RouterHelperService } from '../../services/router-helper-service/router-helper.service';
import { ModalService } from '../../services/modal-service/modal.service';

@Component({
  selector: 'osb-user-menu',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent implements OnInit {

  @Input()
  userMenuConfig: UserMenuConfig;

  loading = false;

  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private modalService: ModalService
  ) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.checkActiveSection(val.url);
      }
    });
  }

  ngOnInit() {
    this.checkActiveSection(this.router.url);
  }

  checkActiveSection(url: string): any {
    if (this.userMenuConfig && this.userMenuConfig.sections) {
      this.userMenuConfig.sections.forEach(element => {
        element.active = false;
        let path = RouterHelperService.getPathFromId(element.routeId);
        if (path) {

          if (url.indexOf(path) >= 0) {
            element.active = true;
            console.log('-->', element.routeId);
          }
        }
      });
    }
    if (this.userMenuConfig && this.userMenuConfig.buttons) {
      this.userMenuConfig.buttons.forEach(element => {
        element.active = false;
        let path = RouterHelperService.getPathFromId(element.routeId);
        if (path) {

          if (url.indexOf(path) >= 0) {
            element.active = true;
            console.log('-->', element.routeId);
          }
        }
      });
    }

  }

  goTo(element: any) {
    let link = [RouterHelperService.getPathFromId(element.routeId)];
    this.router.navigate(link);
  }

  showLogout() {
    this.modalService.showConfirmModal(
      'LOGOUT.TEXT'
    ).subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  logout(_element?: any) {
    this.modalService.showConfirmModal(
      'LOGOUT.TEXT'
    ).subscribe(result => {
      if (result) {
        // this.logout();
        this.loading = true;
        this.logoutService.logout();
        this.loading = false;
      }
    });
  }

  execAction(element: any) {
    this[element.action](element);
  }


}
