import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AppConfigService } from 'onesait-core';
import { Router } from '@angular/router';
import {map } from 'rxjs/operators';
import { NotificationsService } from 'itecban-common';
import * as _ from 'underscore';


@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html'
})
export class AlertsListComponent implements OnInit {

  @Input() productIdParam: any = '';
  @Input() productTypeParam: any = '';

  protected observableAlertsAll: any;
  protected observableNotifications: any;

  alertsAll: any = [];
  notificationsAll: any = [];
  notifications: any = [];
  hideAlerts = false;

  constructor(
    private notificationsService: NotificationsService,
    private router: Router,
    private appConfigService: AppConfigService) { }

  ngOnInit() {
    // Alertas del tipo del producto que recibe por parámetro
    this.observableAlertsAll = this.notificationsService.getAlerts().pipe(map(result => {
      let alertsAllByCurrency = _.groupBy(result.data, function(elem: any) { return elem.eventGroup; });
      this.alertsAll = alertsAllByCurrency[this.productTypeParam];
    }));
    // Alertas a las que esta subscrito el usuario del producto que recibe por parámetro
    this.observableNotifications = this.notificationsService
         .getSubscriptions(this.productIdParam, this.productTypeParam, {disableErrors: true}).pipe(map(result => {
      this.notificationsAll = result.data;
    }));
    // Se recorren las alertas para obtener el nombre
    forkJoin(this.observableAlertsAll, this.observableNotifications).subscribe(() => {
      let alertsAll = this.alertsAll;
      for (let i = 0; i < this.notificationsAll.length; i++) {
        let notification = this.notificationsAll[i];
        let alert = _.find(alertsAll, function(elem: any) {
          return (elem.id === notification.eventId) ? elem : null;
        });
        if (alert) {
          this.notificationsAll[i].name = (alert.name) ? alert.name : '';
          this.notificationsAll[i].code = this.appConfigService.getConfig().codesTranslate.alerts + alert.id;
          this.notificationsAll[i].eventType = (alert.eventType) ? alert.eventType : '';
          this.notifications.push(this.notificationsAll[i]);
        }
      }
    }, () => {
      this.hideAlerts = true;
    });
  }

  addAlert() {
    let link = ['/itecban/my-space/', 'config', this.productIdParam];
    this.router.navigate(link);
  }

}
