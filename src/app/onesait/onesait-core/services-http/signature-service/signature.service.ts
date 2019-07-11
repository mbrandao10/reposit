import { Injectable } from '@angular/core';

import { SignaturesEndpoints, ResultResponse, GenericListResponse, PendingSignature, GenericResponse, PendingSignatureDetail, PendingSignatureCounter } from 'onesait-api';
import { Observable, Subject } from 'rxjs';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';


@Injectable()
export class SignatureService {

  serverUrl: string;
  signSubject$: Subject<void>;
  notifySignObservable: Observable<void>;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_SIGNATURES');
      this.signSubject$ = new Subject<void>();
      this.notifySignObservable = this.signSubject$.asObservable();
  }

  getPendingOperations(params: any): Observable<GenericListResponse<PendingSignature>> {
    return this.req.get(this.serverUrl + SignaturesEndpoints.GET_PENDING_OPERATIONS, params);
  }

  getPendingOperationDetail(id: string): Observable<GenericResponse<PendingSignatureDetail>> {
    return this.req.get(this.serverUrl + SignaturesEndpoints.GET_PENDING_OPERATION_DETAIL, {id: id});
  }

  putPendingOperationDetail(id: string, action: string, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
    let opts: RequestServiceOptions = {id: '@id'};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.put(this.serverUrl + SignaturesEndpoints.PUT_PENDING_OPERATION_DETAIL, {id: id, action: action}, opts);
  }

  getPendingOperationCounter(opts?: RequestServiceOptions): Observable<GenericResponse<PendingSignatureCounter>> {
    return this.req.get(this.serverUrl + SignaturesEndpoints.GET_PENDING_OPERATION_COUNTER, undefined, opts);
  }

  getSignerStatusTypes() {
    return this.req.get(this.serverUrl + SignaturesEndpoints.GET_PENDING_SIGNATURES_SIGNER_STATUS_TYPES);
  }

  getOperationStatusTypes() {
    return this.req.get(this.serverUrl + SignaturesEndpoints.GET_PENDING_SIGNATURES_OPERATION_STATUS_TYPES);
  }

  getOperationGroupTypes() {
    return this.req.get(this.serverUrl + SignaturesEndpoints.GET_PENDING_SIGNATURES_OPERATION_GROUP_TYPES);
  }

}
