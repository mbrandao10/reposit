import { Injectable } from '@angular/core';
import { AccountsEndpoints, GenericListResponse, AccountElement, GenericResponse, AccountDetail, ResultResponse, AccountNew, AccountMovement, AccountNewCheckbook, GenericIdNameElement, Settlements, SettlementDates, AccountProductDetail, AccountCreateSuccess } from 'onesait-api';
import { map } from 'rxjs/operators';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';
import { UtilsService } from '../../services/utils-service/utils.service';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { Pageable } from '../../models/classes/Pageable';
import { Observable } from 'rxjs';
import { AccountMovementDetail, AccountIntervener, AccountRetentions, AccountLocks } from 'onesait-api';
import { AppConfigService } from '../../services/app-config-service/app-config.service';

@Injectable()
export class AccountService {
  serverUrl: string;

  constructor(
    private req: RequestService,
    private utilsService: UtilsService,
    private appConfigService: AppConfigService) {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_ACCOUNTS');
  }

  getAccount(id: any): Observable<GenericResponse<AccountDetail>> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_ACCOUNT, { id: id }).pipe(map(res => {
      this.utilsService.transformAccount(res.data, res.data.formats);
      return res;
    }));
  }

  getAccounts(): Observable<GenericListResponse<AccountElement>> {
    return this.req.get(this.serverUrl + AccountsEndpoints.BASIC).pipe(map(res => {
      for (let item of res.data) {
        this.utilsService.transformAccount(item, item.formats);
      }
      return res;
    }));
  }

  deleteAccount(id: string, params?: any): Observable<ResultResponse> {
    if (params) {
      params.accountId = id;
    } else {
      params = {
        accountId: id,
      };
    }
    return this.req.post(this.serverUrl + AccountsEndpoints.POST_CANCEL, params, { accountId: '@accountId' }).pipe(map(res => {
      return res;
    }));
  }

  cancelAccountSimulation(id: string): Observable<ResultResponse> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_CANCEL_ACCOUNT, { id: id }).pipe(map(res => {
      return res;
    }));
  }

  addAccount(account: AccountNew, signatureEntity?: SignatureEntity): Observable<GenericResponse<AccountCreateSuccess>> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + AccountsEndpoints.SAVE_ACCOUNT, account, opts);
  }

  getMovements(accountId: any, params: any, pageable: Pageable): Observable<GenericListResponse<AccountMovement>> {
    if (!params) { params = {}; }

    params.accountId = accountId;
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_MOVEMENTS, params, { disableError400: true }, pageable);
  }

  getMovement(accountId: any, movementId: any): Observable<GenericResponse<AccountMovementDetail>> {
    let params = {
      accountId: accountId,
      movementId: movementId
    };
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_MOVEMENT, params);
  }

  getInterveners(accountId: string): Observable<GenericListResponse<AccountIntervener>> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_INTERVENERS, { accountId: accountId });
  }

  getRetentions(accountId: string): Observable<GenericListResponse<AccountRetentions>> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_RETENTIONS, { accountId: accountId });
  }

  getLocked(accountId: string): Observable<GenericListResponse<AccountLocks>> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_LOCKED, { accountId: accountId });
  }

  updateAlias(accountId: string, alias: string): Observable<ResultResponse> {
    let params = { accountId: accountId, alias: alias },
      opts = { accountId: '@accountId' };
    return this.req.put(this.serverUrl + AccountsEndpoints.UPDATE_ALIAS, params, opts);
  }

  getAlias(accountId: string): Observable<ResultResponse> {
    let params = { accountId: accountId };
    return this.req.get(this.serverUrl + AccountsEndpoints.UPDATE_ALIAS, params, { disableErrors: true });
  }

  getAccountFormats() {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_ACCOUNT_FORMATS);
  }

  getParticipationDispositionTypes() {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_PARTICIPATION_TYPES);
  }

  postContractCheckbook(params: AccountNewCheckbook, signatureEntity: SignatureEntity) {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    opts.accountId = '@accountId';
    return this.req.post(this.serverUrl + AccountsEndpoints.POST_CONTRACT_CHECKBOOK, params, opts);
  }

  getCheckbookTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_CHECKBOOK_TYPES);
  }

  getProduct(code: string): Observable<AccountProductDetail> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_PRODUCT, { code: code });
  }

  getSettlementDates(accountId: string): Observable<GenericResponse<SettlementDates>> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_SETTLEMENT_DATES, { accountId: accountId });
  }

  getSettlements(accountId: string, date: string): Observable<GenericResponse<Settlements>> {
    return this.req.get(this.serverUrl + AccountsEndpoints.GET_SETTLEMENT, { accountId: accountId, date: date });
  }

  postStatements(accountId: string, dateFrom: string, dateTo: string, format: string) {
    return this.req.post(this.serverUrl + AccountsEndpoints.POST_STATEMENTS, { accountId: accountId, dateTo: dateTo, dateFrom: dateFrom, format: format });
  }




  /*
  posStatementRequests(params: any) {
    return this.req.post(AccountsEndpoints.POS_STATEMENT_REQUESTS, params);
  }
  postInterveners(accountId: any, params: any, token: any) {
    let headers: any = {};
    headers[constants.SIGNATURE_KEY] = token;
    params.accountId = accountId;
    return this.req.post(AccountsEndpoints.POST_INTERVENERS, params, { headers: headers, accountId: '@accountId' });
  }


 getIncomeAndSpending(accountId: any) {
    return this.req.get(AccountsEndpoints.GET_INCOME_AND_SPENDING, { accountId: accountId });
  }

  getProducts() {
    return this.req.get(AccountsEndpoints.GET_PRODUCTS);
  }

  */
}
