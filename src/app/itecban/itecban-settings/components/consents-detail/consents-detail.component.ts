import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceUtilsService } from 'onesait-core';


@Component({
    selector: 'osb-consents-detail',
    templateUrl: './consents-detail.component.html'
})
export class ConsentsDetailComponent {

    @Input() consent;
    @Output() closeEvent = new EventEmitter();
    @Output() openMod = new EventEmitter();

    constructor(
        private deviceUtilsService: DeviceUtilsService
    ) {}

    isMobileResolution() {
        return this.deviceUtilsService.isMobileResolution;
    }

    close(): void {
        this.closeEvent.emit();
    }

    openModal () {
        this.openMod.emit(this.consent.consent.consentId);
    }

}
