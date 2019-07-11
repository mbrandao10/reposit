import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditsService } from 'onesait-core';
import { CreditRetentionsCollection } from 'onesait-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-credit-retentions',
  templateUrl: './credit-retentions.component.html'
})

export class CreditRetentionsComponent implements OnInit, OnDestroy {

  @Input() creditId: string;
  getRetentionsServiceSubscription: Subscription;
  loading: boolean;
  creditRetentions: CreditRetentionsCollection[];

  constructor(
    protected creditsService: CreditsService,
    protected route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getRetentions(this.creditId);
  }

  getRetentions(creditId: string) {
    this.loading = true;
    // creditId = '01318860892728000135';
    this.getRetentionsServiceSubscription = this.creditsService.getRetentions(creditId).subscribe(result => {
      this.creditRetentions = result.data;
      this.loading = false;
    }, () => this.loading = false);
  }

  ngOnDestroy() {
    if (this.getRetentionsServiceSubscription) {
      this.getRetentionsServiceSubscription.unsubscribe();
    }
  }

}
