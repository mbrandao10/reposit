import { Injectable } from '@angular/core';
import {
    TransferEndpoints, TransferOutput, GenericListResponse, TransferNew, GenericResponse,
    ResultResponse, TransferDetail, TransferSimulation, TransferPeriodicNew,
    TransferPeriodicUpdate, TransferPeriodicOutput, TransferPeriodicDetailOutput,
    GenericIdNameElement,
    TransferFavNew
} from 'onesait-api';
import { map } from 'rxjs/operators';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';
import { Pageable } from '../../models/classes/Pageable';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { TransferFavouriteOutput } from 'onesait-api';


@Injectable()
export class TransferService {

    serverUrl: string;

    constructor(
        private req: RequestService,
        private appConfigService: AppConfigService) {

        this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
            + this.appConfigService.getServerConfig('PREFIX_TRANSFERS');
    }

    get(params?: any): Observable<GenericListResponse<TransferOutput>> {
        return this.req.get(this.serverUrl + TransferEndpoints.BASIC, params);
    }

    post(params: TransferNew, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
        let opts: RequestServiceOptions = {};
        if (signatureEntity) {
            opts.headers = signatureEntity.getHeaders();
        }
        return this.req.post(this.serverUrl + TransferEndpoints.BASIC, params, opts);
    }

    getTransfer(transferId: string): Observable<GenericResponse<TransferDetail>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_TRANSFER, transferId);
    }

    removeTransfer(transferId: string): Observable<ResultResponse> {
        return this.req.delete(this.serverUrl + TransferEndpoints.DELETE_TRANSFER, { transferId: transferId });
    }

    postTransfersSimulate(transfer: TransferNew): Observable<GenericResponse<TransferSimulation>> {
        return this.req.post(this.serverUrl + TransferEndpoints.POST_SIMULATE, transfer);
    }

    getPeriodics(accountId: string, pageable: Pageable): Observable<GenericListResponse<TransferPeriodicOutput>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_PERIODICS, { accountId: accountId }, pageable);
    }

    getPeriodicDetail(transferId: string): Observable<GenericResponse<TransferPeriodicDetailOutput>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_PERIODIC_DETAIL, { transferId: transferId }).pipe(map(res => {
            return res;
        }));
    }

    postTransferPeriodic(params: TransferPeriodicNew, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
        let opts: RequestServiceOptions = {};
        if (signatureEntity) {
            opts.headers = signatureEntity.getHeaders();
        }
        return this.req.post(this.serverUrl + TransferEndpoints.POST_PERIODIC, params, opts);
    }

    postTransferPeriodicSimulate(params: TransferPeriodicNew): Observable<GenericResponse<TransferSimulation>> {
        return this.req.post(this.serverUrl + TransferEndpoints.POST_PERIODIC_SIMULATE, params);
    }

    putTransferPeriodic(transfer: TransferPeriodicUpdate, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
        let opts = {
            headers: null,
            transferId: '@transferId'
        };
        if (signatureEntity) {
            opts.headers = signatureEntity.getHeaders();
        }
        return this.req.put(this.serverUrl + TransferEndpoints.PUT_PERIODIC_ID, transfer, opts);
    }

    deleteTransferPeriodic(transferId: string, signatureEntity?: SignatureEntity): Observable<ResultResponse> {
        let params = {
            transferId: transferId
        };
        let opts = {
            headers: null,
            transferId: '@transferId'
        };
        if (signatureEntity) {
            opts.headers = signatureEntity.getHeaders();
        }

        return this.req.delete(this.serverUrl + TransferEndpoints.DELETE_PERIODIC_ID, params, opts);
    }

    getAccountFormats(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_ACCOUNT_FORMATS);
    }

    getLegalDocumentTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_LEGAL_DOCUMENTS_TYPES);
    }

    getFrequencyTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_FRECUENCY_TYPES);
    }

    getTransferTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_TRANSFER_TYPES);
    }

    getTransferModes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_TRANSFER_MODES);
    }

    getStatusTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_TRANSFER_STATUS);
    }

    getPurposeTypes(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_PURPOSE_TYPES);
    }

    getCurrencies(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_CURRENCIES);
    }

    getFavourites(): Observable<GenericListResponse<TransferFavouriteOutput>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_FAVOURITES);
    }

    deleteFavourite(favoriteId: string): Observable<ResultResponse> {
        return this.req.delete(this.serverUrl + TransferEndpoints.DELETE_FAVOURITE, { favoriteId: favoriteId });
    }
    postFavTransfer(params: TransferFavNew): Observable<ResultResponse> {
        return this.req.post(this.serverUrl + TransferEndpoints.POST_FAVOURITES, params);
    }

    getCharges(): Observable<GenericListResponse<GenericIdNameElement>> {
        return this.req.get(this.serverUrl + TransferEndpoints.GET_CHARGES);
    }

    getCountries(transferMode: string): Observable<GenericListResponse<GenericIdNameElement>> {
        const params = { transferMode: transferMode };
        return this.req.get(this.serverUrl + TransferEndpoints.GET_COUNTRIES, params);
    }

}
