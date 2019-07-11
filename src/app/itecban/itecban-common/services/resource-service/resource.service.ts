import { Injectable } from '@angular/core';
import { RequestService } from 'onesait-core';

import { ResourceEndpoints } from 'onesait-api';

@Injectable()
export class ResourceService {

  constructor(
    private req: RequestService
  ) { }

  getResource(resourceName: string) {
    return this.req.get(ResourceEndpoints.GET_RESOURCE, {name: resourceName}, {disableErrors: true});
  }

}
