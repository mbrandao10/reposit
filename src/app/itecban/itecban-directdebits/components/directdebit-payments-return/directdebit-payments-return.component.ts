import { Component, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { List, SignatureTokenService, DeviceUtilsService, SignatureEntity, RouterHelperService } from 'onesait-core';
import { Subscription } from 'rxjs';
import { DirectdebitsService } from 'itecban-common';
import { Router, ActivatedRoute } from '@angular/router';
import { DirectdebitsParams, DirectdebitRefundPayments } from 'onesait-api';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'osb-directdebit-payments-return',
  templateUrl: './directdebit-payments-return.component.html'
})
export class DirectdebitPaymentsReturnComponent implements OnDestroy, OnChanges {

  @Input() account: string;
  loading: boolean;
  step = 'LIST';
  view = 'returns';
  protected listPayments: List;
  selectedItem: string;
  ismobileResolution: boolean;
  paramsObservable: Subscription;
  protected listPaymentsObservable: Subscription;
  refundPayments: DirectdebitRefundPayments[];
  refundPaymentSelected: DirectdebitRefundPayments;
  hasMoreData: boolean;
  deviceUtilsServiceSubscription: Subscription;
  params: DirectdebitsParams;
  deleteOk: boolean;
  signatureEntity: SignatureEntity;

  constructor(
    private directdebitsService: DirectdebitsService,
    private signatureTokenService: SignatureTokenService,
    protected router: Router,
    protected deviceUtilsService: DeviceUtilsService,
    protected route: ActivatedRoute) {
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
  }


  getPayments() {
    this.listPayments = new List(this.directdebitsService, 'getRefundPayments');
    this.listPayments.reset();
    this.next();
  }

  next() {
    if (this.listPaymentsObservable) {
      this.listPaymentsObservable.unsubscribe();
    }
    if (this.account !== "") {
      this.loading = true;
      let args = [this.account];
      this.listPaymentsObservable = this.listPayments.next(args).subscribe(results => {
        this.loading = false;
        this.refundPayments = results.data;
        if (results.paging && results.paging.hasMorePages) {
          this.hasMoreData = true;
        } else {
          this.hasMoreData = false;
        }

      }, () => {
        this.loading = false;
      });
    } else {
      this.refundPayments = [];
    }

  }

  paymentRefund() {
    this.step = 'VERIFY';
  }

  goBack() {
    this.params = undefined;
    this.refundPaymentSelected = null;
    this.selectedItem = null;
    this.step = 'LIST';
    this.listPayments.reset();
    this.next();
  }

  signOperation(params: DirectdebitsParams) {
    this.params = params;
    this.putPendingOperation('accept');
  }

  tokenCompleted() {
    this.putPendingOperation('accept');
  }

  putPendingOperation(action: string) {
    this.loading = true;

    this.directdebitsService.putPayment(this.account, this.refundPaymentSelected.id, this.params.id).subscribe(() => {
      this.loading = false;
      if (action === 'reject') {
        this.deleteOk = true;
        this.goBack();
      } else {
        this.step = 'CREATED';
      }

    }, (e: HttpErrorResponse) => {
      this.loading = false;
      if (action === 'accept') {
        if (this.signatureTokenService.requireSignature(e)) {
          this.signatureEntity = this.signatureTokenService.requireSignature(e);
        }
        if (this.signatureEntity) {
          this.step = 'TOKEN';
        }
      }
    });
  }

  goTodirectdebits() {
    this.refundPaymentSelected = null;
    let link = [RouterHelperService.getPathFromId('directdebits-page')];
    this.router.navigate(link);
  }

  viewDetail(item: DirectdebitRefundPayments) {
    this.refundPaymentSelected = item;
    if (item.id !== this.selectedItem) {
      this.selectedItem = item.id;
    } else {
      this.selectedItem = null;
    }
  }

  close() {
    this.selectedItem = null;
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.account) {
      this.getPayments();
    }
  }

  ngOnDestroy() {
    this.listPaymentsObservable.unsubscribe();
    this.deviceUtilsServiceSubscription.unsubscribe();

    if (this.paramsObservable) {
      this.paramsObservable.unsubscribe();
    }
  }

}
