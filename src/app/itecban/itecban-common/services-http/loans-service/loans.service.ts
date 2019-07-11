
import { Injectable } from '@angular/core';
import { LoansEndpoints, GenericListResponse } from 'onesait-api';
import { Pageable, RequestService, AppConfigService, SignatureEntity, RequestServiceOptions } from 'onesait-core';
import { LoanNew } from '../../classes/entities/loans/loan';
import { Observable } from 'rxjs';
import { LoanMovement } from '../../interfaces/loans/loans.interface';

@Injectable()
export class LoansService {

  serverUrl: string;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
    + this.appConfigService.getServerConfig('PREFIX_LOANS');
  }

  getLoans() {
    return this.req.get(this.serverUrl + LoansEndpoints.GET_LOANS);
  }

  getPreassigned() {
    return this.req.get(this.serverUrl + LoansEndpoints.GET_LOANS_PRE_GRANTED);
  }

  getCreditMatrix(id: any, productCode: any, startDate: any, preassignedAmount: any, preassignedAvailable: any) {
    return this.req.get(this.serverUrl + LoansEndpoints.GET_LOANS_CREDITMATRIX, { id: id, productCode: productCode, startDate: startDate, preassignedAmount: preassignedAmount, preassignedAvailable: preassignedAvailable }, undefined, undefined);
  }

  getLoansRepayments(id: string, pageable: Pageable) {
    return this.req.get(this.serverUrl + LoansEndpoints.GET_LOANS_REPAYMENTS, { id: id },  {disableErrors: true}, pageable);
  }

  getLoansReceipts(id: string, pageable: Pageable) {
    return this.req.get(this.serverUrl + LoansEndpoints.GET_LOANS_RECEIPTS, { id: id },  {disableErrors: true}, pageable);
  }

  getLoanDetail(id: string) {
    // return this.req.get(this.serverUrl + LoansEndpoints.GET_LOANS_DETAIL, { id: id }).pipe(map(res => {
    //   // this.utilsService.transformAccount(res.data.connectedAccount, res.data.connectedAccount.formats);
    //   return res;
    // }));
    return this.req.get(this.serverUrl + LoansEndpoints.GET_LOANS_DETAIL, { id: id });

  }

  getMovements(loanAccountId: string, params: any, pageable: Pageable): Observable<GenericListResponse<LoanMovement>> {
    if (!params) { params = {}; }

    params.loanAccountId = loanAccountId;
    return this.req.get(this.serverUrl + LoansEndpoints.GET_MOVEMENTS, params, { disableError400: true }, pageable);
  }
  deleteLoan(id: string, amount: any) {
    let params = { id: id, amount: amount };
    return this.req.deleteWithBody(this.serverUrl + LoansEndpoints.DELETE_LOANS, params, {id: '@id'});
  }

  getRepaymentTypes() {
    return this.req.get(this.serverUrl + LoansEndpoints.GET_REPAYMENTS_TYPES);
  }

  postLoanSimulation(amortization: any) {
    if (amortization) {
      amortization.loanAccountId = amortization.loanAccountId;
    }
    return this.req.post(this.serverUrl + LoansEndpoints.POST_LOAN_SIMULATION, amortization, { loanAccountId: '@loanAccountId' });
  }

  postLoanRepayments(amortization: any, signatureEntity?: SignatureEntity) {
    if (amortization) {
      amortization.loanAccountId = amortization.loanAccountId;
    }
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    opts.loanAccountId = '@loanAccountId';
    return this.req.post(this.serverUrl + LoansEndpoints.POST_LOAN_REPAYMENTS, amortization, opts);
  }

  postLoan(amortization: any) {
    return this.req.post(this.serverUrl + LoansEndpoints.POST_LOAN, amortization, { id: '@loanAccountId' });
  }

  postPreassigned(preassigned: any) {
    return this.req.post(this.serverUrl + LoansEndpoints.GET_LOANS_PRE_GRANTED, preassigned);
  }

  updateAlias(id: any, alias: string) {
    let params = { id: id, alias: alias },
      opts = {loanAccountId: '@loanAccountId' };
    return this.req.put(this.serverUrl + LoansEndpoints.UPDATE_ALIAS, params, opts);
  }

  getAlias(id: any) {
    let params = { id: id};
    return this.req.get(this.serverUrl + LoansEndpoints.UPDATE_ALIAS, params, {disableErrors: true});
  }

  getLoanSimulateCancel(id: any) {
    let params = { id: id};
    return this.req.get(this.serverUrl + LoansEndpoints.GET_LOAN_SIMULATE_CANCEL, params, {disableErrors: true});
  }

  getLoanProduct(productCode: string) {
    let opts = {productCode: '@productCode'};
    return this.req.get(this.serverUrl + LoansEndpoints.GET_LOAN_PRODUCT, {productCode: productCode}, opts);
  }

  postNewLoan(params: LoanNew, signatureEntity: SignatureEntity) {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + LoansEndpoints.POST_NEW_LOAN, params, opts);
  }
}
