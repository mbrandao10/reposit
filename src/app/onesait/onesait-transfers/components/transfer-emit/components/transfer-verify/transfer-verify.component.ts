import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TransferState, TransferPeriodicityType } from 'onesait-api';
import * as _ from 'underscore';
import { DeviceUtilsService } from 'onesait-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-transfer-verify',
  templateUrl: './transfer-verify.component.html'
})
export class TransferVerifyComponent implements OnInit, OnDestroy {

  @Input() transferState: TransferState;
  @Input() finalStep: boolean;
  @Output() closeVerify = new EventEmitter();

  transfer: any;
  purposeTypeName: string;
  chargeBearer: string;
  resolution;
  deviceUtilsServiceSubscription: Subscription;

  constructor(
    protected deviceUtilsService: DeviceUtilsService
  ) {
    this.deviceUtilsServiceSubscription = deviceUtilsService
      .changeScreenSize()
      .subscribe(_screenSize => {
        this.resolution = _screenSize;
      });
  }


  ngOnInit(): void {
    if (this.transferState.transfer) {
      this.transfer = this.transferState.transfer;
      if (this.transfer.purposeType) {
        this.purposeTypeName = _.findWhere(this.transferState.purposeTypes, { id: this.transfer.purposeType }).name;
      }
      if (this.transfer.chargeBearer) {
        this.chargeBearer = _.findWhere(this.transferState.chargeBearer, { id: this.transfer.chargeBearer }).name;
      }
    } else {
      this.transfer = this.transferState.transferPeriodic;
      if (this.transfer.periodicity.type === TransferPeriodicityType.PERIODIC) {
        this.transfer.periodicity.frequencyName = _.findWhere(this.transferState.frequencyTypes, { id: this.transfer.periodicity.frequency }).name;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }

    this.closeVerify.emit();
  }

}
