import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'onesait-core';
import { AccountLocks } from 'onesait-api';

@Component({
  selector: 'app-account-locks',
  templateUrl: './account-locks.component.html'
})
export class AccountLocksComponent implements OnInit {

  @Input() accountId: string;

  locked: AccountLocks[];
  loading: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.loading = true;
    this.accountService.getLocked(this.accountId).subscribe(result => {
      this.loading = false;
      this.locked = result.data;
    }, () => this.loading = false);
  }

}
