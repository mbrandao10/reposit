import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AppConfigService } from 'onesait-core';
import * as _ from 'underscore';
import { map } from 'rxjs/operators';
import { UtilsService, ModalService, AccountService } from 'onesait-core';
import { CompareModificationsService, CardsService, NotificationsService, NotificationsUtilsService } from 'itecban-common';


@Component({
  selector: 'app-alerts-config',
  templateUrl: './alerts-config.component.html'
})

export class AlertsConfigComponent implements OnInit {

  @Input() productIdAlert: any;

  protected observableSaveNotifications: any = [];

  product: any = {};
  products: any = [];
  productSelectedPrevius: any;
  productSelected: any;
  alertsAll: any = [];
  notifications: any = [];
  alert: any = {};
  alerts: any = [];
  alertsOriginal: any = [];
  periods: any = [];
  editData: any = [];
  typeAccount: any;
  typeCard: any;
  codeDebitCard: any;

  enabledBottons = false;
  token: any;
  viewAlerts = true;
  viewToken = false;

  alertEventType = ['period', 'amount', 'basic'];

  loading = false;
  constructor(
    private utilsService: UtilsService,
    private modalService: ModalService,
    private notificationsUtilsService: NotificationsUtilsService,
    private compareModificationsService: CompareModificationsService,
    private accountService: AccountService,
    private cardsService: CardsService,
    private notificationsService: NotificationsService,
    private appConfigService: AppConfigService) {
    this.typeAccount = this.appConfigService.getConfig().eventGroupTypes.account;
    this.typeCard = this.appConfigService.getConfig().eventGroupTypes.card;
    this.codeDebitCard = this.appConfigService.getConfig().cardsTypes.debit;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    const observableData: any = [];
    observableData.push(this.accountService.getAccounts());
    observableData.push(this.cardsService.getDebitCards());
    observableData.push(this.notificationsService.getPeriods());

    forkJoin(observableData).subscribe((result: any) => {
      let accounts = result[0]['data'];
      this.createProductsList(accounts, this.typeAccount);
      let cards = result[1]['data'];
      let cardsByType = _.groupBy(cards, function (elem: any) { return elem.productData.type.id; });
      let debitcards = cardsByType[this.codeDebitCard];
      this.createProductsList(debitcards, this.typeCard);
      this.periods = result[2]['data'];
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  // Crea lista con los productos
  createProductsList(productsType: any, type: string) {
    if (productsType) {
      for (let i = 0; i < productsType.length; i++) {
        let reg: any = [];
        reg.id = productsType[i].id;
        reg.alias = productsType[i].alias;
        reg.contractNumber = (productsType[i].contractNumber) ? productsType[i].contractNumber : null;
        reg.currency = productsType[i].currency.code;
        reg.type = type;
        switch (type) {
          case this.typeAccount:
            reg.typeLiteralal = 'Caja';
            break;
          case this.typeCard:
            reg.typeLiteralal = 'Tarjeta de débito';
            break;
          default: reg.typeLiteralal = '';
        }
        reg.description = productsType[i].productData.description;
        this.products.push(reg);
      }
    }
  }

  // Al cambiar de producto
  changeProduct(product: any) {
    if (!this.compareModificationsService.validateComparations()) {
      this.modalService.showConfirmModal('ITECBAN-COMMON.COMPONENT.HEADER.CONFIRM.TEXT').subscribe(result => {
        if (result) {
          this.continueOptionCombobox(true);
          this.getAlerts(product);
        } else {
          this.continueOptionCombobox(false);
        }
      });
    } else {
      this.continueOptionCombobox(true);
      this.getAlerts(product);
    }
  }

  getAlerts(product: any) {
    this.loading = true;
    let identifier = (product.contractNumber) ? product.contractNumber : product.id;
    const observableNotifications: any = [];
    // Todas las Alertas que puede seleccionar
    observableNotifications.push(this.notificationsService.getAlerts());
    // Todas las Alertas que ya tiene seleccionada
    observableNotifications.push(this.notificationsService.getSubscriptions(identifier, product.type));

    forkJoin(observableNotifications).subscribe((result: any) => {
      // Todas las Alertas que puede seleccionar
      let alertsAllByCurrency = _.groupBy(result[0]['data'], function (elem: any) { return elem.eventGroup; });
      this.alertsAll = alertsAllByCurrency[product.type];
      // Alertas que YA tienen seleccionadas TODO (comentado para que muestre resultados)
      this.notifications = result[1]['data'];
      /*this.observableNotifications = this.notificationsService.getSubscriptions(product.id,product.type).pipe(map(result => {
        this.notifications = result.data;
      }) */
      // let notificationsByCurrency = _.groupBy(result[1]['data'], function(elem:any){ return elem.linkedElementId; });
      // this.notifications = notificationsByCurrency[identifier];

      this.editData = [];
      this.enabledBottons = false;
      this.alerts = this.createListOfAlerts();
      this.alertsOriginal = this.utilsService.cloneObject(this.alerts);
      this.compareModificationsService.addCompare('alerts', this.alertsOriginal, this.alerts);
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  changeCheck(alert: any) {
    this.alert = alert;
    if (this.alert.selected) {
      if (alert.isEditable) {
        this.editData[this.alert.eventId] = true;
      }
      this.alert.linkedElementId = (this.productSelected.contractNumber) ? this.productSelected.contractNumber : this.productSelected.id;
    } else {
      this.editData[this.alert.eventId] = false;
      // this.alert.amount.amount = "";
      // this.alert.period.id = "";
      // this.alert.period.name = "";
    }
  }

  createListOfAlerts() {
    let alertsArray: any = [];
    for (let i = 0; i < this.alertsAll.length; i++) {
      let alert = this.alertsAll[i];
      let notification = _.find(this.notifications, function (elem: any) {
        return (elem.eventId === alert.id) ? elem : null;
      });

      let record = {
        selected: false,
        eventId: alert.id,
        code: this.appConfigService.getConfig().codesTranslate.alerts + alert.id,
        name: alert.name,
        eventGroup: alert.eventGroup,
        eventType: alert.eventType,
        isEditable: alert.isEditable,
        isMandatory: alert.isMandatory,
        linkedElementId: '',
        amount: {
          amount: '',
          currency: this.productSelected.currency
        },
        period: {
          id: '',
          name: ''
        }
      };



      if (notification !== undefined) {
        record.selected = true,
          record.linkedElementId = notification.linkedElementId;
        switch (record.eventType) {
          case 'amount':
            record.amount.amount = notification.amount.amount;
            record.amount.currency = notification.amount.currency.code;
            break;
          case 'period':
            record.period.id = notification.period.id;
            record.period.name = notification.period.name;
            break;
          case 'basic':
            break;
        }
      } else {
        if (record.eventType === 'amount' && alert.defaultAmount) {
          record.amount.amount = alert.defaultAmount.amount;
          record.amount.currency = alert.defaultAmount.currency.code;
        } else if (record.eventType === 'period') {
          record.period.id = (this.periods) ? this.periods[0].id : '';
          record.period.name = (this.periods) ? this.periods[0].name : '';
        }
      }
      alertsArray.push(record);
    }
    return alertsArray;
  }

  saveAlertsData() {
    this.loading = true;
    this.observableSaveNotifications = [];
    let dim = this.alertsOriginal.length;
    for (let i = 0; i <= dim - 1; i++) {
      let obj1String = JSON.stringify(this.alerts[i]);
      let obj2String = JSON.stringify(this.alertsOriginal[i]);
      if (obj1String !== obj2String) {
        switch (this.alertsOriginal[i].selected) {
          case true:
            if (this.alerts[i].selected) {
              console.log('Modificar: ' + this.alerts[i].name);
              this.observableSaveNotifications.push(this.notificationsUtilsService.putSubscription(this.alerts[i], this.token).pipe(map(result => {
                console.log(result);
              })));
            } else {
              console.log('Borrar: ' + this.alerts[i].name);
              this.observableSaveNotifications.push(this.notificationsUtilsService.deleteSubscription(this.alerts[i], this.token).pipe(map(result => {
                console.log(result);
              })));
            }
            break;
          case false:
            if (this.alerts[i].selected) {
              console.log('Insertar: ' + this.alerts[i].name);
              this.observableSaveNotifications.push(this.notificationsUtilsService.postSubscription(this.alerts[i], this.token).pipe(map(() => {
              })));
            }
            break;
          default:
            console.log('Cambio no contemplado');
        }
      }
    }

    forkJoin(this.observableSaveNotifications).subscribe(() => {
      this.loading = false;
      this.alertsOriginal = this.utilsService.cloneObject(this.alerts);
      this.compareModificationsService.addCompare('alerts', this.alertsOriginal, this.alerts);
      this.enabledBottons = false;
      this.editData = [];
      this.viewAlerts = true;
      this.viewToken = false;
      this.saveSuccess();
    }, () => this.loading = false);
  }

  saveSuccess() { }

  cancel() {
    this.editData = [];
    this.enabledBottons = false;
    this.alerts = this.utilsService.cloneObject(this.alertsOriginal);
    this.compareModificationsService.addCompare('alerts', this.alertsOriginal, this.alerts);
  }

  goToToken() {
    if (this.appConfigService.getConfig().alertsTokenIsRequired) {
      this.token = null;
      this.viewAlerts = false;
      this.viewToken = true;
    } else {
      this.saveAlertsData();
    }
  }

  goBackFromToken() {
    this.viewAlerts = false;
    this.viewToken = true;
  }

  continueOptionCombobox(option: boolean) {
    if (option) {
      this.productSelectedPrevius = this.productSelected;
    } else {
      this.productSelected = this.productSelectedPrevius;
    }
  }

  searchProductParam(productIdAlertParam: any) {
    this.productSelected = _.find(this.products, function (elem: any) {
      return (elem.id === productIdAlertParam || elem.contractNumber === productIdAlertParam) ? elem : null;
    });
    if (this.productSelected) { this.changeProduct(this.productSelected); }
  }
}
