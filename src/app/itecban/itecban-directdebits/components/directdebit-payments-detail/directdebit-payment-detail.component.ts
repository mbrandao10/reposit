import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppConfigService, ModalComponent, DeviceUtilsService, InfoHeaderService } from 'onesait-core';
import { DirectdebitsPayment } from 'onesait-api';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-directdebit-payment-detail',
    templateUrl: './directdebit-payment-detail.component.html'
})
export class DirectdebitPaymentDetailComponent implements OnInit, OnDestroy {

    @Input() paymentSelected: DirectdebitsPayment;
    @Output() cancelOperationEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() paymentRefundEvent = new EventEmitter();
    @Output() closeEvent = new EventEmitter();
    @ViewChild('modal') modal: ModalComponent;
    action: string;

    private deviceUtilsServiceSubscription: Subscription;
    accountFormatView: string;
    loading: boolean;
    view = 'detail';
    ismobileResolution: boolean;

    constructor(
        appConfigService: AppConfigService,
        protected deviceUtilsService: DeviceUtilsService,
        protected infoHeaderService: InfoHeaderService,
        protected translateService: TranslateService,
    ) {
        this.accountFormatView = appConfigService.getConfig().account.viewKey;
        this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
            this.ismobileResolution = deviceUtilsService.isMobileResolution;
        });
    }

    ngOnInit() {
        this.loading = false;
    }

    cancelOperation() {
        if (this.ismobileResolution) {
            this.view = 'cancel';
        } else {
            this.cancelOperationEvent.emit(this.paymentSelected);
        }
    }

    returnOperation() {
        if (this.ismobileResolution) {
            this.view = 'detail';
        }
    }

    openModalListSigner() {
        if (this.ismobileResolution) {
            this.view = 'signatures';
        } else {
            this.modal.open();
        }
    }

    verifyOperation(actio?: string) {
        this.action = actio;
        this.view = 'TOKEN';
    }

    closeModal() {
        this.modal.close();
    }

    paymentRefund() {
        this.paymentRefundEvent.emit();
    }

    close() {
        this.closeEvent.emit();
    }

    isMobileResolution() {
        return this.deviceUtilsService.isMobileResolution;
    }

    ngOnDestroy(): void {
        this.deviceUtilsServiceSubscription.unsubscribe();
    }
}
