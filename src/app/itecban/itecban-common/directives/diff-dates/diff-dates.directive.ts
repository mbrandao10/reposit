import { Directive, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import * as _moment from 'moment';
const moment = _moment;

@Directive({
    selector: '[diffDates]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DifferenceDatesDirective), multi: true }
    ]
})
export class DifferenceDatesDirective implements Validator {

    @Input() dateFrom: Date;
    @Input() dateTo: Date;
    @Input() type: string;
    @Input() difference: number;
    @Output() checkOtherDate = new EventEmitter();

    validate(c: AbstractControl): { [key: string]: any } {
        const value = c.value;
        let response: any = {type: String, valid: Boolean};

        if (this.type === 'from') {this.dateFrom = value; }
        if (this.type === 'to') {this.dateTo = value; }

        if (this.dateFrom && this.dateTo) {
            let from = moment(this.dateFrom);
            let to = moment(this.dateTo);
            let dif = to.diff(from, 'days');
            let resultValid = (dif >= 0 && dif <= this.difference) ? true : false;
            if (resultValid) {
                response.type = this.type;
                response.valid = true;
                this.checkOtherDate.emit(response);
                return null;
            }
        }

        response.type = this.type;
        response.valid = false;
        this.checkOtherDate.emit(response);
        return {
            diffDates: {
                valid: false
            }
        };
    }

}
