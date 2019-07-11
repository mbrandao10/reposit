import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request-service/request.service';

import { GenericListResponse, GenericResponse, LeasingEndpoints, LeasingContract, LeasingContracts, LeasingRepayment } from 'onesait-api';
import { Observable } from 'rxjs';
import { Pageable } from '../../models/classes/Pageable';
import { AppConfigService } from '../../services/app-config-service/app-config.service';



@Injectable()
export class LeasingService {

  serverUrl: string;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_LEASING');
  }

  getContracts(pag?: Pageable): Observable<GenericListResponse<LeasingContracts>> {
    return this.req.get(this.serverUrl + LeasingEndpoints.GET_CONTRACTS, null, null, pag);
  }

  getContract(contractId: string): Observable<GenericResponse<LeasingContract>> {
    return this.req.get(this.serverUrl + LeasingEndpoints.GET_CONTRACT, {contractId: contractId});
  }

  getRepayments(contractId: string, pag?: Pageable): Observable<GenericListResponse<LeasingRepayment>> {
    return this.req.get(this.serverUrl + LeasingEndpoints.GET_REPAYMENTS, {contractId: contractId}, null , pag);
  }
}
