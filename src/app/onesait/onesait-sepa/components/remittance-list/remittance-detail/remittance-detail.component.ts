import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SepaService, List } from 'onesait-core';
import { SepaRemittanceDetail, SepaRemittanceDetailOrders, SepaFileTypeId, GenericListResponse } from 'onesait-api';

@Component({
  selector: 'osb-remittance-detail',
  templateUrl: './remittance-detail.component.html'
})
export class RemittanceDetailComponent implements OnInit, OnDestroy {

  @Input() remittance: SepaRemittanceDetail;
  @Output() backButton = new EventEmitter();

  protected listOrdersObservable: any;
  protected listOrders: List;
  orders: GenericListResponse<SepaRemittanceDetailOrders>;

  loading: boolean;
  hasMoreData: boolean;

  sepaFileTypeId = SepaFileTypeId;

  constructor(private sepaService: SepaService) {
    this.listOrders = new List(this.sepaService, 'getOrdersOfRemittanceDetail');
  }

  ngOnInit() {
    this.next();
  }

  handleBackButton($event) {
    this.backButton.emit($event);
  }

  next() {
    let params = {
      type: this.remittance.fileType.id,
      remittanceId: this.remittance.id
    };
    let args = [params];

    if (this.listOrdersObservable) {
      this.listOrdersObservable.unsubscribe();
    }
    this.loading = true;
    this.listOrdersObservable = this.listOrders.next(args).subscribe(this.successOrders, this.errorOrders);
  }

  private successOrders = (myResult) => {
    this.loading = false;
    this.orders = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorOrders = (error) => {
    this.loading = false;
    console.log(error);
  }

  ngOnDestroy () {
    this.listOrdersObservable.unsubscribe();
  }
}
