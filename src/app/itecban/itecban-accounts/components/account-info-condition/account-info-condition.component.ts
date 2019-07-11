import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'onesait-core';
import { AppConfigService } from 'onesait-core';
import { AccountDetail, AccountIntervener } from 'onesait-api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-account-info-condition',
  templateUrl: './account-info-condition.component.html'
})

export class AccountInfoConditionComponent implements OnInit {

  @Input() accountId: string;
  account: AccountDetail;
  interveners: AccountIntervener [];
  loading = false;
  accountFormatView: string;

  constructor(
    private accountService: AccountService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit() {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.getAccount();
  }

  getAccount() {
    this.loading = true;
    let observableData: any = [];

    observableData.push(this.accountService.getAccount(this.accountId));
    observableData.push(this.accountService.getInterveners(this.accountId));

    forkJoin(observableData).subscribe((result: any) => {
      this.account = result[0]['data'];
      this.interveners = result[1]['data'];
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

}
