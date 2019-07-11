import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';

import {
  SepaEndpoints, GenericListResponse, GenericResponse,
  ResultResponse, SepaFileDetail, SepaFileType, SepaRemittanceInput,
  SepaRemittancesQueryParams, SepaRemittance, SepaRemittanceDetail,
  SepaRemittanceStatusType, SepaRemittanceDetailOrders, SepaRemittanceReturned, SepaRemittanceFileTypeQuery, SepaSender, SepaRemittanceReturnedQueryParams
} from 'onesait-api';
import { Observable } from 'rxjs';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { Pageable } from '../../models/classes/Pageable';
import { AppConfigService } from '../../services/app-config-service/app-config.service';

@Injectable()
export class SepaService {

  serverUrl: string;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_SEPA_FILES');
  }

  postFile(formData: FormData): Observable<GenericResponse<SepaFileDetail>> {
    return this.req.post(this.serverUrl + SepaEndpoints.POST_FILE, formData, { disableErrors: true });
  }

  getFileFormats(): Observable<GenericListResponse<SepaFileType>> {
    return this.req.get(this.serverUrl + SepaEndpoints.GET_FILEFORMATS);
  }

  postRemittance(sepaRemittance: SepaRemittanceInput, signatureEntity: SignatureEntity): Observable<GenericResponse<ResultResponse>> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + SepaEndpoints.POST_CONFIRM_FILE, sepaRemittance, opts);
  }

  getRemittances(queryParams: SepaRemittancesQueryParams, pag?: Pageable): Observable<GenericListResponse<SepaRemittance>> {
    let opts = { type: '@type' };
    return this.req.get(this.serverUrl + SepaEndpoints.GET_REMITTANCES, queryParams, opts, pag);
  }

  getRemittanceStatusTypes(type: string): Observable<GenericListResponse<SepaRemittanceStatusType>> {
    return this.req.get(this.serverUrl + SepaEndpoints.GET_REMITTANCESTATUSTYPES, { type: type });
  }

  getRemittanceDetail(params: SepaRemittanceFileTypeQuery): Observable<GenericResponse<SepaRemittanceDetail>> {
    let opts = {
      remittanceId: '@remittanceId',
      type: '@type'
    };
    return this.req.get(this.serverUrl + SepaEndpoints.GET_REMITTANCE, params, opts);
  }

  getOrdersOfRemittanceDetail(params: SepaRemittanceFileTypeQuery, pag?: Pageable): Observable<GenericListResponse<SepaRemittanceDetailOrders>> {
    let opts = {
      remittanceId: '@remittanceId',
      type: '@type'
    };
    return this.req.get(this.serverUrl + SepaEndpoints.GET_ORDERS_OF_REMITTANCE, params, opts, pag);
  }

  getRemittancesReturned( params: SepaRemittanceReturnedQueryParams, pag?: Pageable): Observable<GenericListResponse<SepaRemittanceReturned>> {
    return this.req.get(this.serverUrl + SepaEndpoints.GET_REMITTANCES_RETURNS, params, null, pag);
  }

  getSenders(): Observable<GenericListResponse<SepaSender>>{
    return this.req.get(this.serverUrl + SepaEndpoints.GET_REMITTANCES_SENDERS);
  }

  downloadDocument(documentId: string){
    let opts={
      documentId: '@documentId'
    };
    return this.req.getBlob(this.serverUrl + SepaEndpoints.GET_RETURN_DOCUMENT, {documentId: documentId}, opts);
  }
}
