import { Injectable } from '@angular/core';
import { SettingsEndpoints } from 'onesait-api';
import { constants, RequestService, AppConfigService, RequestServiceOptions, SignatureEntity } from 'onesait-core';


@Injectable()
export class SettingsService {

  serverUrl: string;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    // this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL');
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_USERS');
  }

  putChangePassword(params: any, signatureEntity?: SignatureEntity) {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }

    return this.req.put(this.serverUrl + SettingsEndpoints.PUT_CHANGE_PASSWORD, params, opts);
  }

  rememberPassword(params: any, token: any) {
    let headers: any = {};
    headers[constants.SIGNATURE_KEY] = token;
    return this.req.deleteWithBody(SettingsEndpoints.PUT_CHANGE_PASSWORD, params, headers);
  }

  getPublicResource() {
    return this.req.get(SettingsEndpoints.GET_PUBLIC_RESOURCE);
  }

  putChangeSignaturekey(params: any, signatureEntity?: SignatureEntity) {
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }

    return this.req.put(this.serverUrl + SettingsEndpoints.PUT_CHANGE_SIGNATUREKEY, params, opts);
  }

  postCardActivate(action: string, signatureEntity?: SignatureEntity) {
    let params = { action: action };
    let opts: RequestServiceOptions = {};
    if (signatureEntity) {
      opts.headers = signatureEntity.getHeaders();
    }
    return this.req.post(this.serverUrl + SettingsEndpoints.POST_CARD_ACTIVATE, params, opts);
  }

}
