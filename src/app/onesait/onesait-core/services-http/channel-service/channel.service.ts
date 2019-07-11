import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request-service/request.service';
import { ChannelEndpoints } from 'onesait-api';
import { AppConfigService } from '../../services/app-config-service/app-config.service';

@Injectable()
export class ChannelService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService
  ) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_CHANNEL_SERVICES');
  }

  postRenderPDF(params: any, name: string) {
    return this.req.postBlob(this.serverUrl + ChannelEndpoints.POST_RENDER_PDF + name, params);
  }

}
