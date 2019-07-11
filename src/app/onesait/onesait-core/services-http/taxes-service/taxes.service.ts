import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';

import { SepaEndpoints, GenericListResponse, GenericResponse,
  ResultResponse, SepaRemittanceInput, TaxesEndpoints, TaxPaymentType, TaxConsultTaxes, TaxForm, TaxYear,
  TaxPeriod, RentaTaxPayment, IvaTaxPayment, SociedadesTaxPayment, NotificationsAndFeesTaxPayment,
  OthersTaxPayment, TgssTaxPayment } from 'onesait-api';
import { Observable } from 'rxjs';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { Pageable } from '../../models/classes/Pageable';
import { AppConfigService } from '../../services/app-config-service/app-config.service';

@Injectable()
export class TaxesService {

  serverUrl: string;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_TAXES');
  }

  getConsultTaxes(organism: string, consult?: any, pag?: Pageable): Observable<GenericListResponse<TaxConsultTaxes>> {
    console.log(this.serverUrl + TaxesEndpoints.GET_TAXES);
    let params: any;
    if (consult) {
      consult.organism = organism;
      params = consult;
    } else {
      params = {
        organism: organism
      };
    }
    let opts = { organism: '@organism' };
    return this.req.get(this.serverUrl + TaxesEndpoints.GET_TAXES, params, opts, pag);
  }

  getTaxTypes(organism: string): Observable<GenericResponse<TaxPaymentType>> {
    return this.req.get(this.serverUrl + TaxesEndpoints.GET_TAX_TYPES, {organism});
  }

  getTaxForms(organism: string, taxPaymentType: string): Observable<GenericResponse<TaxForm>> {
    return this.req.get(this.serverUrl + TaxesEndpoints.GET_TAX_FORMS, {organism, taxPaymentType});
  }

  getYears(organism: string): Observable<GenericResponse<TaxYear>> {
    return this.req.get(this.serverUrl + TaxesEndpoints.GET_TAX_YEARS, {organism});
  }

  getPeriods(organism: string, taxPaymentType: string): Observable<GenericResponse<TaxPeriod>> {
    return this.req.get(this.serverUrl + TaxesEndpoints.GET_TAX_PERIODS, {organism, taxPaymentType});
  }

  getIssuerEntities(organism: string, taxPaymentType: string): Observable<GenericResponse<TaxPeriod>> {
    return this.req.get(this.serverUrl + TaxesEndpoints.GET_TAX_ISSUER_ENTITIES, {organism, taxPaymentType});
  }

  postRentaTaxPayment(organism: string,
    taxPayment: RentaTaxPayment | IvaTaxPayment | SociedadesTaxPayment | NotificationsAndFeesTaxPayment | OthersTaxPayment | TgssTaxPayment,
    signatureEntity: SignatureEntity): Observable<GenericResponse<ResultResponse>> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + TaxesEndpoints.POST_TAXES + '/' + organism, taxPayment, opts);
  }

  postRemittance(sepaRemittance: SepaRemittanceInput, signatureEntity: SignatureEntity): Observable<GenericResponse<ResultResponse>> {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(SepaEndpoints.POST_CONFIRM_FILE, sepaRemittance, opts);
  }

}
