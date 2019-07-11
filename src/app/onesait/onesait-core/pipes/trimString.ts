import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'TrimLastPipe'})
export class TrimLastPipe implements PipeTransform {

    transform(stringParam: any, charactsParam: number): string {
        let result = '';
        if (stringParam && charactsParam) {
            let length = stringParam.length;
            result = stringParam.substring(length, length - charactsParam);
            let strArrLeng = result.replace(/[^@]/g, '').length;
            if (strArrLeng > 0) {
                if (strArrLeng <= (charactsParam / 2)) {
                    result = result.substring(charactsParam, charactsParam - strArrLeng);
                } else {
                    result = result.substring(charactsParam, charactsParam / 2 );
                }
            }
        }
        return result;
    }
}
