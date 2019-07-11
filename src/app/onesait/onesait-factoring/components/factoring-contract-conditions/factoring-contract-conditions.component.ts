import { Component, Input, OnChanges } from '@angular/core';
import { FactoringService } from 'onesait-core';
import { FactoringContract } from 'onesait-api';

@Component({
  selector: 'osb-factoring-contract-conditions',
  templateUrl: './factoring-contract-conditions.component.html'
})
export class FactoringContractConditionsComponent implements OnChanges {

  @Input() contractId: string;
  loading: boolean;
  contract: FactoringContract;

  constructor(private factoringService: FactoringService) { }

  ngOnChanges() {
    this.getContractDetail(this.contractId);
  }

  getContractDetail(contractId: string): void {
    this.loading = true;
    this.factoringService.getContract(contractId).subscribe(result => {
      this.loading = false;
      this.contract = result.data;
    }, () => {
      this.loading = false;
    });
  }

}
