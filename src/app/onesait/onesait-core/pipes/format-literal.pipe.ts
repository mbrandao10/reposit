import { Pipe, PipeTransform } from '@angular/core';
import { FormatCardNumberHiddenPipe } from './formatCardNumber.pipe';

export enum LiteralFormats {
  IBAN,
  CCC,
  LITERAL,
  CARD
}

@Pipe({
  name: 'formatLiteralPipe'
})

export class FormatLiteralPipe implements PipeTransform {

  formatCardNumberHiddenPipe = new FormatCardNumberHiddenPipe();

  transform(value: string, format: LiteralFormats, resolution: string): any {
    let typeFormat: Object;
    if (format === LiteralFormats.IBAN) {
      typeFormat = {
        'mobileResolution': function () {
          return '**** ' + value.substr(20);
        },
        'tabletResolution': function () {
          return '**** **** ' + value.substr(20);
        },
        'desktopResolution': function () {
          return value.substring(0, 4) + ' ' + value.substring(4, 8) + ' ' + value.substring(8, 12) + ' ' + value.substring(12, 16) + ' ' + value.substring(16, 20) + ' ' + value.substring(20, 24);
        },
        'default': function () {
          return value.substring(0, 4) + ' ' + value.substring(4, 8) + ' ' + value.substring(8, 12) + ' ' + value.substring(12, 16) + ' ' + value.substring(16, 20) + ' ' + value.substring(20, 24);
        }
      };

    } else if (format === LiteralFormats.LITERAL) {
      typeFormat = {
        'mobileResolution': function () {
          return value = value.length > 20 ? value.substring(0, 13) + `...` : value;
        },
        'tabletResolution': function () {
          return value = value.length > 15 ? value.substring(0, 10) + `...` : value;
        },
        'desktopResolution': function () {
          return value = value.length > 32 ? value.substring(0, 28) + `...` : value;
        },
        'default': function () {
          return value;
        }
      };
    } else if (format === LiteralFormats.CARD) {
      let numCard = this.formatCardNumberHiddenPipe.transform (value);
      typeFormat = {
        'mobileResolution': function () {
          return  value.replace(/\w\S*/g, function (txt) {
            return '****' + txt.substr(12);
           });
        },
        'tabletResolution': function () {
          return numCard;
          // return value.replace(/\w\S*/g, function (txt) {
            // return txt.substr(0, 4) + ' XXXX ' + txt.substr(12);
          // });
        },
        'desktopResolution': function () {
          return numCard;
          // return value.replace(/\w\S*/g, function (txt) {
            // return txt.substr(0, 4) + ' XXXX ' + txt.substr(12);
          // });
        },
        'default': function () {
          return numCard;
        }
      };
    }
    return (typeFormat[resolution] || typeFormat['default'])();
  }
}









