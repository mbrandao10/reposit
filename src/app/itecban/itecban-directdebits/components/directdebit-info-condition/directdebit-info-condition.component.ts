import { Component, OnInit, Input } from '@angular/core';
import { DirectdebitsService } from 'itecban-common';
import { AppConfigService } from 'onesait-core';
import { DirectdebitsContract } from 'onesait-api';

@Component({
  selector: 'app-directdebit-info-condition',
  templateUrl: './directdebit-info-condition.component.html'
})
export class DirectdebitInfoConditionComponent implements OnInit {

  @Input() contractId: string;
  loading = false;
  contract: DirectdebitsContract;
  accountFormatView: string;

  constructor(
    private appConfigService: AppConfigService,
    private directdebitsService: DirectdebitsService,
  ) { }

  ngOnInit() {
    this.getContract(this.contractId);
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
  }

  getContract(contractId: string) {
    this.directdebitsService.getContract(contractId).subscribe(result => {
      this.contract = result.data;
      this.loading = false;
    }, () => this.loading = false);
  }

}
