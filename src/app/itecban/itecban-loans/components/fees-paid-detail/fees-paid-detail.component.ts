import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InversisManager } from 'itecban-common';
import { DeviceUtilsService, CustomersService } from 'onesait-core';
import { LoanRepayment } from 'onesait-api';

@Component({
  selector: 'osb-fees-paid-detail',
  templateUrl: './fees-paid-detail.component.html'
})
export class FeesPaidDetailComponent extends InversisManager {

  @Input() loanReceiptDetail: LoanRepayment;
  @Output() closeEvent = new EventEmitter();

  constructor(
    protected customerService: CustomersService,
    protected deviceUtilsService: DeviceUtilsService
    ) {
    super(customerService);
  }

  isMobileResolution(): boolean {
    return this.deviceUtilsService.isMobileResolution;
  }

  operateInversis(): void {
  }

  close(): void {
    this.closeEvent.emit();
  }

}
