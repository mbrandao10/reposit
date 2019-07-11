import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceUtilsService, CustomersService } from 'onesait-core';
import { InversisManager } from 'itecban-common';

@Component({
  selector: 'app-credit-movements-detail',
  templateUrl: './credit-movements-detail.component.html'
})

export class CreditMovementsDetailComponent extends InversisManager {

  @Input() creditMovementDetail: any;
  @Output() closeEvent = new EventEmitter();

  constructor(
    protected customerService: CustomersService,
    protected deviceUtilsService: DeviceUtilsService
    ) {
    super(customerService);
  }

  // operateInversis() {
  // }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

  close() {
    this.closeEvent.emit();
  }

}
