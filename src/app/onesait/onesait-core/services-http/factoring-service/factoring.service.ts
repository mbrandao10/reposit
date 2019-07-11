import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';

import { FactoringEndpoints, GenericResponse, FactoringContracts, FactoringContract, FactoringSimulation, FactoringInvoiceType, FactoringInvoice,
  FactoringFileResponse, FactoringNewContract, GenericListResponse, ResultResponse } from 'onesait-api';
import { Observable } from 'rxjs';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { Pageable } from '../../models/classes/Pageable';
import { AppConfigService } from '../../services/app-config-service/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class FactoringService {

  serverUrl: string;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_FACTORING');
  }

  getContracts(): Observable<GenericListResponse<FactoringContracts>> {
    return this.req.get(this.serverUrl + FactoringEndpoints.GET_CONTRACTS, {});
  }

  postContracts(newContract: FactoringNewContract, signatureEntity: SignatureEntity): Observable<GenericResponse<FactoringContracts>> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + FactoringEndpoints.POST_CONTRACTS, newContract, opts);
  }

  getContract(contractId: string): Observable<GenericResponse<FactoringContract>> {
    let opt = { contractId: '@contractId' };
    return this.req.get(this.serverUrl + FactoringEndpoints.GET_CONTRACT, { contractId: contractId }, opt);
  }

  getInvoices(contractId: string, query?: any, pag?: Pageable): Observable<GenericListResponse<FactoringContract>> {
    let params: any;
    if (query) {
      query.contractId = contractId;
      params = query;
    } else {
      params = {
        contractId: contractId
      };
    }
    let opts = { contactId: '@contractId' };
    return this.req.get(this.serverUrl + FactoringEndpoints.GET_INVOICES, params, opts, pag);
  }

  getInvoice(contractId: string, invoiceId: string): Observable<GenericResponse<FactoringInvoice>> {
    let params = {
      contractId: contractId,
      invoiceId: invoiceId
    };
    let opts = { contractId: '@contractId' };
    return this.req.get(this.serverUrl + FactoringEndpoints.GET_INVOICE, params, opts);
  }

  postInvoiceFile(contractId: string, file: any): Observable<GenericResponse<FactoringFileResponse>> {
    let params = {
      contractId: contractId,
      file: file
    };
    let opts = { contractId: '@contractId' };
    return this.req.post(this.serverUrl + FactoringEndpoints.POST_INVOICE_FILE, params, opts);
  }

  postInvoiceFileConfirm(contractId: string, documentId: string, signatureEntity: SignatureEntity): Observable<GenericResponse<FactoringFileResponse>> {
    let opts: RequestServiceOptions = {};
    let params = {
      contractId: contractId,
      documentId: documentId
    };
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    opts.contractId = '@contractId';
    return this.req.post(this.serverUrl + FactoringEndpoints.POST_INVOICE_FILE_CONFIRM, params, opts);
  }

  postInvoiceSimulation(contractId: string, invoiceId: string): Observable<GenericResponse<FactoringSimulation>> {
    let params = {
      contractId: contractId,
      invoiceId: invoiceId
    };
    let opts = {
      contractId: '@contractId',
      invoiceId: '@invoiceId'
    };
    return this.req.post(this.serverUrl + FactoringEndpoints.POST_INVOICE_SIMULATION, params, opts);
  }

  postInvoiceAdvance(contractId: string, invoiceId: string, signatureEntity: SignatureEntity): Observable<GenericResponse<ResultResponse>> {
    let opts: RequestServiceOptions = {};
    let params = {
      contractId: contractId,
      invoiceId: invoiceId
    };
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    opts.contractId = '@contractId';
    opts.invoiceId = '@invoiceId';
    return this.req.post(this.serverUrl + FactoringEndpoints.POST_INVOICE_ADVANCE, params, opts);
  }

  getInvoiceStatusTypes(): Observable<GenericListResponse<FactoringInvoiceType>> {
    return this.req.get(this.serverUrl + FactoringEndpoints.GET_INVOICE_TYPES);
  }
}
