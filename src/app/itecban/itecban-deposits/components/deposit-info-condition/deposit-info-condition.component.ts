import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppConfigService, DeviceUtilsService, LiteralFormats } from 'onesait-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-deposit-info-condition',
  templateUrl: './deposit-info-condition.component.html'
})
export class DepositInfoConditionComponent implements OnInit, OnDestroy {

  @Input () deposit;

  private deviceUtilsServiceSubscription: Subscription;
  loading: boolean;
  accountFormatView: '';
  ismobileResolution: boolean;
  title = LiteralFormats.IBAN;
  resolution;

  constructor(private appConfigService: AppConfigService,
    protected deviceUtilsService: DeviceUtilsService
    ) {
      this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
        this.ismobileResolution = deviceUtilsService.isMobileResolution;
      });
  }

    ngOnInit() {
      this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    }

  ngOnDestroy() {
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
  }

}
