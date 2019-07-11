import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
// import { MailboxService } from '../../services-http/mailbox-service/mailbox.service';

import { UserMenuConfig, UserMenuSection } from '../../models/interfaces/user-menu-config.interface';
import { MenuConfig, } from 'onesait-api';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu-service/menu.service';
import { SignatureService } from '../../services-http/signature-service/signature.service';
import { DeviceUtilsService } from '../../services/device-utils-service/device-utils.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DocumentboxService } from '../../services-http/documentbox-service/documentbox.service';

@Component({
  selector: 'osb-onesait-layout',
  templateUrl: './onesait-layout.component.html'
})
export class OnesaitLayoutComponent implements OnInit, OnDestroy {

  userMenuConfig: UserMenuConfig;
  menuConfig: MenuConfig;
  showMenu: boolean;

  protected subscriptionMenu: Subscription;
  protected subscribeUpdatesSign: Subscription;
  // protected subscribeUpdatesMail: Subscription;
  protected subscribeUpdatesDocument: Subscription;


  constructor(
    protected appConfigService: AppConfigService,
    /* protected mailboxService: MailboxService,*/
    protected documentboxService: DocumentboxService,
    protected menuService: MenuService,
    protected signatureService: SignatureService,
    protected deviceUtilsService: DeviceUtilsService,
    protected bsDatepickerConfig: BsDatepickerConfig
  ) {
    this.menuService.evaluateMenu();
    this.subscriptionMenu = this.menuService.notifyObservable.subscribe((value) => {
      if (value.action === 'showMenu') {
        this.showMenu = true;
      } else if (value.action === 'closeMenu') {
        this.showMenu = false;
      }
    });
    this.subscribeUpdatesSign = this.signatureService.notifySignObservable.subscribe(() => {
      this.getFirmCounter(this.userMenuConfig.sections[0]);
    });
    // this.subscribeUpdatesMail = this.mailboxService.notifyConversationObservable.subscribe(() => {
    //   this.getMailboxCounter(this.userMenuConfig.sections[1]);
    // });
    this.subscribeUpdatesDocument = this.documentboxService.notifyDocumentObservable.subscribe(() => {
      this.getDocumentCounter(this.userMenuConfig.sections[2]);
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.menuService.evaluateMenu();
  }

  ngOnInit(): void {
    this.userMenuConfig = undefined;
    this.menuService.evaluateMenu();
    this.menuConfig = {
      elements: this.appConfigService.getConfig('menuConfig.elements'),
      homeRoute: this.appConfigService.getConfig('menuConfig.homeRoute'),
      errorPage: this.appConfigService.getConfig('menuConfig.errorPage'),
      version: this.appConfigService.getConfig('version'),
    };

    this.userMenuConfig = {
      buttons: this.appConfigService.getConfig('userMenuConfig.buttons'),
      sections: this.appConfigService.getConfig('userMenuConfig.sections')
    };
    this.getCounters();


    /* this.deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
       if(this.deviceUtilsService.isMobileResolution)
         this.bsDatepickerConfig.adaptivePosition = false;
       else
         this.bsDatepickerConfig.adaptivePosition = true;
     });*/
  }

  getCounters() {
    this.userMenuConfig.sections.forEach((section) => {
      try {
        this[section.counterMethod](section);
      } catch (_e) { }
    });
  }

  getDocumentCounter(section: UserMenuSection) {
    section.counter = 0;
    this.documentboxService.getCounter({ disableErrors: true }).subscribe(result => {
      if (result.data) {
        if (result.data.numOfNewDocuments > -1) {
          section.counter = result.data.numOfNewDocuments;
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  getMailboxCounter(section: UserMenuSection) {
    section.counter = 0;
    /* this.mailboxService.getConversationsCounter({ disableErrors: false }).subscribe(result => {
       if (result.data) {
         if (result.data.numOfNewConversations > -1) {
           section.counter = result.data.numOfNewConversations;
         }
       }
     }, (error) => {
       console.log(error);
     });*/
  }

  getFirmCounter(section: UserMenuSection) {
    section.counter = 0;
    this.signatureService.getPendingOperationCounter({ disableErrors: true }).subscribe(result => {
      if (result.data) {
        if (result.data.numOfNewSignatures > -1) {
          section.counter = result.data.numOfNewSignatures;
        }
      }
    }, (error) => {
      console.log(error);
    });

  }

  ngOnDestroy() {
    if (this.subscriptionMenu) {
      this.subscriptionMenu.unsubscribe();
    }
    if (this.subscribeUpdatesSign) {
      this.subscribeUpdatesSign.unsubscribe();
    }
    //    if (this.subscribeUpdatesMail) {
    //      this.subscribeUpdatesMail.unsubscribe();
    //   }
    if (this.subscribeUpdatesDocument) {
      this.subscribeUpdatesDocument.unsubscribe();
    }
  }
}
