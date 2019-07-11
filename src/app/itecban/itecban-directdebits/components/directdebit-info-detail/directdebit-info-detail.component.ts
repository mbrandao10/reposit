import { Component, OnInit, Input } from '@angular/core';
import { DirectdebitRefundPayments } from 'onesait-api';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-directdebit-info-detail',
    templateUrl: './directdebit-info-detail.component.html'
})
export class DirectdebitInfoDetailComponent implements OnInit {

    @Input() paymentSelected: DirectdebitRefundPayments;
    constructor() { }

    ngOnInit() {
    }
}
