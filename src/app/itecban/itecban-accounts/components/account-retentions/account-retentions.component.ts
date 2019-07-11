import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'onesait-core';
import { AccountRetentions } from 'onesait-api';

@Component({
  selector: 'app-account-retentions',
  templateUrl: './account-retentions.component.html'
})
export class AccountRetentionsComponent implements OnInit {

  @Input() accountId: string;

  retentions: AccountRetentions [];
  loading: boolean;

  constructor(
    private accountService: AccountService
    ) { }

  ngOnInit() {
    this.loading = true;
    this.accountService.getRetentions(this.accountId).subscribe(result => {
      this.loading = false;
      this.retentions = result.data;
    }, () => this.loading = false);
  }

}
