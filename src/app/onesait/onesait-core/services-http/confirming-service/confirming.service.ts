import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';

import {
  ConfirmingEndpoints, GenericListResponse, GenericResponse, ConfirmingOrders, ConfirmingContract,
  ConfirmingContracts, ConfirmingRemittances, ConfirmingSuppliers, ConfirmingAdvance, ResultResponse, ConfirmingOrder,
  ConfirmingStatusTypes, ConfirmingNewContract, ConfirmingFileResponse, ConfirmingSupplierCountries, ConfirmingOrderResponse
} from 'onesait-api';
import { Observable } from 'rxjs';
import { Pageable } from '../../models/classes/Pageable';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';


@Injectable()
export class ConfirmingService {

  serverUrl: string;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_CONFIRMING');
  }

  getContract(contractId: string): Observable<GenericResponse<ConfirmingContract>> {
    let opts = { id: '@id' };
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_CONTRACT, { id: contractId }, opts);
  }

  getContracts(): Observable<GenericListResponse<ConfirmingContracts>> {
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_CONTRACTS);
  }

  postContracts(contract: ConfirmingNewContract, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + ConfirmingEndpoints.POST_CONTRACT, contract, opts);
  }

  getOrders(contractId: string, params?: any, remittanceId?: string, pag?: Pageable): Observable<GenericListResponse<ConfirmingOrders>> {

    if (params) {
      params.id = contractId;
    } else {
      params = {
        id: contractId
      };
    }
    if (remittanceId) {
      params.remittanceId = remittanceId;
    }
    let opts = { id: '@id' };
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_ORDERS, params, opts, pag);
  }

  postOrders(order: ConfirmingOrder, signatureEntity: SignatureEntity): Observable<ConfirmingOrderResponse> {
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
    return this.req.post(this.serverUrl + ConfirmingEndpoints.POST_ORDERS, params, opts);
  }

  getOrderTypes(): Observable<GenericListResponse<ConfirmingStatusTypes>> {
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_ORDER_TYPES);
  }

  postOrderAdvance(orderId: string): Observable<GenericResponse<ConfirmingAdvance>> {
    let opts: RequestServiceOptions = {};

    opts.orderId = '@orderId';
    return this.req.post(this.serverUrl + ConfirmingEndpoints.POST_ORDER_ADVANCE, { orderId: orderId }, opts);
  }
  postOrderAdvanceConfirm(orderId: string, signatureEntity?: SignatureEntity): Observable<GenericResponse<ConfirmingAdvance>> {
    let opts: RequestServiceOptions = {};

    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    opts.orderId = '@orderId';
    return this.req.post(this.serverUrl + ConfirmingEndpoints.POST_ORDER_ADVANCE_CONFIRM, { orderId: orderId }, opts);
  }

  getRemittances(contractId: string, params?: any, pag?: Pageable): Observable<GenericListResponse<ConfirmingRemittances>> {

    if (params) {
      params.id = contractId;
    } else {
      params = {
        id: contractId
      };
    }
    let opts = { id: '@id' };
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_REMITTANCES, params, opts, pag);
  }

  getRemittanceTypes(): Observable<GenericListResponse<ConfirmingStatusTypes>> {
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_REMITTANCE_TYPES);
  }

  postRemittances(contractId: string, file: FormData): Observable<GenericResponse<ConfirmingFileResponse>> {
    let opts = { id: '@id' };
    return this.req.post( this.req.buildPathParams(this.serverUrl + ConfirmingEndpoints.POST_REMITTANCES, {  id: contractId}), file, opts);
  }

  postRemittancesConfirm(contractId: string, documentId: string, signatureEntity: SignatureEntity): Observable<GenericResponse<ConfirmingFileResponse>> {
    let opts: RequestServiceOptions = {};
    let params = {
      id: contractId,
      documentId: documentId
    };
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    opts.id = '@id';
    return this.req.post(this.serverUrl + ConfirmingEndpoints.POST_REMITTANCES_CONFIRM, params, opts);
  }

  getSuppliers(): Observable<GenericListResponse<ConfirmingSuppliers>> {
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_SUPPLIERS);
  }

  getAdvances(orderId?: string, pag?: Pageable): Observable<GenericListResponse<ConfirmingAdvance>> {
    let params: any;
    if (orderId) {
      params = {
        orderId: orderId
      };
    } else {
      params = {};
    }
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_ADVANCES, params, null, pag);
  }

  getSupplierCountries(): Observable<GenericListResponse<ConfirmingSupplierCountries>> {
    return this.req.get(this.serverUrl + ConfirmingEndpoints.GET_SUPPLIER_COUNTRIES);
  }
}
