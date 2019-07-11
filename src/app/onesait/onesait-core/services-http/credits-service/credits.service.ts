import { Injectable } from '@angular/core';
import { CreditsEndpoints, GenericListResponse, CreditElement, GenericResponse, GenericIdNameElement, } from 'onesait-api';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';
import { Observable } from 'rxjs';
import {
  CreditNew, CreditProductsDetail, CreditDetail, CreditIntervenersCollection, CreditMovementsCollection, CreditRetentionsCollection,
  CreditLocksCollection, CreditCreateSuccess
} from 'onesait-api';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { Pageable } from '../../models/classes/Pageable';
import { AppConfigService } from '../../services/app-config-service/app-config.service';

@Injectable()
export class CreditsService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_CREDITS');
  }

  getCredits(): Observable<GenericListResponse<CreditElement>> {
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_CREDITS);
  }

  postCredits(params: CreditNew, signatureEntity?: SignatureEntity): Observable<GenericResponse<CreditCreateSuccess>> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + CreditsEndpoints.POST_CREDITS, params, opts);
  }

  getProducts(productCode: string): Observable<GenericResponse<CreditProductsDetail>> {
    let params = { productCode: productCode };
    let opts = { productCode: '@productCode' };
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_PRODUCTS, params, opts);
  }

  getCredit(creditId: string): Observable<GenericResponse<CreditDetail>> {
    let params = { creditId: creditId };
    let opts = { creditId: '@creditId' };
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_CREDIT, params, opts);
  }

  getInterveners(creditId: string, pag?: Pageable): Observable<GenericListResponse<CreditIntervenersCollection>> {
    let params = { creditId: creditId };
    let opts = { creditId: '@creditId' };
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_INTERVENERS, params, opts, pag);
  }

  getMovements(creditId: string, query?: any, pag?: Pageable): Observable<GenericListResponse<CreditMovementsCollection>> {
    let params = { creditId: creditId };

    if (query) {
      params = query;
      params.creditId = creditId;
    }

    let opts = { creditId: '@creditId' };
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_MOVEMENTS, params, opts, pag);
  }

  getRetentions(creditId: string, pag?: Pageable): Observable<GenericListResponse<CreditRetentionsCollection>> {
    let params = { creditId: creditId };
    let opts = { creditId: '@creditId' };
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_RETENTIONS, params, opts, pag);
  }

  getLocks(creditId: string, pag?: Pageable): Observable<GenericListResponse<CreditLocksCollection>> {
    let params = { creditId: creditId };
    let opts = { creditId: '@creditId' };
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_LOCKS, params, opts, pag);
  }

  getStatusTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_STATUS_TYPES);
  }

  getParticipantTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_PARTICIPANT_TYPES);
  }

  getMovementTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
    return this.req.get(this.serverUrl + CreditsEndpoints.GET_MOVEMENT_TYPES);
  }
}
