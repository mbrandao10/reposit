import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { ItecbanCommonModule } from 'itecban-common';
import { ItecbanMailboxModule } from 'itecban-mailbox';
import { ItecbanAlertsModule } from 'itecban-alerts';
import { ItecbanDirectdebitsModule } from 'itecban-directdebits';
import { OnesaitCoreModule } from 'onesait-core';
import { OnesaitCreditsModule } from 'onesait-credits';

import { CreditsPageComponent } from './pages/credits-page/credits-page.component';
import { CreditPageComponent } from './pages/credit-page/credit-page.component';

import { CreditInfoConditionsComponent } from './components/credit-info-conditions/credit-info-conditions.component';
import { CreditLocksComponent } from './components/credit-locks/credit-locks.component';
import { CreditMovementsComponent } from './components/credit-movements/credit-movements.component';
import { CreditMovementsDetailComponent } from './components/credit-movements-detail/credit-movements-detail.component';
import { CreditRetentionsComponent } from './components/credit-retentions/credit-retentions.component';
import { BsDatepickerModule } from 'ngx-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ItecbanCommonModule,
    ItecbanMailboxModule,
    ItecbanAlertsModule,
    ItecbanDirectdebitsModule,
    TranslateModule,
    OnesaitCoreModule,
    OnesaitCreditsModule,
    BsDatepickerModule
  ],
  declarations: [
    CreditsPageComponent,
    CreditPageComponent,
    CreditInfoConditionsComponent,
    CreditLocksComponent,
    CreditMovementsComponent,
    CreditMovementsDetailComponent,
    CreditRetentionsComponent,
  ],
  exports: [
    CreditsPageComponent,
    CreditPageComponent,
    CreditInfoConditionsComponent,
    CreditLocksComponent,
    CreditMovementsComponent,
    CreditMovementsDetailComponent,
    CreditRetentionsComponent
  ],
  providers: [
    DatePipe,
    TranslatePipe
  ]
})
export class ItecbanCreditsModule { }
