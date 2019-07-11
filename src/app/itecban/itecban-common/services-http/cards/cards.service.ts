import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions, AppConfigService, SignatureEntity, List } from 'onesait-core';
import { constants, Pageable } from 'onesait-core';
import { CardsEndpoints, GenericResponse, GenericListResponse } from 'onesait-api';
import { UtilsService } from 'onesait-core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CardsService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private utilsService: UtilsService,
    private appConfigService: AppConfigService
  ) {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_CARDS');
  }

  getDebitCards(): Observable<GenericListResponse<List>> {
    return this.req.get(this.serverUrl + CardsEndpoints.BASIC);
  }

  getDebitCard(cardId: any) {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_CARD, {cardId: cardId});
  }

  deleteDebitCard(cardId: any, cardType: any) {
    let params = {cardId: cardId, cardType: cardType},
      opts = {cardId: '@cardId'};
    return this.req.delete(this.serverUrl + CardsEndpoints.DELETE_CARD, params, opts);
  }

  updateAlias(cardId: any, alias: string) {
    let params = { cardId : cardId , alias: alias },
    opts = {cardId : '@cardId' };
    return this.req.put(this.serverUrl + CardsEndpoints.UPDATE_ALIAS, params, opts);
  }

  getAlias(cardId: any) {
    let params = { cardId : cardId },
    opts = { cardId : '@cardId', disableErrors: true };
    return this.req.get(this.serverUrl + CardsEndpoints.UPDATE_ALIAS, params, opts);
  }

  getLimits(cardId: any) {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_LIMITS, { cardId: cardId });
  }

  putLimits(cardId: any, params: any) {
    params.cardId = cardId;
    let opts = {cardId: '@cardId'};
    return this.req.put(this.serverUrl + CardsEndpoints.PUT_LIMITS, params, opts);
  }

  getLimitsCredit(cardId: any, officeNumber: any) {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_LIMITS_CREDIT + '?officeNumber=' + officeNumber, {cardId: cardId});
  }

  getLimitsValues() {
      return this.req.get(this.serverUrl + CardsEndpoints.GET_LIMITS_VALUES);
  }

  getMovements(cardId: any, params: any, pageable: Pageable) {
    if (!params) { params = {}; }
    params.cardId = cardId;
    return this.req.get(this.serverUrl + CardsEndpoints.GET_MOVEMENTS, params, undefined, pageable).pipe(map(res => {
      for (let item of res.data) {
        item.id = (item.id);
      }
      return res;
    }));
  }

  getMovement(cardId: any, movementId: any) {
    let params = { cardId: cardId, movementId: movementId};
    return this.req.get(this.serverUrl + CardsEndpoints.GET_MOVEMENT, params);
  }

  postActivateDebitCard(cardId: any, cardType: any, token: any) {
    let headers: any = {};
    headers[constants.SIGNATURE_KEY] = token;
    let params = {cardId: cardId};
    let opts = {
      headers: headers,
      cardId: '@cardId'
    };
    return this.req.post(this.serverUrl + CardsEndpoints.POST_ACTIVATE_CARD + '?cardType=' + cardType, params,  opts);
  }

  postDuplicateDebitCard(cardId: any) {
    let params = {cardId: cardId};
    let opts = {cardId: '@cardId'};
    return this.req.post(this.serverUrl + CardsEndpoints.POST_DUPLICATE_CARD, params, opts);
  }

  postLockCard(cardId) {
    let params = {reasonType: 1, cardId : cardId};
    let opts = {cardId: '@cardId'};
    return this.req.post(this.serverUrl + CardsEndpoints.POST_LOCK_CARD, params, opts);
  }

  getLinkableAccounts() {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_LINKABLE_ACCOUNTS);
  }

  getAccountsAssociates(cardId: any, params: any) {
    if (!params) { params = {}; }
    params.cardId = cardId;
    return this.req.get(this.serverUrl + CardsEndpoints.GET_ACCOUNTS_ASSOCIATES, params).pipe(map(res => {
      for (let item of res.data) {
        this.utilsService.transformAccount(item, item.formats);
      }
      return res;
    }));
  }

  putAccountsAssociates(cardId: any, params: any) {
    params.cardId = cardId;
    let opts = {cardId: '@cardId'};
    return this.req.put(this.serverUrl + CardsEndpoints.PUT_ACCOUNTS_ASSOCIATES, params, opts);
  }

  getCreditcardBalance(cardId: any) {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_CREDITCARD_BALANCE, {cardId: cardId});
  }

  getPaymentTypes() {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_PAYMENT_TYPES);
  }

  udpatePaymentType(cardId: any, id: any) {
    let params = { cardId : cardId , id: id },
    opts = {cardId : '@cardId' };
    return this.req.put(this.serverUrl + CardsEndpoints.PUT_PAYMENT_TYPE, params, opts);
  }

  getSettlementGroups() {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_SETTLEMENT_GROUPS);
  }

  udpateSettlementGroup(cardId: any, id: any) {
    let params = { cardId : cardId , id: id },
    opts = {cardId : '@cardId' };
    return this.req.put(this.serverUrl + CardsEndpoints.PUT_SETTLEMENT_GROUPS, params, opts);
  }

  getStatementsStatysTypes() {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_STATEMENTS_STATUS_TYPES);
  }

  getStatements(cardId: any, params: any, pageable: Pageable) {
    if (!params) { params = {}; }
    params.cardId = cardId;
    return this.req.get(this.serverUrl + CardsEndpoints.GET_STATEMENTS, params, undefined, pageable);
  }

  getStatement(cardId: any, referenceId: any) {
    let params = { cardId: cardId, movementId: referenceId};
    return this.req.get(this.serverUrl + CardsEndpoints.GET_STATEMENT, params);
  }

  postCreditcardPayment(cardId: any, params: any) {
    params.cardId = cardId;
    let opts = {cardId: '@cardId'};
    return this.req.post(this.serverUrl + CardsEndpoints.POST_CREDITCARD_PAYMENT, params, opts);
  }

  addCreditCard(contract: any , signatureEntity?: SignatureEntity): Observable<GenericResponse<any>> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + CardsEndpoints.POST_NEW_CREDITCARD, contract, opts);
  }

  addDebitCard(contract: any , signatureEntity?: SignatureEntity): Observable<GenericResponse<any>> {
    let opts: RequestServiceOptions = {};
     if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
   return this.req.post(this.serverUrl + CardsEndpoints.POST_NEW_DEBITCARD, contract, opts);
  }

  getCreditcardAvailable(opts?: RequestServiceOptions) {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_NEW_CREDITCARD_AVAILABLE, undefined, opts);
  }

  getprepaidStatus() {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_PREPAIDSTATUS);
  }

  getStandardLimitValues() {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_STANDARDLIMITVALUES);
  }

  getlockReasonTypes() {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_LOCKREASONTYPE);
  }

  getPin(cardId: string) {
    return this.req.get(this.serverUrl + CardsEndpoints.GET_PIN, {cardId: cardId});
  }

  getCardExpenses(cardId: string) {
    let params = { cardId: cardId};
    return this.req.get(this.serverUrl + CardsEndpoints.GET_CARD_EXPENSES, params);
  }

}
