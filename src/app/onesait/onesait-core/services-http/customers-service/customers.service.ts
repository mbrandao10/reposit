import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';
import { Pageable } from '../../models/classes/Pageable';
import {
    PersonsEndpoints, CustomerPosition, GenericResponse, GenericIdNameElement,
    GenericListResponse, Customer, ResultResponse, Address,
    CustomerProductType, ProductExt, SummaryFiscalCredits, SummaryFiscalSavings,
    externalSignOut, GDPRManagement
} from 'onesait-api';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cities } from 'onesait-api';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';


@Injectable()
export class CustomersService {

    serverUrl: string;

    constructor(private req: RequestService,
        private appConfigService: AppConfigService) {

        this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
            + this.appConfigService.getServerConfig('PREFIX_CUSTOMERS');
    }

    getGlobalPosition(): Observable<GenericResponse<CustomerPosition>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_GLOBALPOSITION).pipe(map(res => {
            return res;
        }));
    }

    getAddressTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_ADDRESS_TYPES);
    }

    getGendersTypes(opts?: RequestServiceOptions): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_GENDERS, undefined, opts);
    }

    getMaritalStatusTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_MARITAL_STATUS);
    }

    getStreetTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_STREET_TYPES);
    }

    getProvinces(opts?: RequestServiceOptions): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_PROVINCES, undefined, opts);
    }

    getCities(opts?: RequestServiceOptions): Observable<GenericListResponse<Cities>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_CITIES, undefined, opts);
    }

    getCountries(opts?: RequestServiceOptions): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_COUNTRIES, undefined, opts);
    }

    getBondTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_BOND_TYPES);
    }

    getEconomicRegime(opts?: RequestServiceOptions): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_ECONOMIC_REGIME_URL, undefined, opts);
    }

    getPhonePrefixes(opts?: RequestServiceOptions): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_PHONE_PREFIXES, undefined, opts);
    }

    getPersonalData(): Observable<GenericResponse<Customer>> {
        // let headers: any = {
        //     userNumber: userNumber
        // };
        // let opts = {
        //     headers: headers,
        // };
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_PERSONAL_DATA);
    }

    putPersonalData(customer: Customer, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
        let opts: RequestServiceOptions = {};
        if (signatureEntity) {
            opts.headers = signatureEntity.getHeaders();
        }
        return this.req.put(this.serverUrl + PersonsEndpoints.UPDATE_PERSONAL_DATA, customer, opts);
    }

    getAddressPersonalData(): Observable<GenericListResponse<Address>> {

        // let headers: any = {
        //     userNumber: userNumber
        // };
        // let opts = {
        //     headers: headers,
        // };
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_ADDRESS_PERSONAL_DATA);
    }


    putAddressPersonalData(address: any): Observable<ResultResponse> {
        // let headers: any = {};
        // headers[constants.SIGNATURE_KEY] = token;
        // let opts = {
        //     // headers: headers,
        //     userNumber: '@userNumber'
        // };
        return this.req.put(this.serverUrl + PersonsEndpoints.UPDATE_ADDRESS_PERSONAL_DATA, address);
    }

    getFiscalRelationTypes(opts?: RequestServiceOptions): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_FISCAL_RELATION_TYPES, undefined, opts);
    }


    getPin(userNumber, opts?: RequestServiceOptions): Observable<ResultResponse> {
        return this.req.get(this.serverUrl + PersonsEndpoints.PIN, { userNumber: userNumber }, opts);
    }

    putPin(params: { pin: string, oldPin: string }): Observable<ResultResponse> {
        return this.req.put(this.serverUrl + PersonsEndpoints.PIN, params);
    }

    getProducts(subtype: CustomerProductType, paginationKey?: Pageable): Observable<GenericListResponse<ProductExt>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_PRODUCTS, { subtype: subtype }, null, paginationKey);
    }

    getFiscalSummary(year: string, paginationKey?: Pageable): Observable<GenericListResponse<SummaryFiscalCredits | SummaryFiscalSavings>> {
        return this.req.get(this.serverUrl + PersonsEndpoints.GET_FISCAL_REPORTS, { year: year }, null, paginationKey);
    }

    getInversisSingleSignOn(externalSistemId: string, externalUserId: string, externalPassword: string): Observable<GenericResponse<externalSignOut>> {
        let opts = <RequestServiceOptions>{};
        let dheaders: any = {};
        if (externalSistemId) {
            dheaders['X-EXTERNAL-SYSTEM-ID'] = externalSistemId;
        }
        if (externalUserId) {
            dheaders['X-EXTERNAL-USER-ID'] = externalUserId;
        }
        if (externalPassword) {
            dheaders['X-EXTERNAL-PASSWORD'] = externalPassword;
        }
        opts.headers = dheaders;

        return this.req.get(this.serverUrl + PersonsEndpoints.GET_INVERSIS_SINGLE_SIGN_ON, null, opts);
    }

    postManagementRgpd(params: GDPRManagement, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
        let opts: RequestServiceOptions = {};
        if (signatureEntity) {
            opts.headers = signatureEntity.getHeaders();
        }
        return this.req.post(this.serverUrl + PersonsEndpoints.POST_MANAGEMENT_GDPR, params, opts);
    }
}
