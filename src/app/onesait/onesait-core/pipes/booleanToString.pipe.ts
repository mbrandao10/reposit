import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({name: 'BooleanToStringPipe'})
export class BooleanToStringPipe implements PipeTransform {

    constructor(private translateService: TranslateService) {}

    transform(valueParam): any {
        let value: any;
        if (valueParam === true || valueParam === 'true') {
            this.translateService.get('COMMON.YES').subscribe(result => {
                value = result;
            });
        } else {
            this.translateService.get('COMMON.NO').subscribe(result => {
                value = result;
            });
        }
        return value;
    }
}
