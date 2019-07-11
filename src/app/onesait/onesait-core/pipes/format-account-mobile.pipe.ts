import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatAccountMobilePipe'
})
export class FormatAccountMobilePipe implements PipeTransform {

    transform(valueParam): any {
        let value: string;

        let tam = valueParam.length;
        value = '****' + valueParam.substring(tam - 4);
        // value = value.replace(/^(.{21}).{4}/, '****');

        return value;
    }
}


