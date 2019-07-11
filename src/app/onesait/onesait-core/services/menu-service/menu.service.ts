import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config-service/app-config.service';

@Injectable()
export class MenuService {

  private notify = new Subject<any>();

  showMenuTablet = false;
  notifyObservable: Observable<any> = this.notify.asObservable();

  constructor(private appConfigService: AppConfigService) {
  }

  evaluateMenu() {
    this.resetMenu();
  }

  resetMenu() {
    if (window.innerWidth < this.appConfigService.getConfig('grid.sizes.md')) {
      this.closeMenu();
    } else {
      this.openMenu();
      this.closeSubMenu();
    }
  }

  toogleMenu() {
    this.showMenuTablet = ! this.showMenuTablet;
    if (this.showMenuTablet) {
      this.notify.next({ action: 'showMenu' });
    } else {
      this.notify.next({ action: 'closeMenu' });
    }
  }

  openMenu() {
    this.showMenuTablet = true;
    this.notify.next({ action: 'showMenu' });
  }

  closeMenu() {
    this.showMenuTablet = false;
    this.notify.next({ action: 'closeMenu' });
  }

  closeSubMenu() {
    this.notify.next({ action: 'closeSubMenu' });
  }

  clickOutside() {
    this.resetMenu();
  }

}
