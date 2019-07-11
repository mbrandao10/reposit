
import { Injectable } from '@angular/core';
import { NotificationsService } from '../../services-http/notifications/notifications.service';

@Injectable()
export class NotificationsUtilsService {

    constructor(
      private notificationsService: NotificationsService
    ) { }

    putSubscription(subscriptionData: any, token: any) {
      let subscriptionDataSave = this.prepareRecord(subscriptionData);
      let objTransfer = Object.assign({}, subscriptionDataSave);
      return this.notificationsService.putSubscription(objTransfer, token);
    }

    postSubscription(subscriptionData: any, token: any) {
      let subscriptionDataSave = this.prepareRecord(subscriptionData);
      let objTransfer = Object.assign({}, subscriptionDataSave);
      return this.notificationsService.postSubscription(objTransfer, token);
    }

    deleteSubscription(subscriptionData: any, token: any) {
      let subscriptionDataSave = {
        'eventId' : subscriptionData.eventId,
        'eventGroup' : subscriptionData.eventGroup,
        'linkedElementId' : subscriptionData.linkedElementId
      };
      let objTransfer = Object.assign({}, subscriptionDataSave);
      return this.notificationsService.deleteSubscription(objTransfer, token);
    }

    prepareRecord(subscriptionData: any) {
      let subscriptionDataSave = {};
      switch (subscriptionData.eventType) {
        case 'amount':
          subscriptionDataSave = {
            'eventId' : subscriptionData.eventId,
            'eventGroup' : subscriptionData.eventGroup,
            'linkedElementId' : subscriptionData.linkedElementId,
            'notificationChannels' : [
              'mail',
              'push',
              'sms'
            ],
            'amount' : {
              'amount' : subscriptionData.amount.amount,
              'currency' : subscriptionData.amount.currency,
            }
          };
          break;
        case 'period':
          subscriptionDataSave = {
            'eventId' : subscriptionData.eventId,
            'eventGroup' : subscriptionData.eventGroup,
            'linkedElementId' : subscriptionData.linkedElementId,
            'notificationChannels' : [
              'mail',
              'push',
              'sms'
            ],
            'period': subscriptionData.period.id
          };
          break;
        case 'basic':
          subscriptionDataSave = {
            'eventId' : subscriptionData.eventId,
            'eventGroup' : subscriptionData.eventGroup,
            'linkedElementId' : subscriptionData.linkedElementId,
            'notificationChannels' : [
              'mail',
              'push',
              'sms'
            ]
          };
          break;
      }
      return subscriptionDataSave;
    }

}
