import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService} from '@ngx-translate/core';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({name: 'DateAgoPipe'})
export class DateAgoPipe implements PipeTransform {

    /*  Hoy
        Hace 1 día
        Hace 2 días
        Hace 3 días
        A partir del 4 día se ha de mostrar en formato dd-mm-aaaa
    */

    constructor(private translateService: TranslateService,
                private datePipe: DatePipe) {}

    transform(dateParam: any): any {
        let message = '';
        let str_since = '';
        let str_days = ' ';
        let currentDayFull = new Date(); // Dia actual
        currentDayFull.setHours(0, 0, 0, 0);
        let currentDay = moment(currentDayFull.getTime());
        let paramDayFull = new Date(dateParam); // Dia recibido por parámetro
        paramDayFull.setHours(0, 0, 0, 0);
        let paramDay = moment(paramDayFull);
        let difference = currentDay.diff(paramDay, 'days');

        switch (true) {
            case (difference < 1):
                this.translateService.get('ITECBAN-COMMON.PIPES.DATEAGO.TODAY').subscribe(result => {
                    message = result;
                });
                break;
            case (difference < 4):
                this.translateService.get('ITECBAN-COMMON.PIPES.DATEAGO.SINCE').subscribe(result => {
                    str_since = result;
                });
                if (difference === 1) {
                    this.translateService.get('COMMON.DAY').subscribe(result => {
                        str_days += result;
                    });
                } else {
                    this.translateService.get('COMMON.DAYS').subscribe(result => {
                        str_days += result;
                    });
                }
                message = str_since + difference + str_days;
                break;
            default:
                message = this.datePipe.transform(dateParam, 'dd/MM/yyyy');
        }

        return message;
    }
}
