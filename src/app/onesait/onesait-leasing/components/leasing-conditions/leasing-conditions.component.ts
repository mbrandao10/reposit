import { Component, Input, OnChanges } from '@angular/core';
import { LeasingService } from 'onesait-core';
import { LeasingContract } from 'onesait-api';

@Component({
  selector: 'osb-leasing-conditions',
  templateUrl: './leasing-conditions.component.html'
})
export class LeasingConditionsComponent implements OnChanges {

  constructor(private leasingService: LeasingService) { }

  @Input() contractId: string;
  contract: LeasingContract;
  loading: boolean;

  ngOnChanges() {
    this.getContractDetail(this.contractId);
  }

  getContractDetail(contractId: string): void {
    this. loading = true;
    this.leasingService.getContract(contractId).subscribe(result => {
      this.loading = false;
      this.contract = result.data;
    }, () => {
      this.loading = false;
    });
  }

}
