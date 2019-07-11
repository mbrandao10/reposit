import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { DirectdebitsService } from 'itecban-common';
import { List, SignatureTokenService, RouterHelperService, SignatureEntity, DeviceUtilsService, ShareService } from 'onesait-core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DirectdebitsContract, DirectdebitsPayment, DirectdebitsPaymentReasonReturns, DirectdebitsParams } from 'onesait-api';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';


@Component({
  selector: 'app-directdebit-payments',
  templateUrl: './directdebit-payments.component.html'
})

export class DirectdebitPaymentsComponent implements OnInit, OnDestroy {

  @Input() contractId: string;

  protected listPaymentsObservable: Subscription;
  private deviceUtilsServiceSubscription: Subscription;
  protected listPayments: List;
  signatureEntity: SignatureEntity;
  loading = false;
  hasMoreData: boolean;
  contract: DirectdebitsContract;
  payments: DirectdebitsPayment[];
  paymentSelected: DirectdebitsPayment;
  step = 'LIST';
  deleteOk: boolean;
  paymentReasonReturns: DirectdebitsPaymentReasonReturns[];
  params: DirectdebitsParams;
  selectedItem: string;
  ismobileResolution: boolean;
  paramsObservable: Subscription;
  showchargeDate: boolean;
  maxReturnDate: boolean;
  reason: boolean;


  constructor(
    private directdebitsService: DirectdebitsService,
    private signatureTokenService: SignatureTokenService,
    protected router: Router,
    protected deviceUtilsService: DeviceUtilsService,
    private shareService: ShareService,
    protected route: ActivatedRoute
  ) {
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
  }

  ngOnInit() {
    this.listPayments = new List(this.directdebitsService, 'getPayments');
    this.paramsObservable = this.route.params.subscribe(params => {
      this.contractId = params['id'];
      this.getPayments();
    });
  }

  getPayments() {
    this.listPayments.reset();
    this.next();
  }

  next() {
    this.loading = true;
    if (this.listPaymentsObservable) {
      this.listPaymentsObservable.unsubscribe();
    }
    let args = [this.contractId];
    this.listPaymentsObservable = this.listPayments.next(args).subscribe(results => {
      this.loading = false;
      this.payments = results.data;
      if (results.paging && results.paging.hasMorePages) {
        this.hasMoreData = true;
      } else {
        this.hasMoreData = false;
      }
      this.showColumns();
    }, () => {
      this.loading = false;
      // console.log(e);
    });
  }

  paymentRefund() {
    this.step = 'VERIFY';
  }

  goBack() {
    this.params = undefined;
    this.paymentSelected = null;
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

    this.directdebitsService.putPayment(this.contractId, this.paymentSelected.id, this.params.id).subscribe(() => {
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
    this.paymentSelected = null;
    let link = [RouterHelperService.getPathFromId('directdebits-page')];
    this.router.navigate(link);
  }

  viewDetail(item: DirectdebitsPayment) {
    this.paymentSelected = item;
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

  showColumns() {
    this.payments.find((ele) => {
      return this.showchargeDate = ele.chargeDate ? true : false;
    });
    this.payments.find((ele) => {
      return this.maxReturnDate = ele.maxReturnDate ? true : false;
    });
    this.payments.find((ele) => {
      return this.reason = ele.reason ? true : false;
    });
  };

  ngOnDestroy() {
    this.listPaymentsObservable.unsubscribe();
    this.deviceUtilsServiceSubscription.unsubscribe();
    if (this.shareService) {
      this.shareService.getDataAndClear('breadcrumb-trail');
    }
    if (this.paramsObservable) {
      this.paramsObservable.unsubscribe();
    }
  }

}
