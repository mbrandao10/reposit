import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatCardNumber'})
export class FormatCardNumberPipe implements PipeTransform {
    transform(value: string): any {
        // tslint:disable-next-line:curly
        if (!value) return value;

        const recorte = value.match(/.{1,4}/g).join('\u0020');
        return recorte;
    }
// tslint:disable-next-line:eofline
}

@Pipe({name: 'formatCardNumberHidden'})
export class FormatCardNumberHiddenPipe implements PipeTransform {
  transform(value: string, isMobileResolution?: boolean): any {
    // tslint:disable-next-line:curly
    if (!value) return value;

    return value.replace(/\w\S*/g, function(txt) {
        if(isMobileResolution)
          return '****' + txt.substr(12);
        else
          return txt.substr(0, 4) + ' ' + txt.substr(4, 4)  + ' XXXX ' + txt.substr(12);
    });
  }
// tslint:disable-next-line:eofline
}