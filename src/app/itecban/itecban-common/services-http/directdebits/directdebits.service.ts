import { Injectable } from '@angular/core';
import { RequestService, AppConfigService, SignatureEntity } from 'onesait-core';
import { DirectdebitsEndpoints, DirectdebitsContract, GenericListResponse, GenericResponse, DirectdebitsPayment, DirectdebitsPaymentReasonReturns, DirectdebitRefundPayments } from 'onesait-api';
import { UtilsService, Pageable } from 'onesait-core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DirectdebitsService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private utilsService: UtilsService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_DIRECT_DEBITS');
  }


  getContracts(accountId: string): Observable<GenericListResponse<DirectdebitsContract>> {
    let params = { accountId: accountId };
    return this.req.get(this.serverUrl + DirectdebitsEndpoints.GET_CONTRACTS, params);
  }

  getContract(contractId: string): Observable<GenericResponse<DirectdebitsContract>> {
    return this.req.get(this.serverUrl + DirectdebitsEndpoints.GET_CONTRACT, { contractId: contractId }).pipe(map(res => {
      this.utilsService.transformAccount(res.data.account, res.data.account.formats);
      return res;
    }));
  }

  getPayments(contractId: string, pageable: Pageable): Observable<GenericListResponse<DirectdebitsPayment>> {
    return this.req.get(this.serverUrl + DirectdebitsEndpoints.GET_PAYMENTS, { contractId: contractId }, undefined, pageable);
  }

  putPayment(contractId: string, paymentId: string, code: any, signatureEntity?: SignatureEntity) {
    let opts = { headers: null, contractId: contractId, paymentId: paymentId, code: code };
    let params = { contractId: contractId, paymentId: paymentId, code: code };
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.put(this.serverUrl + DirectdebitsEndpoints.PUT_PAYMENT, params, opts);
  }

  getPaymentReturn(): Observable<GenericListResponse<DirectdebitsPaymentReasonReturns>> {
    return this.req.get(this.serverUrl + DirectdebitsEndpoints.GET_PAYMENT_RETURN);
  }

  getRefundPayments(contractId: string, pageable: Pageable): Observable<GenericListResponse<DirectdebitRefundPayments>> {
    return this.req.get(this.serverUrl + DirectdebitsEndpoints.GET_REFUND_PAYMENTS, { contractId: contractId }, undefined, pageable);
  }

  getPaymentStatus() {
    return this.req.get(this.serverUrl + DirectdebitsEndpoints.GET_PAYMENT_STATUS);
  }

  putContract(contractId: string, params: any) {
    params.contractId = contractId;
    let opts = { contractId: '@contractId' };
    return this.req.put(this.serverUrl + DirectdebitsEndpoints.PUT_CONTRACT, params, opts);
  }

  postContract(params: any) {
    return this.req.post(this.serverUrl + DirectdebitsEndpoints.POST_CONTRACT, params);
  }

  deleteContract(contractId: any) {
    let params = { contractId: contractId };
    return this.req.delete(this.serverUrl + DirectdebitsEndpoints.DELETE_CONTRACT, params);
  }

  getEnterpriseServices(legalDocumentId: any) {
    let params = { legalDocumentId: legalDocumentId };
    return this.req.get(this.serverUrl + DirectdebitsEndpoints.GET_ENTERPRISE_SERVICES, params);
  }

}
