import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'onesait-core';
import { AccountMovementDetail } from 'onesait-api';

@Component({
  selector: 'osb-account-movement-detail',
  templateUrl: './account-movement-detail.component.html'
})

export class AccountMovementDetailComponent implements OnInit {

  @Input()
  accountMovementDetail: AccountMovementDetail;

  loading: boolean;
  accountId: string;
  movementDetail: any;

  constructor(
    private accountService: AccountService,
    ) { }

  ngOnInit() {
    this.loading = true;
    this.accountService.getMovement(this.accountId, this.accountMovementDetail.item.id)
      .subscribe(result => {
        this.loading = false;
        this.movementDetail = result.data;
      }, () => {
        this.loading = false;
      });
  }

}
