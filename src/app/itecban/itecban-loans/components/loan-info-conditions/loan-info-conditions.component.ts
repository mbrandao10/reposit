import { Component, Input, OnChanges } from '@angular/core';
import { AppConfigService } from 'onesait-core';

@Component({
  selector: 'osb-loan-info-conditions',
  templateUrl: './loan-info-conditions.component.html'
})

export class LoanInfoConditionsComponent implements OnChanges {

  @Input() loanDetail;
  loading: boolean;
  accountFormatView: string;

  constructor(
    public appConfigService: AppConfigService
  ) {
    this.loading = false;
    this.accountFormatView = appConfigService.getConfig().account.viewKey;
  }

  ngOnChanges(): void {
    if (this.loanDetail) {
      this.loading = false;
    }
  }

}
