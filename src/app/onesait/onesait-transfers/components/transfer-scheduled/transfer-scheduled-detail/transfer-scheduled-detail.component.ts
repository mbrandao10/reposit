import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransferPeriodicOutput, GenericIdNameElement } from 'onesait-api';
import { DeviceUtilsService, AppConfigService } from 'onesait-core';
import * as _ from 'underscore';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'osb-transfer-scheduled-detail',
  templateUrl: './transfer-scheduled-detail.component.html'
})
export class TransferScheduledDetailComponent implements OnInit {

  @Input() transferscheduled: TransferPeriodicOutput;
  @Input() frequencyTypes: GenericIdNameElement[];
  @Output() closeEvent = new EventEmitter();
  @Output() modifySchedule = new EventEmitter();
  @Output() deleteSchedule = new EventEmitter();

  loading: boolean;
  accountFormatView: string;
  periodicUndefined: boolean;
  frequencyName: string;
  showButton = true;
  // @ViewChild('modal') private modal: ModalComponent;
  constructor(
    private deviceUtilsService: DeviceUtilsService,
    private appConfigService: AppConfigService
  ) { }

  isMobileResolution(): boolean {
    return this.deviceUtilsService.isMobileResolution;
  }

  ngOnInit() {
    let now = new Date();
    let nextExecutionDate = new Date(this.transferscheduled.nextExecutionDate);
    if (now >= nextExecutionDate) {
      this.showButton = false;
    }
    this.periodicUndefined = false;
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    if (this.transferscheduled.periodicity.lastExecutionDate) {
      if ('31-12-9999' === moment(this.transferscheduled.periodicity.lastExecutionDate).format('DD-MM-YYYY')) {
        this.periodicUndefined = true;
      }
    }
    this.frequencyName = _.findWhere(this.frequencyTypes, { id: this.transferscheduled.periodicity.frequency }).name;
  }

  close(action?: string): void {
    if (action === 'modifySchedule') {
      this.modifySchedule.emit(this.transferscheduled);
    } else if (action === 'deleteSchedule') {
      // this.modal.close();
      this.deleteSchedule.emit(this.transferscheduled.id);
    } else {
      this.closeEvent.emit();
    }
  }

  // cancelConfirmModal() {
  //   this.modal.close();
  // }

  // openModal() {
  //   this.modal.open();
  // }
}
