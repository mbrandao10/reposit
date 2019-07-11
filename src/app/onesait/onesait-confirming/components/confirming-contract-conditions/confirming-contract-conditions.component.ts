import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { ConfirmingService } from 'onesait-core';
import { ConfirmingContract } from 'onesait-api';

@Component({
  selector: 'osb-confirming-contract-conditions',
  templateUrl: './confirming-contract-conditions.component.html'
})
export class ConfirmingContractConditionsComponent implements OnChanges {

  constructor(private confirmingService: ConfirmingService) { }
    // private shareService: ShareService


  @Input() contractId: string;
  contract: ConfirmingContract;
  loading: boolean;
  currencySymbol = '€';

  @Output() selectOrdersChange = new EventEmitter<string>();

  ngOnChanges() {
    this.getContractDetail(this.contractId);
  }

  getContractDetail(contractId: string): void {
    this.loading = true;
    this.confirmingService.getContract(contractId).subscribe(result => {
      this.loading = false;
      this.contract = result.data;
    }, () => {
      this.loading = false;
    });
  }

  // changeView(option: string): void {
  //   this.shareService.setData('filterOrders', option);
  //   this.selectOrdersChange.emit('orders-remittances');
  // }

}
