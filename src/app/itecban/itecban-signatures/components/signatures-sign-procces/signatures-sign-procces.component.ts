import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { PendingSignature, PendingSignatureDetail, SignatureData, ResultResponse } from 'onesait-api';
import { SignatureEntity, AppConfigService, DeviceUtilsService, SignatureService, InfoHeaderService, SignatureTokenService, RouterHelperService } from 'onesait-core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-signatures-sign-procces',
  templateUrl: './signatures-sign-procces.component.html'
})
export class SignaturesSignProccesComponent implements OnInit, OnDestroy {

    @Input() pendingSignature: PendingSignature;
    @Input() pendingSignatureDetail: PendingSignatureDetail;
    @Input() action: string;
    @Output() returnOperationEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() closeEvent = new EventEmitter();

    private deviceUtilsServiceSubscription: Subscription;
    view = 'VERIFY';
    signatureEntity: SignatureEntity;
    accountFormatView: string;
    ismobileResolution: boolean;
    loading: boolean;
    sign: boolean;
    continue:  boolean;
    signatureData: SignatureData;
    result = {code: '', info: ''};

    constructor(
        private signatureService: SignatureService,
        protected router: Router,
        private signatureTokenService: SignatureTokenService,
        protected deviceUtilsService: DeviceUtilsService,
        protected infoHeaderService: InfoHeaderService,
        protected translateService: TranslateService,
        appConfigService: AppConfigService
        ) {
        this.accountFormatView = appConfigService.getConfig().account.viewKey;
        this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
            this.ismobileResolution = deviceUtilsService.isMobileResolution;
        });
    }

    ngOnInit() {
    }

    returnOperation() {
      this.returnOperationEvent.emit();
    }

    ngOnDestroy(): void {
        this.deviceUtilsServiceSubscription.unsubscribe();
      }

    signOperation(): any {
      this.loading = true;
      this.signatureService.putPendingOperationDetail(this.pendingSignature.id, this.action, this.signatureEntity).subscribe((result: ResultResponse) => {
        this.signatureEntity = null;
        this.signatureData = this.signatureTokenService.requireHolderSignature(result);
        this.loading = false;
        this.signatureService.signSubject$.next();
        if (this.action === 'reject') {
          this.infoHeaderService.showInfoHeader(this.translateService.instant('ITECBAN-PERSONS.SIGNATURES.DELETE-OK'));
          this.close(true);
        } else {
          this.sign = true;
          this.continue = true;
          this.view = 'VERIFY';
        }
      }, e => {
        this.loading = false;
        // if (this.action === 'accept') {
          if (this.signatureTokenService.requireSignature(e)){
            this.signatureEntity = this.signatureTokenService.requireSignature(e);
          }
          if (this.signatureEntity) {
            this.view = 'TOKEN';
          }
        // }
      });
    }

    isMobileResolution() {
      return this.deviceUtilsService.isMobileResolution;
    }

    downloadDocument(args?: string) {
      console.log(args);
    }

    goToAccounts() {
      let link = [RouterHelperService.getPathFromId('accounts-page')];
      this.router.navigate(link);
    }

    close(finish?: boolean) {
      this.closeEvent.emit(finish);
    }

    goBack() {
      this.signatureEntity = undefined;
      if (this.result.code === '200') {
        this.close(false);
      } else {
        this.view = 'VERIFY';
      }
    }

}
