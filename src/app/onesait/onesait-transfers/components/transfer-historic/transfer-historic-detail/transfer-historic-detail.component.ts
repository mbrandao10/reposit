import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceUtilsService, TransferService, AppConfigService } from 'onesait-core';
import { TransferOutput } from 'onesait-api';
import { TransferDetailComponent } from '../../transfer-detail/transfer-detail.component';

@Component({
  selector: 'osb-transfer-historic-detail',
  templateUrl: './transfer-historic-detail.component.html'
})
export class TransferHistoricDetailComponent extends TransferDetailComponent implements OnInit {

  @Input() transfer: TransferOutput;
  @Input() mode: string;
  @Output() closeEvent = new EventEmitter();
  loading: boolean;
  accountFormatView: string;

  constructor(
    private deviceUtilsService: DeviceUtilsService,
    transferService: TransferService,
    appConfigService: AppConfigService
  ) {
    super(transferService);
    this.accountFormatView = appConfigService.getConfig().account.viewKey;
  }

  ngOnInit() {
  }


  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

  close(): void {
    this.closeEvent.emit();

  }

}
