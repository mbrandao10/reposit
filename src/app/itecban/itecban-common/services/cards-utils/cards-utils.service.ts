import { Injectable } from '@angular/core';
import { CurrencyPipe, AppConfigService} from 'onesait-core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CardsService } from '../../services-http/cards/cards.service';
import * as _ from 'underscore';

@Injectable()
export class CardsUtilsService {

  constructor(
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private translateService: TranslateService,
    private cardsService: CardsService,
    private appConfigService: AppConfigService
  ) { }

  reportMovementDebitCard(movementDetail: any) {
    let email: any = {};
    email.type = this.appConfigService.getConfig().reportMovementType;
    this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.REPORT.SUBJECET').subscribe(result => {
      email.subject = result;
    });
    this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.REPORT.BODY').subscribe(result => {
      email.body = result;
    });

    if (movementDetail.amount.amount) {
      this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.MONTO').subscribe(result => {
        email.body += '\n- ' + result + ': ' + this.currencyPipe.transform(movementDetail.amount.amount, movementDetail.amount.currency.code);
      });
    }
    if (movementDetail.reason) {
      this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.CONCEPT').subscribe(result => {
        email.body += '\n- ' + result + ': ' + movementDetail.reason;
      });
    }
    if (movementDetail.debitCardId) {
      this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.CARD').subscribe(result => {
        email.body += '\n- ' + result + ': ' + movementDetail.debitCardId;
      });
    }
    if (movementDetail.date) {
      this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.OPERATION.DATE').subscribe(result => {
        email.body += '\n- ' + result + ': ' + this.datePipe.transform(movementDetail.date, 'dd/MM/yyyy');
      });
    }
    if (movementDetail.city) {
      this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.OPERATION.CITY').subscribe(result => {
        email.body += '\n- ' + result + ': ' + movementDetail.city;
      });
    }
    if (movementDetail.shop) {
      this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.COMMERCE').subscribe(result => {
        email.body += '\n- ' + result + ': ' + movementDetail.shop;
      });
    }
    return email;
  }

  reportTravelDebitCard(travel: any) {
    let email: any = {};
    email.subject = 'Aviso que voy a realiza un viaje internacional con la tarjeta ' + travel.debitCardId;
    email.body = 'Aviso que voy a realiza un viaje internacional con la tarjeta ' + travel.debitCardId +
      '\n - Desde: ' + travel.from +
      '\n - Hasta: ' + travel.to +
      '\n - Destino: ' + travel.destination;
    return email;
  }

  putLimits(debitCardId: any, limitValue: any, limitPeriod: any) {
    let limitSave = {
        limitValueCode : limitValue.limitValueCode,
        limitValue: {
          amount: limitValue.limitValue.amount,
          currency: limitValue.limitValue.currency.code
        },
        temporality: {
          from: limitPeriod.from,
          to: limitPeriod.to
        },
    };
    let objTransfer = Object.assign({}, limitSave);
    return this.cardsService.putLimits(debitCardId, objTransfer);
  }

  getDebitCardStatus(debitcardStatusId: any) {
    switch (debitcardStatusId) {
      case this.appConfigService.getConfig().debitCardStatus.activate:
        return 'active';
      case this.appConfigService.getConfig().debitCardStatus.duplicate:
        return 'active';
      case this.appConfigService.getConfig().debitCardStatus.inactive:
        return 'inactive';
      case this.appConfigService.getConfig().debitCardStatus.inactiveRenew:
        return 'inactive';
      case this.appConfigService.getConfig().debitCardStatus.lock:
        return 'lock';
      default:
        return 'lock';
    }
  }

  getCreditcardBalanceFormat(balance: any) {
    let codePesos = this.appConfigService.getConfig().currencyCodes.pesos;
    let codeUSD = this.appConfigService.getConfig().currencyCodes.dolares;
    let currentBalanceByType = _.groupBy(balance.currentBalance, function(elem: any) { return elem.currency.code; });
    let currentBalancePESOS = currentBalanceByType[codePesos];
    let currentBalanceUSD = currentBalanceByType[codeUSD];
    let authorizedBalanceByType = _.groupBy(balance.authorizedBalance, function(elem: any) { return elem.currency.code; });
    let authorizedBalancePESOS = authorizedBalanceByType[codePesos];
    let authorizedBalanceUSD = authorizedBalanceByType[codeUSD];

    let availablePESOS = {
        amount: ((currentBalancePESOS) ? currentBalancePESOS[0].amount : 0) +
                ((authorizedBalancePESOS) ? authorizedBalancePESOS[0].amount : 0),
        currency: {
          code: codePesos
        }
      };

    let availableUSD = {
      amount: ((currentBalanceUSD) ? currentBalanceUSD[0].amount : 0) +
              ((authorizedBalanceUSD) ? authorizedBalanceUSD[0].amount : 0),
      currency: {
        code: codeUSD
      }
    };

    return {availablePESOS: availablePESOS, availableUSD: availableUSD};
  }

}

