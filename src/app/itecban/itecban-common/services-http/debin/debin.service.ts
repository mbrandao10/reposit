import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions, AppConfigService } from 'onesait-core';
import { constants, Pageable } from 'onesait-core';
import { forkJoin } from 'rxjs';
import { DebinEndpoints } from 'onesait-api';
import { UtilsService, AccountService } from 'onesait-core';
import * as _ from 'underscore';
import { map } from 'rxjs/operators';

@Injectable()
export class DebinService {

    serverUrl: string;

  constructor(
    private req: RequestService,
    private utilsService: UtilsService,
    private accountService: AccountService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
        + this.appConfigService.getServerConfig('PREFIX_DEBIN');
    }

    getLinkableAccounts(role: string) {
      const observableData: any = [];
      const params = {role: role};
      observableData.push(this.req.get(this.serverUrl + DebinEndpoints.GET_LINKED_ACCOUNTS, params));
      observableData.push(this.accountService.getAccounts());

      return forkJoin(observableData).pipe(map(result => {
        const linkedAccounts = result[0]['data'];
        const accounts = result[1]['data'];
        linkedAccounts.forEach((element: any) => {
          const accountSelected: any = _.findWhere(accounts, {CBU: element.cbu});
          if (accountSelected) {
            element.alias = (accountSelected) ? accountSelected.alias : null;
            element.currency.sign = this.utilsService.getCurrency(element.currency.code);
            element.balance = accountSelected.balance.amount;
          }
        });
        return linkedAccounts;
      }));
    }

    postLinkableAccount(role: string, cbu: string, token: any) {
      const headers: any = {};
      headers[constants.SIGNATURE_KEY] = token;
      const params = {role: role, cbu: cbu};
      return this.req.post(this.serverUrl + DebinEndpoints.POST_LINKED_ACCOUNT, params, headers);
    }

    // tslint:disable-next-line:one-line
    deleteLinkableAccount(role: string, accountId: string){
        const params = { role: role, accountId: accountId};
        const opts = {accountId: '@accountId' };
        return this.req.delete(this.serverUrl + DebinEndpoints.DELETE_LINKED_ACCOUNT, params, opts);
    }

    getDebins(params: any, pageable: Pageable) {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_DEBINS, params, undefined, pageable);
    }

    postDebin(params: any) {
        return this.req.post(this.serverUrl + DebinEndpoints.POST_DEBIN, params);
    }

    postDebinSimulate(params: any) {
        return this.req.post(this.serverUrl + DebinEndpoints.POST_SIMULATE_DEBIN, params);
    }

    getDebinDetail(debinId: string) {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_DEBIN_DETAIL, {debinId: debinId});
    }

    getConceptTypes() {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_CONCEPT_TYPES);
    }

    getStatusTypes(role: string) {
        const params = { role: role };
        return this.req.get(this.serverUrl + DebinEndpoints.GET_STATUS_TYPES, params);
    }

    getExpirationTimes() {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_EXPIRATION_TIMES);
    }

    postConfirmDebin(debinId: any, simulate: any) {
        const params = { debinId: debinId, simulate: simulate };
        const opts = {debinId: '@debinId' };
        return this.req.post(this.serverUrl + DebinEndpoints.POST_CONFIRM_DEBIN, params, opts);
    }

    postDiscardDebin(debinId: string, reasonType: string) {
        const params = { debinId: debinId, reasonType: reasonType};
        return this.req.post(this.serverUrl + DebinEndpoints.POST_DISCARD_DEBIN, params);
    }

    postCancelDebin(debinId: any) {
        return this.req.post(this.serverUrl + DebinEndpoints.POST_CANCEL_DEBIN, {debinId: debinId});
    }

    getCounterDebinPendient(opts?: RequestServiceOptions) {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_COUNTER_DEBIN_PENDIENT, undefined, opts);
    }

    getConsuptions(role: any) {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_CONSUMPTIONS, {role: role});
    }

    getLimits(role: any) {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_LIMITS, {role: role});
    }

    getPreauth(params: any, pageable: Pageable) {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_PREAUTH, params, undefined, pageable);
    }

    postPreauth(params: any) {
        return this.req.post(this.serverUrl + DebinEndpoints.POST_PREAUTH, params);
    }

    postConfirmPreauth(preauthId: any) {
        return this.req.post(this.serverUrl + DebinEndpoints.POST_CONFIRM_PREAUTH, {preauthId: preauthId});
    }

    postDiscardPreauth(preauthId: any) {
        return this.req.post(this.serverUrl + DebinEndpoints.POST_DISCARD_PREAUTH, {preauthId: preauthId});
    }

    postCancelPreauth(preauthId: any) {
        return this.req.post(this.serverUrl + DebinEndpoints.POST_CANCEL_PREAUTH, {preauthId: preauthId});
    }

    postPreauthDebinDoAction(preauthId: any, debin: any, action: any) {
        const params = {preauthId: preauthId, debin: debin, action: action};
        const opts = {preauthId: '@preauthId' };
        return this.req.post(this.serverUrl + DebinEndpoints.POST_PREAUTH_DEBIN_ACTION, params, opts);
    }

    getPreauthStatusTypes() {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_PREAUTH_STATUS_TYPES);
    }

    getPreauthPeriodOptions() {
        return this.req.get(this.serverUrl + DebinEndpoints.GET_PREAUTH_PERIOD_OPTIONS);
    }

}
