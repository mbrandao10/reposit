import { Component, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { TransferFavouriteOutput } from 'onesait-api';
import { DeviceUtilsService, AppConfigService, ModalComponent, TransferService } from 'onesait-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-transfer-favourites-detail',
  templateUrl: './transfer-favourites-detail.component.html'
})

export class TransferFavouritesDetailComponent implements OnDestroy {

  @Output() closeEvent = new EventEmitter();
  @Output() repeatTransfer = new EventEmitter();
  @Output() deleteFavOk = new EventEmitter();
  @Input() favourite: TransferFavouriteOutput;
  @ViewChild('modal') private modal: ModalComponent;

  loading: boolean;
  deleteOk: boolean;
  transferServiceSubscription: Subscription;
  accountFormatView: string;

  constructor(
    private transferService: TransferService,
    protected deviceUtilsService: DeviceUtilsService,
    appConfigService: AppConfigService
  ) {
    this.accountFormatView = appConfigService.getConfig().account.viewKey;
  }

  isMobileResolution(): boolean {
    return this.deviceUtilsService.isMobileResolution;
  }

  cancelConfirmModal() {
    this.modal.close();
  }

  deleteFavouriteModal() {
    this.modal.open();
  }

  deleteFavourite() {
    this.modal.close();
    this.loading = true;
    this.transferServiceSubscription = this.transferService.deleteFavourite(this.favourite.id).subscribe(result => {
      this.loading = false;
      this.deleteOk = true;
      this.close('deleteFav');
      console.log(result);
    }, (e) => {
      console.log(e);
      this.loading = false;
    });
  }

  close(action?: string): void {
    this.deleteOk = false;
    if (action === 'repeatTransfer') {
      this.repeatTransfer.emit(this.favourite);
    } else if (action === 'deleteFav') {
      this.deleteFavOk.emit();
    } else {
      this.closeEvent.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.transferServiceSubscription) {
      this.transferServiceSubscription.unsubscribe();
    }
  }

}
