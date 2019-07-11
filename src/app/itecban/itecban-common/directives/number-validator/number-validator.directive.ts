import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateNumber]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NumberValidatorDirective), multi: true }
    ]
})
export class NumberValidatorDirective implements Validator {

    @Input() min: number;
    @Input() max: number;


    validate(c: AbstractControl): { [key: string]: any } {
        const value = c.value;
        let vNumber;

        if (this.isNumeric(value)) {
            vNumber = parseFloat(value);
        } else {
            // No es un numero no pasa la validacion
            return {
                validateNumber: {
                    valid: false
                }
            };
        }

        if (this.exist(this.min)) {
            if (vNumber < this.min) {
                // es menor que el minimo
                return {
                    validateNumber: {
                        valid: false
                    }
                };
            }
        }

        if (this.exist(this.max)) {
            if (vNumber > this.max) {
                // es mayor que el maximo
                return {
                    validateNumber: {
                        valid: false
                    }
                };
            }
        }


        return null;
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    exist(objec: any): boolean {

        return (typeof objec !== 'undefined' && objec !== null);
    }
}


