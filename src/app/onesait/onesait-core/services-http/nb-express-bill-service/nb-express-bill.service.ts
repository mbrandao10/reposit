import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';

import {
  NBExpressBillEndpoints, GenericListResponse, GenericResponse, EBOrders, EBContract,
  EBContracts, EBRemittances, EBSuppliers, EBAdvance, ResultResponse, EBOrder,
  EBStatusTypes, EBNewContract, EBFileResponse, EBSupplierCountries
} from 'onesait-api';
import { Observable } from 'rxjs';
import { Pageable } from '../../models/classes/Pageable';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class NBExpressBillService {

  serverUrl: string;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_EXPRESS_BILL');
  }

  getContract(contractId: string): Observable<GenericResponse<EBContract>> {
    let opts = { id: '@id' };
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_CONTRACT, { contractId: contractId }, opts);
  }

  getContracts(): Observable<GenericListResponse<EBContracts>> {
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_CONTRACTS);
  }

  postContracts(contract: EBNewContract, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + NBExpressBillEndpoints.POST_CONTRACT, contract, opts);
  }

  getOrders(contractId: string, params?: any, remittanceId?: string, pag?: Pageable): Observable<GenericListResponse<EBOrders>> {
    if (params) {
      params.contractId = contractId;
    } else {
      params = {
        contractId: contractId
      };
    }
    if (remittanceId) {
      params.remittanceId = remittanceId;
    }
    let opts = { id: '@id' };
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_ORDERS, params, opts, pag);
  }

  postOrders(order: EBOrder, signatureEntity: SignatureEntity): Observable<ResultResponse> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    let params = {
      id: order.contractId,
      contractId: order.contractId,
      concept: order.concept,
      amount: order.amount,
      expirationDate: order.expirationDate,
      account: order.account,
      supplier: order.supplier
    }
    opts.id = '@id';
    return this.req.post(this.serverUrl + NBExpressBillEndpoints.POST_ORDERS, params, opts);
  }


  getOrderTypes(): Observable<GenericListResponse<EBStatusTypes>> {
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_ORDER_TYPES);
  }

  postOrderAdvance(orderId: string): Observable<GenericResponse<EBAdvance>> {
    let opts: RequestServiceOptions = {};

    opts.orderId = '@orderId';
    return this.req.post(this.serverUrl + NBExpressBillEndpoints.POST_ORDER_ADVANCE, orderId, opts);
  }

  postOrderAdvanceConfirm(orderId: string, signatureEntity?: SignatureEntity): Observable<GenericResponse<EBAdvance>> {
    let opts: RequestServiceOptions = {};

    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }

    opts.orderId = '@orderId';
    return this.req.post(this.serverUrl + NBExpressBillEndpoints.POST_ORDER_ADVANCE_CONFIRM, orderId, opts);
  }

  getRemittances(contractId: string, params?: any, pag?: Pageable): Observable<GenericListResponse<EBRemittances>> {
    if (params) {
      params.id = contractId;
    } else {
      params = {
        id: contractId
      };
    }
    let opts = { id: '@id' };
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_REMITTANCES, params, opts, pag);
  }

  getRemittanceTypes(): Observable<GenericListResponse<EBStatusTypes>> {
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_REMITTANCE_TYPES);
  }

  postRemittances(contractId: string, file: FormData): Observable<GenericResponse<EBFileResponse>> {
    let opts = { id: '@id' };
    return this.req.post(this.req.buildPathParams(this.serverUrl + NBExpressBillEndpoints.POST_REMITTANCES, {  id: contractId}), file, opts);
  }

  postRemittancesConfirm(contractId: string, documentId: string, signatureEntity: SignatureEntity): Observable<GenericResponse<EBFileResponse>> {
    let opts: RequestServiceOptions = {};
    let params = {
      contractId: contractId,
      documentId: documentId
    };
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    opts.id = '@id';
    return this.req.post(this.serverUrl + NBExpressBillEndpoints.POST_REMITTANCES_CONFIRM, params, opts);
  }

  getSuppliers(): Observable<GenericListResponse<EBSuppliers>> {
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_SUPPLIERS);
  }

  getAdvances(orderId?: string, pag?: Pageable): Observable<GenericListResponse<EBAdvance>> {
    let params: any;
    if (orderId) {
      params = {
        orderId: orderId
      };
    } else {
      params = {};
    }
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_ADVANCES, params, null, pag);
  }

  getSupplierCountries(): Observable<GenericListResponse<EBSupplierCountries>> {
    return this.req.get(this.serverUrl + NBExpressBillEndpoints.GET_SUPPLIER_COUNTRIES);
  }
}
