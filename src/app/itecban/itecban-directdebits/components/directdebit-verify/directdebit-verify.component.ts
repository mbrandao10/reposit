import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppConfigService, ModalComponent, DeviceUtilsService } from 'onesait-core';
import { DirectdebitsPayment, DirectdebitsPaymentReasonReturns } from 'onesait-api';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DirectdebitsService } from 'itecban-common';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-directdebit-payment-verify',
    templateUrl: './directdebit-verify.component.html'
})
export class DirectdebitVerifyComponent implements OnInit, OnDestroy {

    @Input() paymentSelected: DirectdebitsPayment;
    @Output() signOperationEvent = new EventEmitter();
    @Output() closeEvent = new EventEmitter();
    @Output() goBackEvent = new EventEmitter();
    @ViewChild('modal') modal: ModalComponent;
    action: string;

    private deviceUtilsServiceSubscription: Subscription;
    selectReasonForm: FormGroup;
    accountFormatView: string;
    loading: boolean;
    step = 'VERIFY';
    ismobileResolution: boolean;
    paymentReasonReturns: DirectdebitsPaymentReasonReturns[];

    constructor(
        appConfigService: AppConfigService,
        protected deviceUtilsService: DeviceUtilsService,
        protected directdebitsService: DirectdebitsService
    ) {
        this.accountFormatView = appConfigService.getConfig().account.viewKey;
        this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
            this.ismobileResolution = deviceUtilsService.isMobileResolution;
        });
    }

    ngOnInit() {
        this.loading = false;
        this.createFormControl();
        this.getPaymentReturn();
    }

    createFormControl() {
        this.selectReasonForm = new FormGroup({
            selectReason: new FormControl('', Validators.required),
            inputReason: new FormControl('', Validators.required),
        });
    }


    getPaymentReturn() {
        this.directdebitsService.getPaymentReturn().subscribe(result => {
            this.paymentReasonReturns = result.data;
        });
    }

    signOperation() {
        let params = {
            id: this.selectReasonForm.value.selectReason.id,
            name: this.selectReasonForm.value.selectReason.name,
            text: this.selectReasonForm.value.inputReason
        };
        this.signOperationEvent.emit(params);
    }

    closeModal() {
        this.modal.close();
    }

    close() {
        this.closeEvent.emit();
        this.goBackEvent.emit();
    }

    goBack() {
        this.selectReasonForm = undefined;
        this.goBackEvent.emit();
    }

    isMobileResolution() {
        return this.deviceUtilsService.isMobileResolution;
    }

    ngOnDestroy(): void {
        this.deviceUtilsServiceSubscription.unsubscribe();
    }
}
