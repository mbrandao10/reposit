import { Component, OnInit, Input } from '@angular/core';
import { TransferPeriodicUpdate, GenericIdNameElement } from 'onesait-api';
import { AppConfigService } from 'onesait-core';
import * as _ from 'underscore';

@Component({
  selector: 'osb-transfer-scheduled-resume',
  templateUrl: './transfer-scheduled-resume.component.html'
})
export class TransferScheduledResumeComponent implements OnInit {

  @Input() transferPeriodicUpdate: TransferPeriodicUpdate;
  @Input() frequencyTypes: GenericIdNameElement[];
  accountFormatView: string;
  frequencyName: string;
  constructor(
    private appConfigService: AppConfigService) {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
  }

  ngOnInit() {
    this.frequencyName = _.findWhere(this.frequencyTypes, { id: this.transferPeriodicUpdate.periodicity.frequency }).name;
  }

}
