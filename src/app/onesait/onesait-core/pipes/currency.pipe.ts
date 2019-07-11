import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigService } from '../services/app-config-service/app-config.service';

@Pipe({ name: 'CurrencyPipe' })
export class CurrencyPipe implements PipeTransform {
    regx = /(\d+)(\d{3})/; // regla para separar los miles por puntos
    separator = '.'; // separador para los miles

    constructor(private appConfigService: AppConfigService) {

    }

    transform(amountParam: number, currencyParam?: any, onlyCurrency?: boolean): any {
        if (currencyParam === '') {
            currencyParam = '978';
        }
        let amountCurrency: any = amountParam || 0; // Valor que el Pipe
        const arrCurrencies = this.appConfigService.getConfig('currencies'); // Array con las monedas
        if (onlyCurrency) {
            for (let i = 0; i < arrCurrencies.length; i++) {

                if (arrCurrencies[i].code === currencyParam) {
                    amountCurrency = arrCurrencies[i];
                }
            }
        } else {
            // comprobamos que es un numero o un string con un numero
            amountParam = this.checkForNumber(amountParam);
            if (amountParam !== null) {
                const arrAmount = this.appConfigService.getConfig('currencies'); // Array con las monedas

                let amount = amountParam.toFixed(2) + ''; // Asignamos dos decimales al importe
                // tslint:disable-next-line:prefer-const
                let [splitLeft, splitRight, ] = amount.split('.');

                while (this.regx.test(splitLeft)) {
                    splitLeft = splitLeft.replace(this.regx, '$1' + this.separator + '$2');
                }

                amount = splitLeft + ',' + splitRight; // Formamos el numero con el formato requerido
                amountCurrency = amount;

                for (let i = 0; i < arrAmount.length; i++) {

                    if (arrAmount[i].code === currencyParam) {

                        switch (arrAmount[i].position) {
                            case 'left':
                                amountCurrency = arrAmount[i].sign + ' ' + amount;
                                break;
                            case 'right':
                                amountCurrency = amount + ' ' + arrAmount[i].sign;
                                break;
                        }

                        break;
                    }
                }

            }
        }

        return amountCurrency;
    }

    /**
     * Testea que el valor que recibe es un numero o un objeto que pueda ser pasado a numero
     *
     * @param param valor a comprobar
     * @returns el valor en formato numerico
     */
    checkForNumber(param: any): number {
        if (param !== undefined && param !== null) {
            if (typeof param === 'number') {

                return param;
            } else {
                if (!isNaN(parseFloat(param)) && isFinite(param)) {

                    return parseFloat(param);
                }
            }
        }

        return null;
    }
}
