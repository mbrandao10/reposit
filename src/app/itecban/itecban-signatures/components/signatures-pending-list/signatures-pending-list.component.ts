import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  List,
  SignatureEntity,
  ModalComponent,
  SignatureService,
  InfoHeaderService,
  DeviceUtilsService,
  HeaderService
} from 'onesait-core';

import * as _ from 'underscore';
import { Subscription } from 'rxjs';
import { PendingSignature, PendingSignatureDetail } from 'onesait-api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RefreshComponent } from 'itecban-common';

@Component({
  selector: 'app-signatures-pending-list',
  templateUrl: './signatures-pending-list.component.html'
})
export class SignaturesPendingListComponent extends RefreshComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal: ModalComponent;

  private deviceUtilsServiceSubscription: Subscription;
  loading: boolean;
  listPendingSignatures: List;
  listPendingSignaturesObservable: Subscription;
  pendingSignatures: PendingSignature[];
  hasMoreData: boolean;
  selectedItem: string;
  step = 'LIST';
  itemPendingSelected: PendingSignature;
  signatureEntity: SignatureEntity;
  ismobileResolution: boolean;
  action: string;
  view: string;
  pendingSignatureDetail: PendingSignatureDetail;

  constructor(
    private signatureService: SignatureService,
    protected router: Router,
    protected infoHeaderService: InfoHeaderService,
    protected translateService: TranslateService,
    private headerService: HeaderService,
    protected deviceUtilsService: DeviceUtilsService
    ) {
    super(router);
    this.listPendingSignatures = new List(
      this.signatureService,
      'getPendingOperations'
    );
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
   });

  }

  ngOnInit() {
    //this.initializeComponent();
  }


  initializeComponent() {
    this.headerService.setTitle('ITECBAN-PERSONS.MY.SPACE.SIGNATURES');
    this.selectedItem = null;
    this.listPendingSignatures.reset();
    this.next();
  }

  next() {
    this.step = 'LIST';
    let args = [{ recipient: 'user' }];
    // let args = { query: { recipient: 'user' } };
    if (this.listPendingSignaturesObservable) {
      this.listPendingSignaturesObservable.unsubscribe();
    }
    this.loading = true;
    this.listPendingSignaturesObservable = this.listPendingSignatures
      .next(args)
      .subscribe(
        results => {
          this.loading = false;
          this.pendingSignatures = results.data;
          if (results.paging && results.paging.hasMorePages) {
            this.hasMoreData = true;
          } else {
            this.hasMoreData = false;
          }
        },
        (e: HttpErrorResponse) => {
          console.log(e.message);
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.listPendingSignaturesObservable) {
      this.listPendingSignaturesObservable.unsubscribe();
    }
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }

  viewDetail(item: PendingSignature) {
    if (item.id !== this.selectedItem) {
      this.loading = true;
      this.signatureService.getPendingOperationDetail(item.id).subscribe(results => {
      this.pendingSignatureDetail = results.data;
      this.itemPendingSelected = item;
      this.loading = false;
      this.selectedItem = item.id;
    }, (e) => {
      console.log(e);
      this.loading = false;
    });
    } else {
      this.selectedItem = null;
    }
  }

  verifyOperation(item: PendingSignature, actio: string) {
    this.itemPendingSelected = item;
    this.loading = true;
    this.signatureService.getPendingOperationDetail(item.id).subscribe(results => {
      this.pendingSignatureDetail = results.data;
      this.itemPendingSelected = item;
    if (item.id !== this.selectedItem) {
      this.selectedItem = item.id;
    } else {
      this.selectedItem = null;
    }
    this.action = actio;
    this.step = 'VERIFY';
    this.loading = true;
    if (!this.ismobileResolution) {
      this.closeDeleteModal();
    }
      this.loading = false;
    }, (e) => {
      console.log(e);
      this.loading = false;
    });
  }

  cancelOperation() {
    this.modal.open();
  }

  returnOperation() {
    this.step = 'LIST';
  }

  cancelSignature() {
    console.log('reject');
    this.modal.close();
    this.verifyOperation(this.itemPendingSelected , 'reject');
  }

  closeDeleteModal() {
    this.modal.close();
  }

  close(finish: boolean) {
    this.selectedItem = null;
    this.step = 'LIST';
    if (finish) {
      this.listPendingSignatures.reset();
      this.next();
    }
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
 }

}
