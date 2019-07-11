import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateymdTodmy'
})
export class DateymdTodmyPipe implements PipeTransform {

  transform(value: any): any {
    let fechadmy: any = '';
    if (value) {
      if ( value.length > 9 ) {
        fechadmy = value.substring(8);
        fechadmy += '-';
        fechadmy += value.substring(5, 7);
        fechadmy += '-';
        fechadmy += value.substring(0, 4);
      }
      return fechadmy;
  }
  return value;
  }

}
