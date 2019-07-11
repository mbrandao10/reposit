import { Injectable } from '@angular/core';
import { RequestService } from 'onesait-core';

import { LinkEndpoints } from 'onesait-api';
import { map } from 'rxjs/operators';

@Injectable()
export class LinkService {

    constructor(
        private req: RequestService) { }

    getLinkAccountsData() {
        return this.req.get(LinkEndpoints.GET_LINK_ACCOUNTS, null, {disableErrors: true})
            .pipe(map(res => {
                return res;
            }));
    }
}
