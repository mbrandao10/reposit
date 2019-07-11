import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FactoringContract } from 'onesait-api';
import { FactoringService } from 'onesait-core';

@Component({
  selector: 'osb-factoring-invoice-detail',
  templateUrl: './factoring-invoice-detail.component.html'
})
export class FactoringInvoiceDetailComponent implements OnInit {
  @Input() invoice;
  @Input() contractId;
  @Output() showDetailChange = new EventEmitter<boolean>();

  loading: boolean;
  contract: FactoringContract;

  constructor(private factoringService: FactoringService) { }

  ngOnInit() {
    this.getContract();
  }

  getContract() {
    this.loading = true;
    this.factoringService.getContract(this.contractId).subscribe(result => {
      this.contract = result.data;
      this.loading = false;
    }, () => { this.loading = false; });
  }
  changeShowDetail() {
    this.showDetailChange.emit(false);
  }

}
