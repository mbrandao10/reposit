import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditsService } from 'onesait-core';
import { CreditLocksCollection } from 'onesait-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-credit-locks',
  templateUrl: './credit-locks.component.html'
})

export class CreditLocksComponent implements OnInit, OnDestroy {

  @Input() creditId: string;
  getLocksServiceSubscription: Subscription;
  loading: boolean;
  creditLocks: CreditLocksCollection[];

  constructor(
    protected creditsService: CreditsService,
    protected route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getLocks(this.creditId);
  }

  getLocks(creditId: string) {
    this.loading = true;
    // creditId = '01318803772729000209'; // Quitar
    this.getLocksServiceSubscription = this.creditsService.getLocks(creditId).subscribe(result => {
      this.creditLocks = result.data;
      this.loading = false;
    }, () => this.loading = false);
  }

  ngOnDestroy() {
    if (this.getLocksServiceSubscription) {
      this.getLocksServiceSubscription.unsubscribe();
    }
  }

}
