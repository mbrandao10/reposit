import { Injectable } from '@angular/core';
import { RequestService } from 'onesait-core';

const BASE_URL = '/documents';

@Injectable()
export class DocumentService {

  constructor(
    private req: RequestService
  ) { }

  /*
  getDocumentUrl(documentId:string){
    let url = BASE_URL+"/"+documentId+"?access_token="+this.utilsService.getItemSessionStorage("access_token");
    return url;
  }

  getDocumentUrlByName(documentId:string, documentName:string){
    let url = BASE_URL+"/"+documentId+"/"+documentName+"?access_token="+this.utilsService.getItemSessionStorage("access_token");
    return url;
  }*/

  getDownloadDocument(documentId: string) {
    return this.req.getBlob(BASE_URL + '/' + documentId);
  }

}
