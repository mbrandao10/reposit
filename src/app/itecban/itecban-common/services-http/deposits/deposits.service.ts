import { Injectable } from '@angular/core';
import { RequestService, SignatureEntity, RequestServiceOptions, AppConfigService } from 'onesait-core';
import { constants, Pageable } from 'onesait-core';
import { DepositsEndpoints } from 'onesait-api';
// import { UtilsService } from 'onesait-core';
import { map } from 'rxjs/operators';

@Injectable()
export class DepositsService {

  serverUrl: string;
  // depositId = '01310099733840010679';
  // accountId = '01318801932728000778';
  constructor(
    private req: RequestService,
    // private utilsService: UtilsService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
    + this.appConfigService.getServerConfig('PREFIX_TERM_DEPOSITS');
  }

  getDeposits() {
    return this.req.get(this.serverUrl + DepositsEndpoints.BASIC);
  }

  // getDeposits() {
  //   return this.req.get(this.serverUrl + DepositsEndpoints.BASIC + '/' + this.accountId ,{  depositId: this.depositId }).pipe(map(res => {
  //     this.utilsService.transformAccount(res.data.connectedAccount, res.data.connectedAccount.formats);
  //     return res;
  //   }));
  // }

  postDeposits(params: any, signatureEntity?: SignatureEntity) {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + DepositsEndpoints.BASIC, params, opts);
  }

  postProductSimulate(params: any) {
    // params.productCode = productCode;
    // let opts = {productCode: '@productCode'};
    return this.req.post(this.serverUrl + DepositsEndpoints.POST_PRODUCT_SIMULATE, params);
  }

  // getDeposit(depositId: any, accountId?: any) {
  //   if (accountId){
  //     let params = { accountId: accountId, depositId: depositId};
  //     return this.req.get(this.serverUrl + DepositsEndpoints.GET_DEPOSIT, + '/account',  params ).pipe(map(res => {
  //       this.utilsService.transformAccount(res.data.connectedAccount, res.data.connectedAccount.formats);
  //       return res;
  //     }));
  //   } else {
  //     return this.req.get(this.serverUrl + DepositsEndpoints.GET_DEPOSIT, { depositId: depositId }).pipe(map(res => {
  //       this.utilsService.transformAccount(res.data.connectedAccount, res.data.connectedAccount.formats);
  //       return res;
  //     }));
  //   }
  // }

  getDeposit(depositId: any) {
    return this.req.get(this.serverUrl + DepositsEndpoints.GET_DEPOSIT, { depositId: depositId }).pipe(map(res => {
      // this.utilsService.transformAccount(res.data.connectedAccount, res.data.connectedAccount.formats);
      return res;
    }));
  }

  putDeposit(depositId: any, renewal: any, token: any) {
    let headers: any = {};
    headers[constants.SIGNATURE_KEY] = token;
    let params = { depositId: depositId, renewal: renewal };
    let opts = {
      headers: headers,
      depositId: '@depositId'
    };
    return this.req.put(this.serverUrl + DepositsEndpoints.PUT_DEPOSIT, params, opts);
  }

  getRenewals(depositId: any, pageable: Pageable) {
    let params = {depositId: depositId};
    return this.req.get(this.serverUrl + DepositsEndpoints.GET_RENEWALS, params, undefined, pageable);
  }

  getRetentions(depositId: any, pageable: Pageable) {
    let params = {depositId: depositId};
    return this.req.get(this.serverUrl + DepositsEndpoints.GET_RETENTIONS, params, undefined, pageable);
  }

  getLocks(depositId: any, pageable: Pageable) {
    let params = {depositId: depositId};
    return this.req.get(this.serverUrl + DepositsEndpoints.GET_LOCKS, params, undefined, pageable);
  }

  updateAlias(depositId: any, alias: string) {
    let params = { depositId: depositId, alias: alias },
    opts = {depositId: '@depositId' };
    return this.req.put(this.serverUrl + DepositsEndpoints.UPDATE_ALIAS, params, opts);
  }

  getAlias(depositId: any) {
    let params = { depositId: depositId};
    return this.req.get(this.serverUrl + DepositsEndpoints.UPDATE_ALIAS, params, {disableErrors: true});
  }

  getProducts() {
    return this.req.get(this.serverUrl + DepositsEndpoints.GET_PRODUCTS);
  }

  
  getProduct(productCode: any) {
    return this.req.get(this.serverUrl + DepositsEndpoints.GET_PRODUCT, {productCode: productCode});
  }

}
