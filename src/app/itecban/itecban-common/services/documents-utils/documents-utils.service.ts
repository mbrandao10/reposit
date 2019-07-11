import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { AppConfigService } from 'onesait-core';

@Injectable()
export class DocumentsUtilsService {

  constructor(
    private appConfigService: AppConfigService
  ) { }

  getIdTypeDocument(strType: string) {
    let auxTypeDocument =  _.find(this.appConfigService.getConfig().documentType, function(elem: any) {
      return (elem.name === strType) ? elem : null;
    });
    return (auxTypeDocument) ? auxTypeDocument.id : '';
  }

}
