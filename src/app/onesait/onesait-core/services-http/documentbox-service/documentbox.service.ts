import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';

import { DocumentsEndpoints } from 'onesait-api';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class DocumentboxService {

  serverUrl: string;
  documentSubject$: Subject<void>;
  notifyDocumentObservable: Observable<void>;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {
    // this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL');
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_DOCUMENTS');
    this.documentSubject$ = new Subject<void>();
    this.notifyDocumentObservable = this.documentSubject$.asObservable();
  }

  getDocuments(params: any, opts?: RequestServiceOptions) {
    return this.req.get(this.serverUrl + DocumentsEndpoints.BASIC, params, opts);
  }

  getCategories() {
    return this.req.get(this.serverUrl + DocumentsEndpoints.GET_CATEGORIES);
  }

  getTypes(categoryId: string) {
    return this.req.get(this.serverUrl + DocumentsEndpoints.GET_TYPES, {id: categoryId});
  }

  getCounter(opts?: RequestServiceOptions) {
    return this.req.get(this.serverUrl + DocumentsEndpoints.GET_COUNTER, undefined, opts);
  }

}
