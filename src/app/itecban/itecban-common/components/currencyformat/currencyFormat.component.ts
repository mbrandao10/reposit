import { Component, Input, OnChanges } from '@angular/core';
import { AppConfigService } from 'onesait-core';

 /**
   * Component to format currency
   */
@Component({
	selector: 'app-currencyformat',
	templateUrl: './currencyformat.component.html'
})
export class CurrencyformatComponent implements OnChanges {

	@Input() private amountParam: any;
	@Input() private currencyParam: any;

	integerPart: string;
	decimalPart: string;
	sign: string;
	signPosition: string;

	constructor(private appConfigService: AppConfigService) { }

	ngOnChanges() {
		if (this.amountParam || this.amountParam === 0) {
			let arrAmount = this.appConfigService.getConfig().currencies; // Array con los tipos de monedas
			let separator = '.'; // separador para los miles
			let num = this.amountParam.toFixed(2); // le obligamos a que tenga dos decimales
			num += '';
			let splitStr = num.split('.'); // separa las partes por el "."
			let splitLeft = splitStr[0]; // parte entera
			let splitRight = splitStr[1]; // parte decimal
			let regx = /(\d+)(\d{3})/; // regla para separar los miles por puntos

			while (regx.test(splitLeft)) {
				splitLeft = splitLeft.replace(regx, '$1' + separator + '$2');
			}

			for (let i = 0; i < arrAmount.length; i++) {
				if (arrAmount[i].code === this.currencyParam) {
					this.sign = arrAmount[i].sign;
					this.signPosition = arrAmount[i].position;
					break;
				}
			}
			this.integerPart = splitLeft ;
			this.decimalPart = splitRight;
		}

	}
}
