import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditsService, AppConfigService } from 'onesait-core';
import { CreditIntervenersCollection, CreditDetail } from 'onesait-api';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-credit-info-conditions',
  templateUrl: './credit-info-conditions.component.html'
})

export class CreditInfoConditionsComponent implements OnInit, OnDestroy {

  @Input() creditId: string;
  forkJoinServiceSubscription: Subscription;
  loading: boolean;
  creditDetail: CreditDetail;
  creditInterveners: CreditIntervenersCollection[];

  accountFormatView: string;

  constructor(
    protected creditsService: CreditsService,
    protected route: ActivatedRoute,
    private appConfigService: AppConfigService
    ) { }

  ngOnInit() {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.getCredit(this.creditId);
  }

  getCredit(creditId: string) {
    this.loading = true;
    let observableData: any = [];

    observableData.push(this.creditsService.getCredit(creditId));
    observableData.push(this.creditsService.getInterveners(creditId));

    this.forkJoinServiceSubscription = forkJoin(observableData).subscribe((result: any) => {
      this.creditDetail = result[0].data;
      this.creditInterveners = result[1].data;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.forkJoinServiceSubscription) {
      this.forkJoinServiceSubscription.unsubscribe();
    }
  }
}
