import { Injectable } from '@angular/core';
import { CurrencyPipe, AppConfigService} from 'onesait-core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';

@Injectable()
export class AccountUtilsService {

  constructor(
    private currencyPipe: CurrencyPipe,
    private translateService: TranslateService,
    private appConfigService: AppConfigService
  ) { }

  orderAccounts(accounts: any[], currenciesCodes: string[]) {
    let result: any[] = [];

    currenciesCodes.forEach((currencyCode: string) => {
      let elements = _.filter(accounts, function(account: any) {
        return account.balance.currency.code === currencyCode;
      });
      elements = _.sortBy(elements, function(account: any) {
        return account.balance.amount;
      });
      result = result.concat(elements.reverse());
    });
    return result;
  }

  reportMovementAcount(movementDetail: any, type: string) {
    let email: any = {};
    switch (type) {
      case 'email': // Enviar por email el movimiento
        this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.SEND.SUBJECET').subscribe(result => {
          email.subject = result; });
        this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.SEND.BODY').subscribe(result => {
          email.body = result; });
        break;
      case 'report': // Reportar movimiento
        email.type = this.appConfigService.getConfig().reportMovementType;
        this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.REPORT.SUBJECET').subscribe(result => {
          email.subject = result; });
        this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.REPORT.BODY').subscribe(result => {
          email.body = result; });
        break;
      default:
        email.subject = '';
        email.body = '';
        break;
    }

    switch (movementDetail.type.id) {
      // Transferencia emitida y Transferencia recibida //MovementTRComponent
      case 'TRSE': case 'TRPE': case 'TRIE': case 'TRSR': case 'TRPR': case 'TRIR':
        if (movementDetail.id) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.REFERENCE.NUMBER').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.reference;
          });
        }
        if (movementDetail.amount.amount) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.MONTO').subscribe(result => {
            email.body += '\n- ' + result + ': ' + this.currencyPipe.transform(movementDetail.amount.amount, movementDetail.amount.currency.code);
          });
        }
        if (movementDetail.orderer !== undefined) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.ORIGIN').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.orderer.account.id;
          });
        }
        if (movementDetail.orderer !== undefined) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.SINCE').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.orderer.name;
          });
        }
        if (movementDetail.beneficiary !== undefined) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.DESTINATION').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.beneficiary.account.id;
          });
        }
        if (movementDetail.beneficiary !== undefined) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.BENEFICIARY').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.beneficiary.name;
          });
        }
        if (movementDetail.reason) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.CONCEPT').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.reason;
          });
        }
        if (movementDetail.state) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.DESCRIPTION').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.state;
          });
        }
        if (movementDetail.operationDateHour) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.OPERATION.DATE').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.operationDateHour;
          });
        }
        return email;
      // Compra o retirada de efectivo con tarjeta //MovementCARDComponent
      case 'CTDB': case 'RTDB':
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
        if (movementDetail.cardNumber) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.CARD').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.cardNumber;
          });
        }
        if (movementDetail.operationDateHour) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.OPERATION.DATE').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.operationDateHour;
          });
        }
        if (movementDetail.city) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.OPERATION.CITY').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.city;
          });
        }
        if (movementDetail.shop !== undefined) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.COMMERCE').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.shop.name;
          });
        }
        return email;
      default: // MovementSINDComponent
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
        if (movementDetail.operationDateHour) {
          this.translateService.get('ITECBAN-ACCOUNT.MOVEMENT.OPERATION.DATE').subscribe(result => {
            email.body += '\n- ' + result + ': ' + movementDetail.operationDateHour;
          });
        }
        return email;
    }
  }
}

