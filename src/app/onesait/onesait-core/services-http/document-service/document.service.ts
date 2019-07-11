import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request-service/request.service';
import { AppConfigService } from '../../services/app-config-service/app-config.service';


@Injectable()
export class DocumentService {

  serverUrl: string;

  constructor(
    private req: RequestService,
    private appConfigService: AppConfigService) {

    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL') + '/documents';
  }

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
    return this.req.getBlob(this.serverUrl + '/' + documentId);
  }

}
