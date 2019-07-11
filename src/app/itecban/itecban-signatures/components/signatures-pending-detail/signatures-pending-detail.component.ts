import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppConfigService, ModalComponent, DeviceUtilsService, InfoHeaderService, SignatureEntity } from 'onesait-core';
import { PendingSignature, PendingSignatureDetail } from 'onesait-api';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-signatures-pending-detail',
  templateUrl: './signatures-pending-detail.component.html'
})
export class SignaturesPendingDetailComponent implements OnInit, OnDestroy {

  @Input() pendingSignature: PendingSignature;
  @Input()  pendingSignatureDetail: PendingSignatureDetail;
  @Output() cancelOperationEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter();
  @ViewChild('modal') modal: ModalComponent;
  action: string;

  private deviceUtilsServiceSubscription: Subscription;
  accountFormatView: string;
  loading: boolean;
  view = 'detail';
  ismobileResolution: boolean;
  signatureEntity: SignatureEntity;

  constructor(
    appConfigService: AppConfigService,
    // private signatureService: SignatureService,
    protected deviceUtilsService: DeviceUtilsService,
    protected infoHeaderService: InfoHeaderService,
    protected translateService: TranslateService,
    ) {
      this.accountFormatView = appConfigService.getConfig().account.viewKey;
      this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
        this.ismobileResolution = deviceUtilsService.isMobileResolution;
   });
   }

  ngOnInit() {
  }

  cancelOperation() {
    // if (this.ismobileResolution) {
    //   this.view = 'cancel';
    // } else {
      this.cancelOperationEvent.emit(this.pendingSignature);
    // }
  }

  returnOperation() {
    if (this.ismobileResolution) {
      this.view = 'detail';
    }
  }

  openModalListSigner() {
    if (this.ismobileResolution) {
      this.view = 'signatures';
    } else {
      this.modal.open();
    }
  }

  verifyOperation(actio?: string) {
    this.action = actio;
    this.view = 'TOKEN';
  }

  closeModal() {
    this.modal.close();
  }

  close() {
    this.closeEvent.emit();
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
 }

 ngOnDestroy(): void {
  this.deviceUtilsServiceSubscription.unsubscribe();
}
}
