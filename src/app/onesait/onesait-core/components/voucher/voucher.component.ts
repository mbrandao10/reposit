import { Component, ContentChildren, QueryList, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild, Input } from '@angular/core';
import { VoucherKeyValueDirective } from '../../directives/voucher/voucher.directive';
import { User } from 'onesait-api';
import { UtilsService } from '../../services/utils-service/utils.service';
import { TranslateService } from '@ngx-translate/core';
import * as _moment from 'moment';
const moment = _moment;

@Component({
    selector: 'osb-voucher-container',
    template: '<div #ngcontent><ng-content ></ng-content></div>'
})
export class VoucherContainerComponent implements AfterViewInit {

    @ContentChildren(VoucherKeyValueDirective, { descendants: true }) keyValues: QueryList<VoucherKeyValueDirective>;
    // @ContentChild('ngcontent') content: ElementRef;
    @ViewChild('ngcontent') content: ElementRef;

    @Input() voucherJson: any;

    private user: User;
    private userName: string;
    private dateOperation: string;

    constructor(private cdr: ChangeDetectorRef, private utilsService: UtilsService, private translateService: TranslateService) {
        this.user = this.utilsService.getUser();
        this.userName = this.user.userName + ' ' + ((this.user.userFirstSurname) ? this.user.userFirstSurname : '') + ' ' + ((this.user.userSecondSurname) ? this.user.userSecondSurname : '');
        this.dateOperation = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    getMap() {
        let result;
        if (this.keyValues && this.keyValues.length > 0) {
            let json = {};
            let keyValuesArray = this.keyValues.toArray();
            keyValuesArray.forEach((keyValue: VoucherKeyValueDirective) => {
                json[keyValue.getKey().trim()] = keyValue.getValue().trim();
            });
            result = json;
        } else {
            result = this.getMapByClass();
        }
        if (this.voucherJson) {
            result = Object.assign({}, result, this.voucherJson);
        }

        //Add aditinal info
        this.translateService.get(['VOUCHER.GENERIC.USER', 'VOUCHER.GENERIC.DATEOPERATION']).subscribe((resultTranslate: Array<string>) => {
            result["generic." + resultTranslate['VOUCHER.GENERIC.USER']] = this.userName;
            result["generic." + resultTranslate['VOUCHER.GENERIC.DATEOPERATION']] = this.dateOperation;
        });



        return result;
    }

    getMapByClass(): any {
        let json = {};
        if (this.content) {
            let keyValueElements = this.content.nativeElement.getElementsByClassName('voucherKeyValue');
            for (let i = 0; i < keyValueElements.length; i++) {
                try {
                    let element = keyValueElements[i];
                    let keyElement = element.querySelector('.voucherKey');
                    let keyValue = element.querySelector('.voucherValue');
                    let key = keyElement.textContent.trim();
                    if (keyElement.getAttribute('prefix')) {
                        key = keyElement.getAttribute('prefix') + '.' + key;
                    }
                    if (keyElement && keyValue) {
                        json[key] = keyValue.textContent.trim();
                    }
                } catch (_e) {

                }

            }
        }
        return json;
    }

}
