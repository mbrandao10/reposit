import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConfigService } from '../app-config-service/app-config.service';
import { constants } from '../../config/constants';
import { ResultResponse, SignatureData } from 'onesait-api';

export class SignatureEntity {
  type: string;
  data: any;
  transactionCode: string;
  token: string;
  tokenValid: boolean;
  getHeaders(): any {
    let headers: any = {};
    headers[constants.SIGNATURE_KEY] = this.token;
    headers[constants.SIGNATURE_TYPE] = this.type;
    headers[constants.SIGNATURE_TRANSACTION] = this.transactionCode;
    return headers;
  }
}

@Injectable()
export class SignatureTokenService {

  constructor(
    private appConfigService: AppConfigService
  ) { }

  requireHolderSignature(response: ResultResponse): SignatureData{
    if (response && response.signatureData && response.signatureData.isSignatureRequired) {
      return response.signatureData;
    }
    return null;
  }

  requireSignature(error: HttpErrorResponse): SignatureEntity {
    let body = error.error;
    if (body && body.result.errors.length > 0 && body.result.errors[0].errorType === 'S'
      && body.result.errors[0].errorCode === this.appConfigService.getConfig('signature.responseErrorCode')
    ) {
      let signature: SignatureEntity = new SignatureEntity();
      signature.transactionCode = body.result.errors[0].info.transactionCode;
      signature.type = body.result.errors[0].info.type;
      signature.data = body.result.errors[0].info.data;
      return signature;
    } else {
      return null;
    }

  }


}
