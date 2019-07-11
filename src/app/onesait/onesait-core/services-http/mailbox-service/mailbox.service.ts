import { Injectable } from '@angular/core';
import { RequestService, RequestServiceOptions } from '../../services/request-service/request.service';

import { MailboxEndpoints } from 'onesait-api';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class MailboxService {

  serverUrl: string;
  mailSubject$: Subject<void>;
  notifyConversationObservable: Observable<void>;

  constructor(private req: RequestService,
    private appConfigService: AppConfigService) {
    this.serverUrl = this.appConfigService.getServerConfig('SERVER_URL');
    this.mailSubject$ = new Subject<void>();
    this.notifyConversationObservable = this.mailSubject$.asObservable();
  }

  getConversations(params: any) {
    return this.req.get(this.serverUrl + MailboxEndpoints.BASIC, params);
  }

  getConversationsTrash(params: any) {
    return this.req.get(this.serverUrl + MailboxEndpoints.GET_CONVERSATIONS_TRASH, params);
  }

  getConversation(id: string) {
    return this.req.get(this.serverUrl + MailboxEndpoints.GET_CONVERSATION, {id: id});
  }

  getConversationsCounter(opts?: RequestServiceOptions) {
    return this.req.get(this.serverUrl + MailboxEndpoints.GET_CONVERSATIONS_COUNTER, undefined, opts);
  }

  removeConversations(params: any) {
    return this.req.deleteWithBody(this.serverUrl + MailboxEndpoints.BASIC, params);
  }

  saveConversation(conversation: any) {
    return this.req.post(this.serverUrl + MailboxEndpoints.BASIC, conversation);
  }

  saveConversationRespond(conversationId: string, conversation: any) {
    conversation.conversationId = conversationId;
    let opts = {conversationId: '@conversationId'};
    return this.req.post(this.serverUrl + MailboxEndpoints.POST_CONVERSATIONS_RESPOND, conversation, opts);
  }

  getConversationsTypes() {
    return this.req.get(this.serverUrl + MailboxEndpoints.GET_CONVERSATIONS_TYPES);
  }

}
