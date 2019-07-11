import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoansService } from 'itecban-common';
import { List } from 'onesait-core';
import { DeviceUtilsService } from 'onesait-core';
import { Subscription } from 'rxjs';
import { LoanRepayment } from 'onesait-api';

@Component({
  selector: 'osb-fees-paid',
  templateUrl: './fees-paid.component.html'
})

export class FeesPaidComponent implements OnInit, OnDestroy {

  @Input() idLoan;
  loading: boolean;
  listReceipts: List;
  hasMoreData: boolean;
  selectedItem: string;
  receipts: LoanRepayment;
  listReceiptsNext: Subscription;
  listReceiptsObservable: Subscription;

  constructor(
    private loanService: LoansService,
    protected deviceUtilsService: DeviceUtilsService
  ) {
    this.loading = true;
    this.listReceipts = new List(this.loanService, 'getLoansReceipts');
    this.listReceiptsObservable = this.listReceipts.getList().subscribe(results => {
      this.receipts = results.data;
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
    this.listReceiptsNext = this.listReceipts.next([this.idLoan]).subscribe((result: any) => {
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

  viewDetail(receipts): void {
    if (this.selectedItem === receipts) {
      this.selectedItem = '';
    } else {
      this.selectedItem = receipts;
    }
  }

  isMobileResolution(): boolean {
    return this.deviceUtilsService.isMobileResolution;
  }

  close() {
    this.selectedItem = null;
  }

  ngOnDestroy(): void {
    if (this.listReceiptsObservable) {
      this.listReceiptsObservable.unsubscribe();
    }
    if (this.listReceiptsNext) {
      this.listReceiptsNext.unsubscribe();
    }
  }

}
