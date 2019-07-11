import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { NBExpressBillService } from 'onesait-core';
import { EBContract } from 'onesait-api';

@Component({
  selector: 'osb-nbexpress-contract-conditions',
  templateUrl: './nbexpress-contract-conditions.component.html'
})
export class NbExpressContractConditionsComponent implements OnChanges {

  constructor(private nbExpresBillService: NBExpressBillService) { }
  // private shareService: ShareService

  @Input() contractId: string;
  contract: EBContract;
  loading: boolean;
  currencySymbol = '€';

  @Output() selectOrdersChange = new EventEmitter<string>();

  ngOnChanges() {
    this.getContractDetail(this.contractId);
  }

  getContractDetail(contractId: string): void {
    this. loading = true;
    this.nbExpresBillService.getContract(contractId).subscribe(result => {
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
