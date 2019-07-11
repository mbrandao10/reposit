import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAccountPipe'
})
export class FormatAccountPipe implements PipeTransform {

  transform(arrayFormats: any[], formatSelected: string, isMobileResolution?: boolean, withoutSpace?: boolean): any {
    let value: string;
    let exist: boolean; // Si no viene el formato que necesitamos, pintamos el primero que haya en el array de formats

    if (arrayFormats && arrayFormats.length > 0) {
      arrayFormats.forEach(element => {
        if (element.format.id === formatSelected) {
          exist = true;
          if ((formatSelected === 'IBAN') && (element.value.length >= 24)) {
            value = element.value.substring(0, 4) + ' ' + element.value.substring(4, 8) + ' ' + element.value.substring(8, 12) + ' ' + element.value.substring(12, 16) + ' ' + element.value.substring(16, 20) + ' ' + element.value.substring(20, 24);
            if (isMobileResolution) {
              value = value.replace(/^(.{21}).{4}/, '****');
            }
          } else {
            value = element.value;
          }
        }
      });

      if (!exist) {
        if (arrayFormats) {
          value = arrayFormats[0].value;
        }
      }
    }else{
      //Corregir el filtrado, si no hay ningún format tendríamos 
      //que devolver el id
      value = "";
    }

    if (withoutSpace) {
      value = value.replace(/ /g, '');
    }


    return value;
  }
}


