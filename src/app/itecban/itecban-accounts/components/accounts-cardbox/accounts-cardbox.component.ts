import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'onesait-core';

@Component({
  selector: 'app-accounts-cardbox',
  templateUrl: './accounts-cardbox.component.html'
})
export class AccountsCardboxComponent implements OnInit {

  accounts: Object[];

  constructor(
    private router: Router,
    private accountService: AccountService
    ) { }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(result => {
        this.accounts = result.data;
    });
  }

  viewDetail(account: any) {
    let link = ['/itecban/account-detail', account.id];
		this.router.navigate(link);
  }

}
