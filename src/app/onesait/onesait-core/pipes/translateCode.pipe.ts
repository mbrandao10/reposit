import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({name: 'TranslateCodePipe'})
export class TranslateCodePipe implements PipeTransform {
    constructor(private translateService: TranslateService) {}
    transform(codeParam: any, valueParam): any {
        let translate = '';
        this.translateService.get(codeParam).subscribe(result  =>  {
            if (result === codeParam) {
                translate = valueParam;
            } else {
                translate = result;
            }
        });
        return translate;
    }
// tslint:disable-next-line:eofline
}