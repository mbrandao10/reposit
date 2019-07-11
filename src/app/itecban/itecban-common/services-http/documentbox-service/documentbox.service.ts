import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions, AppConfigService } from 'onesait-core';

import { DocumentsEndpoints, GenericListResponse, GenericIdNameElement } from 'onesait-api';
import { Observable } from 'rxjs';
import { DocumentElement } from '../../interfaces/documents/documents.interface';

@Injectable()
export class DocumentboxService {
  serverUrl: string;
  // signSubject$: Subject<void>;
  // notifyDocumentObservable: Observable<void>;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL')
      + this.appConfigService.getServerConfig('PREFIX_DOCUMENTS');
    // this.notifyDocumentObservable = this.signSubject$.asObservable();
  }

  getDocuments(params: any, opts?: RequestServiceOptions): Observable<GenericListResponse<DocumentElement>> {
    return this.req.get(this.serverUrl + DocumentsEndpoints.BASIC, params, opts);
  }
  // : Observable<GenericResponse<AccountMovementDetail>>
  getDocument(documentId: string) {
    return this.req.getBlob(this.serverUrl + DocumentsEndpoints.GET_DOCUMENT, {id: documentId});
  }

  getCategories(): Observable<GenericListResponse<GenericIdNameElement>>  {
    return this.req.get(this.serverUrl + DocumentsEndpoints.GET_CATEGORIES);
  }

  getTypes(categoryId: string) {
    return this.req.get(this.serverUrl + DocumentsEndpoints.GET_TYPES, {id: categoryId});
  }

  getCounter(opts?: RequestServiceOptions) {
    return this.req.get(this.serverUrl + DocumentsEndpoints.GET_COUNTER, undefined, opts);
  }

}
