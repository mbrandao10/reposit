import { Directive, forwardRef, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import * as _ from 'underscore';

@Directive({
    selector: '[validateProvinceCity]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => ProvinceCityValidatorDirective), multi: true }
    ]
})
export class ProvinceCityValidatorDirective implements Validator, OnChanges {

    @Input() listValidate: any = [];
    @Input() type: String;
    @Output() isValid = new EventEmitter();

    typeCity = 'CITY';
    typeProvince = 'PROVINCE';

    ngOnChanges() {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        const valueSelected = c.value;
        const inputIsValid: any = {};
        console.log(valueSelected);
        console.log(this.listValidate.length);


        if (!valueSelected || valueSelected.length < 1) {
            inputIsValid.valid = false;
            inputIsValid.literal = 'COMMON.FIELD.REQUIRED';
            this.isValid.emit(inputIsValid);
            return {
                validateProvinceCity: {
                    valid: false
                }
            };
        }

        if (this.type === this.typeProvince) {
            if (valueSelected && this.listValidate) {
                const auxlistValidateByName = _.groupBy(this.listValidate, function(elem: any) { return elem.name; });
                const recordFinded = auxlistValidateByName[valueSelected];
                if (!recordFinded) {
                    inputIsValid.valid = false;
                    inputIsValid.literal = 'COMMON.FIELD.NOTFOUND';
                    this.isValid.emit(inputIsValid);
                    return {
                        validateProvinceCity: {
                            valid: false
                        }
                    };
                }
            }
        }
        inputIsValid.valid = true;
        this.isValid.emit(inputIsValid);
        return null;
    }
}
