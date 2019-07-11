import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoansService } from 'itecban-common';
import { List } from 'onesait-core';
import { DeviceUtilsService } from 'onesait-core';
import { Subscription } from 'rxjs';
import { LoanRepayment } from 'onesait-api';

@Component({
  selector: 'osb-loan-amortizations-table',
  templateUrl: './loan-amortizations-table.component.html'
})
export class LoanAmortizationsTableComponent implements OnInit, OnDestroy {

  @Input() idLoan;
  loading: boolean;
  hasMoreData: boolean;
  selectedItem: string;
  listRepayments: List;
  repayments: LoanRepayment;
  listRepaymentObservable: Subscription;
  listRepaymentsNext: Subscription;

  constructor(
    private loanService: LoansService,
    protected deviceUtilsService: DeviceUtilsService
  ) {
    this.loading = true;
    this.listRepayments = new List(this.loanService, 'getLoansRepayments');
    this.listRepaymentObservable = this.listRepayments.getList().subscribe(results => {
      this.repayments = results.data;
      this.loading = false;
    }, e => {
      this.loading = false;
      console.log(e);
    });
  }

  ngOnInit(): void {
    this.next();
  }

  next(): void {
    this.loading = true;
    this.listRepaymentsNext = this.listRepayments.next([this.idLoan]).subscribe((result: any) => {
      if (result.paging && result.paging.hasMorePages) {
        this.hasMoreData = true;
      } else {
        this.hasMoreData = false;
      }
    }, e => {
      this.loading = false;
      console.log(e);
    });
  }

  viewDetail(repayment): void {
    if (this.selectedItem === repayment) {
      this.selectedItem = '';
    } else {
      this.selectedItem = repayment;
    }
  }

  isMobileResolution(): boolean {
    return this.deviceUtilsService.isMobileResolution;
  }

  close(): void {
    this.selectedItem = null;
  }

  ngOnDestroy(): void {
    if (this.listRepaymentObservable) {
      this.listRepaymentObservable.unsubscribe();
    }
    if (this.listRepaymentsNext) {
      this.listRepaymentsNext.unsubscribe();
    }
  }

}
