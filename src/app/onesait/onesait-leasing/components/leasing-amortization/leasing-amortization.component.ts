import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LeasingRepayment } from 'onesait-api';
import { List, LeasingService } from 'onesait-core';


@Component({
  selector: 'osb-leasing-amortization',
  templateUrl: './leasing-amortization.component.html'
})
export class LeasingAmortizationComponent implements OnChanges {

  @Input() contractId: string;

  loading: boolean;
  downloadObject: { key: string, value: string };

  repayments: LeasingRepayment[];
  protected listRepaymentsObservable: any;
  protected listRepayments: List;
  selectedItem: number;

  hasMoreData: boolean;


  constructor(private leasingService: LeasingService,
    protected router: Router) {
    this.listRepayments = new List(this.leasingService, 'getRepayments');
  }

  ngOnChanges() {
    this.resetList();
  }

  next() {
    let args = [this.contractId];
    if (this.listRepaymentsObservable) {
      this.listRepaymentsObservable.unsubscribe();
    }
    this.loading = true;
    this.listRepaymentsObservable = this.listRepayments.next(args).subscribe(this.successRepayments, this.errorRepayments);
  }

  private successRepayments = (myResult) => {
    this.loading = false;
    this.repayments = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorRepayments = (error) => {
    this.loading = false;
    console.log(error);
  }

  resetList() {
    this.listRepayments.reset();
    this.next();
  }

  selectItem(item: LeasingRepayment) {
    if (item.number !== this.selectedItem) {
      this.selectedItem = item.number;
    } else {
      this.selectedItem = null;
    }
  }

}
