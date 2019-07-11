import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { constants } from '../../config/constants';
import { RequestService } from '../../services/request-service/request.service';
import { ModalService } from '../../services/modal-service/modal.service';
import { UtilsService } from '../../services/utils-service/utils.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { RouterHelperService } from '../../services/router-helper-service/router-helper.service';

@Component({
  selector: 'osb-onesait-page',
  templateUrl: './onesait-page.component.html'
})
export class OnesaitPageComponent implements OnInit, AfterViewInit {


  constructor(
    private utilsService: UtilsService,
    private router: Router,
    private modalService: ModalService,
    private requestService: RequestService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private appConfigService: AppConfigService
  ) {
  }

  ngOnInit() {
    this.initApp();
    if (!this.utilsService.getUser()) {
      let link = RouterHelperService.getPathFromId('login-page');
      this.router.navigate([link]);
    }
  }

  initApp() {
    if (this.utilsService.getItemSessionStorage(constants.ACCESS_TOKEN) && !this.requestService.getHeader('Authorization')) {
      this.requestService.setHeader('Authorization', 'Bearer ' + this.utilsService.getItemSessionStorage('access_token'));
    }
  }

  ngAfterViewInit() {
    let userCodeWarning = this.utilsService.getUser().userCodeWarning;
    let passwordExpiresSoon = this.appConfigService.getConfig('userCodeWarning.passwordExpiresSoon');
    // passwordExpiresSoon = '';
   if (userCodeWarning === passwordExpiresSoon) {
      let initMessange: string = this.translateService.instant('ITECBAN-PERSONS.MY.SPACE.CHANGE.ADVICE.TEXT');
      let userWarning = this.utilsService.getUser().userWarning;
      let userWarningMessage = initMessange + ' ' + userWarning;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.modalService.showConfirmModal(
          userWarningMessage,
          'ITECBAN-PERSONS.MY.SPACE.CHANGE.ADVICE.YES',
          'ITECBAN-PERSONS.MY.SPACE.CHANGE.ADVICE.NO',
        ).subscribe(result => {
          if (result) {
            this.goToModify();
          }
        });
      }, 500);

    }
  }

  goToModify() {
    let link = RouterHelperService.getPathFromId('settings-page');
    this.router.navigate([link]);
  }

}
