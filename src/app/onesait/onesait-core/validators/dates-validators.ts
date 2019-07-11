import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import * as _moment from 'moment';
const moment = _moment;

export class DatesValidator {

    // Validador de fecha Inicial
    static DateInitialValidator(control: AbstractControl): { [key: string]: boolean } | null {
        let value = control.value;
        let now: any = new Date();
        if (value !== undefined && value !== null && value !== '') {
            value = Number(moment(value).format('YYYYMMDD'));
            now = Number(moment(now).format('YYYYMMDD'));
            if (value > now) {
                return { 'invalidDate': true };
            }
        }
        return null;
    }

    static DateMonthYearValidator(control: AbstractControl): { [key: string]: boolean } | null {
        let value = control.value;
        // let now: any = new Date();
        if (value !== undefined && value !== null && value !== '') {
            if (value.length > 7 ) {
                return { 'invalidDate': true };
            } else {
               let  valueDate: _moment.Moment = moment(value);
               if (!valueDate.isValid()) {
                 return { 'invalidDate': true };
               }
            }
           /* value = Number(moment(value).format('YYYYMMDD'));
            now = Number(moment(now).format('YYYYMMDD'));
            if (value > now) {
                return { 'invalidDate': true };
            }*/
        }
        return null;
    }


    public static DateEndValidator(control: AbstractControl): { [key: string]: boolean } | null {
        let value = control.value;
        if (value !== undefined && value !== null && value !== '') {
            value = Number(moment(value).format('YYYYMMDD'));
            let today = Number(moment(new Date()).format('YYYYMMDD'));
            if (value > today) {
                return { 'invalidDate': true };
            }
        }
        return null;
    }



    static groupValidationSearch(prefix: string): ValidatorFn {
        let result = (group: FormGroup): { [key: string]: boolean } | null => {

            for (const field in group.controls) {
                const control = group.get(field); // 'control' is a FormControl
                if (control.status === 'INVALID') {
                    return null;
                }
            }

            let dateFrom = group.get('dateFrom').value;
            let dateTo = group.get('dateTo').value;

            if (dateFrom !== undefined && dateTo !== undefined && dateFrom !== null && dateTo !== null && dateFrom !== '' && dateTo !== '') {
                dateFrom = Number(moment(dateFrom).format('YYYYMMDD'));
                dateTo = Number(moment(dateTo).format('YYYYMMDD'));
                if (dateFrom > dateTo) {
                    let compose = prefix + '.forbiddenPeriod';
                    return { [compose]: true };
                }
            }

            if (dateFrom !== undefined && dateFrom !== null && dateFrom !== '') {
                if (dateTo === undefined || dateTo === null || dateTo === '') {
                    let compose = prefix + '.requiredEndDate';
                    // return { 'requiredEndDate': true }; //Fecha Fin obligatoria
                    return { [compose]: true };
                }
            }

            if (dateTo !== undefined && dateTo !== null && dateTo !== '') {
                if (dateFrom === undefined || dateFrom === null || dateFrom === '') {
                    let compose = prefix + '.requiredInitialDate';
                    // return { 'requiredInitialDate': true }; //Fecha Inicial obligatoria
                    return { [compose]: true };

                }
            }

            if (dateFrom === '' || dateTo === '') {
                return { 'invalidDate': true };
            }

            if (dateTo !== undefined && dateTo !== null && dateTo !== '') {
                if (dateFrom === undefined || dateFrom === null || dateFrom === '') {
                    let compose = prefix + '.requiredInitialDate';
                    if (dateFrom < dateTo) {
                        // return { 'requiredInitialDate': true }; //Comparación de Fechas
                        return { [compose]: true };
                    }
                }
                return null;
            }
        };

        return result;
    }

    static CreationDateValidator(creationDate: number): ValidatorFn {
        let result = (control: AbstractControl): { [key: string]: boolean } | null => {
            let value = control.value;
            console.log(value);
            if(value == 'Invalid Date')
                return { 'invalidDate': true };

            if (value !== undefined && value !== null && value !== '') {
                value = Number(moment(value).format('YYYYMMDD'));
                if (value < creationDate) {
                    return { 'invalidDate': true };
                }
            }
            return null;
        };
        return result;
    }

    // Invalid Date
    public static DateInvalidDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        let errors = control.errors;
        let value = control.value;
        if (Object.prototype.toString.call(value) === '[object Date]') {
            // it is a date
            if (isNaN(value.getTime())) {  // d.valueOf() could also work
                // date is not valid
                control.setValue('');
                if (errors && errors.bsDate) {
                    control.setErrors({ 'bsDate': null });
                }
            }

        }
        if(value == 'Invalid Date')
        return { 'incorrectDate': true };
        return null;
    }

}
