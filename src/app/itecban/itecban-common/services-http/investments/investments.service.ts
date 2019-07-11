import { Injectable } from '@angular/core';
import { RequestService } from 'onesait-core';

import { constants } from 'onesait-core';
import { InvestmentsEndpoints } from 'onesait-api';

@Injectable()
export class InvestmentsService {

  constructor(
      private req: RequestService
  ) { }

  postInvestments(params: any, token: any) {
      let headers: any = {};
      headers[constants.SIGNATURE_KEY] = token;
      return this.req.post(InvestmentsEndpoints.POST_INVESTMENTS, params, {headers: headers});
  }
}
