import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { TransferService, ModalPageComponent, SignatureEntity, SignatureTokenService, DeviceUtilsService, ShareService, HeaderService } from 'onesait-core';
import { TransferPeriodicNew, TransferNew, TRANSFER_STEPS, TransferState, TransferFavouriteOutput, TransferFavNew, ResultResponse, SignatureData } from 'onesait-api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'osb-transfer-emit',
  templateUrl: './transfer-emit.component.html'
})
export class TransferEmitComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') private modal: ModalPageComponent;
  @Output() refreshFavList: EventEmitter<any> = new EventEmitter<any>();
  @Input() favourite: TransferFavouriteOutput;
  @Input() transferState: TransferState;
  @Input() transferFavs: TransferFavouriteOutput[];

  templateTitle: string;

  view: string;
  STEPS = TRANSFER_STEPS;
  openModal: boolean;
  loading: boolean;
  signatureEntity: SignatureEntity;
  signatureData: SignatureData;
  favTransfer: TransferFavNew;

  private subscriptionBack: Subscription;
  protected _routerSub = Subscription.EMPTY;

  constructor(
    private signatureTokenService: SignatureTokenService,
    private deviceUtilsService: DeviceUtilsService,
    private transferService: TransferService,
    private translateService: TranslateService,
    private shareService: ShareService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.resetForm();
    this.transferState.favourites = this.transferFavs;
    this.transferState.currentStep = 1;
    if (this.favourite) {
      this.view = this.favourite.transferMode.id;
      if (this.deviceUtilsService.isMobileResolution) {
        this.open(this.view);
      }
    } else {
      if (this.shareService.getData('viewToTransfer')) {
        this.view = this.shareService.getData('viewToTransfer');
      } else {
        this.view = 'INTERNAL';
      }
    }
    this.transferState.step = TRANSFER_STEPS.FORM;
    this.translateService.get('ITECBAN-TRANSFER.VOUCHER.'+ this.view + '.TITLE').subscribe((result: string) => {
      this.templateTitle = result;
  });
  }

  ngOnDestroy() {
    if (this.subscriptionBack) {
      this.subscriptionBack.unsubscribe();
    }
    if (this._routerSub) {
      this._routerSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.modal && this.modal.getHeader()) {
        this.subscriptionBack = this.modal.getHeader().backObservable.subscribe(() => {
          this.back();
        });
      }
    }, 500);
    this._routerSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (this.shareService.getData('viewToTransfer')) {
          this.view = this.shareService.getData('viewToTransfer');
          this.headerService.setTitle('HEADER.TITLE.TRANSFER');
          this.shareService.removeData('viewToTransfer');
        }
      }
    });
  }

  resetForm() {
    let oldTransfer = Object.assign({}, this.transferState);
    this.transferState = new TransferState();
    this.transferState.currentStep = 1;
    this.transferState.accounts = oldTransfer.accounts;
    this.transferState.currencies = oldTransfer.currencies;
    this.transferState.frequencyTypes = oldTransfer.frequencyTypes;
    this.transferState.favourites = oldTransfer.favourites;
    this.transferState.chargeBearer = oldTransfer.chargeBearer;
    this.transferState.credits = oldTransfer.credits;
    this.transferState.purposeTypes = oldTransfer.purposeTypes;
    this.transferState.beneficiaryCountriesInternational = oldTransfer.beneficiaryCountriesInternational;
    this.transferState.beneficiaryCountriesTarget = oldTransfer.beneficiaryCountriesTarget;
    this.transferState.beneficiaryResident = oldTransfer.beneficiaryResident;
  }

  open(view: string) {
    this.resetForm();
    this.transferState.step = TRANSFER_STEPS.FORM;
    this.transferState.favourites = this.transferFavs;
    this.view = view;
    if (this.deviceUtilsService.isMobileResolution) {
      this.openModal = true;
      this.modal.open();
      this.modal.getHeader().setTitle('ONESAIT-TRANSFERS.FORMS.' + view.toUpperCase());
    }
    this.signatureEntity = null;

    this.translateService.get('ITECBAN-TRANSFER.VOUCHER.'+ this.view + '.TITLE').subscribe((result: string) => {
      this.templateTitle = result;
  });

  }

  close() {
    this.openModal = false;
    this.modal.close();
  }

  cancel() {
    this.resetForm();
    this.signatureEntity = null;
    this.transferState.step = TRANSFER_STEPS.FORM;
  }

  back() {
    if (this.transferState.step === TRANSFER_STEPS.TOKEN) {
      this.transferState.step = TRANSFER_STEPS.VERIFY;
    } else {
      this.transferState.step = TRANSFER_STEPS.FORM;
    }
    if (this.transferState.currentStep === 1 && this.openModal) {
      this.modal.close();
    }
    if (this.transferState.currentStep > 1) {
      this.transferState.currentStep--;
    }
    this.signatureEntity = null;
  }

  backVisibleFn() {
    if (this.transferState) {
      if (this.transferState.step === TRANSFER_STEPS.RESUME) {
        return false;
      } else if (this.transferState.currentStep > 1) {
        return true;
      }
    }
    return false;
  }

  formsCompleted() {
    this.transferState.currentStep++;
    this.transferState.step = TRANSFER_STEPS.VERIFY;
  }

  sendTransfer() {
    this.signatureData = null;
    if (this.transferState.transfer) {
      this.saveTransfer(this.transferState.transfer);
    } else if (this.transferState.transferPeriodic) {
      this.saveTransferPeriodic(this.transferState.transferPeriodic);
    }
  }

  saveTransferPeriodic(transfer: TransferPeriodicNew): any {
    this.loading = true;
    this.transferService.postTransferPeriodic(transfer, this.signatureEntity).subscribe((result: ResultResponse) => {
      this.loading = false;
      this.signatureData = this.signatureTokenService.requireHolderSignature(result);
      this.transferState.step = TRANSFER_STEPS.RESUME;
      this.transferState.currentStep++;
      this.signatureEntity = null;
      if (this.transferState.transferPeriodic.alias) {
        this.saveFavTransfer(this.transferState);
      }
    }, e => {
      this.loading = false;
      this.transferState.currentStep++;
      // if (!this.signatureEntity) {
      //   this.signatureEntity = this.signatureTokenService.requireSignature(e);
      // }
      // if (this.signatureEntity) {
      //   this.transferState.step = TRANSFER_STEPS.TOKEN;
      // }
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.transferState.step = TRANSFER_STEPS.TOKEN;
      }
    });
  }

  saveTransfer(transfer: TransferNew): any {
    this.loading = true;
    this.transferService.post(transfer, this.signatureEntity).subscribe((result: ResultResponse) => {
      this.loading = false;
      this.signatureData = this.signatureTokenService.requireHolderSignature(result);
      this.transferState.step = TRANSFER_STEPS.RESUME;
      this.transferState.currentStep++;
      this.signatureEntity = null;
      if (this.transferState.transfer.alias) {
        this.saveFavTransfer(this.transferState);
      }
    }, e => {
      this.loading = false;
      this.transferState.currentStep++;
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.transferState.step = TRANSFER_STEPS.TOKEN;
      }
    });
  }

  saveFavTransfer(transferState: TransferState) {
    let transfer: any;
    this.favTransfer = new TransferFavNew();

    if (transferState.transfer) {
      transfer = transferState.transfer;
    } else if (transferState.transferPeriodic) {
      transfer = transferState.transferPeriodic;
    }

    this.favTransfer.orderer = transfer.orderer;
    this.favTransfer.beneficiary = transfer.beneficiary;
    this.favTransfer.amount = transfer.amount;
    this.favTransfer.reason = transfer.reason;
    this.favTransfer.transferMode = transfer.transferMode;
    this.favTransfer.alias = transfer.alias;
    if (transfer.purposeType) {
      this.favTransfer.purposeType = transfer.purposeType;
    }
    if (transfer.transferType) {
      this.favTransfer.transferType = transfer.transferType;
    }
    if (transfer.chargeBearer) {
      this.favTransfer.chargeBearer = transfer.chargeBearer;
    }

    this.loading = true;
    this.transferService.postFavTransfer(this.favTransfer).subscribe(() => {
      // recargamos el combo de favoritas tras dar de alta una
      this.transferService.getFavourites().subscribe((results) => {
        this.transferState.favourites = results.data;
        this.loading = false;
        this.refreshFavList.emit();
      }, () => { this.loading = false; });
    }, () => { this.loading = false; });
  }

}
