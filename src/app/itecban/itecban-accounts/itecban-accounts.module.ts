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
import { OnesaitAccountsModule } from 'onesait-accounts';
import { ItecbanCashpoolingModule } from 'itecban-cashpooling';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AccountInfoConditionComponent } from './components/account-info-condition/account-info-condition.component';
import { AccountLocksComponent } from './components/account-locks/account-locks.component';
import { AccountMovementDetailComponent } from './components/account-movement-detail/account-movement-detail.component';
import { MovementADComponent } from './components/account-movement-detail/types/movement-ad/movement-ad.component';
import { MovementADSRComponent } from './components/account-movement-detail/types/movement-adsr/movement-adsr.component';
import { MovementARADComponent } from './components/account-movement-detail/types/movement-arad/movement-arad.component';
import { MovementCARDComponent } from './components/account-movement-detail/types/movement-card/movement-card.component';
import { MovementLIQComponent } from './components/account-movement-detail/types/movement-liq/movement-liq.component';
import { MovementRM34Component } from './components/account-movement-detail/types/movement-rm34/movement-rm34.component';
import { MovementSINDComponent } from './components/account-movement-detail/types/movement-sind/movement-sind.component';
import { MovementTRComponent } from './components/account-movement-detail/types/movement-tr/movement-tr.component';
import { MovementTRIComponent } from './components/account-movement-detail/types/movement-tri/movement-tri.component';
import { AccountMovementsComponent } from './components/account-movements/account-movements.component';
import { AccountRetentionsComponent } from './components/account-retentions/account-retentions.component';
import { AccountsCardboxComponent } from './components/accounts-cardbox/accounts-cardbox.component';

import { AccountAddIntervenerComponent } from './pages/account-add-intervener/account-add-intervener.component';
import { AccountAddPageComponent } from './pages/account-add-page/account-add-page.component';
import { AccountCancelPageComponent } from './pages/account-cancel-page/account-cancel-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';

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
    OnesaitAccountsModule,
    ItecbanCashpoolingModule,
    BsDatepickerModule
  ],
  declarations: [
    AccountPageComponent,
    AccountsPageComponent,
    AccountInfoConditionComponent,
    AccountMovementsComponent,
    AccountMovementDetailComponent,
    MovementTRComponent,
    MovementTRIComponent,
    MovementADComponent,
    MovementCARDComponent,
    MovementLIQComponent,
    MovementRM34Component,
    MovementARADComponent,
    MovementSINDComponent,
    MovementADSRComponent,
    AccountsCardboxComponent,
    AccountRetentionsComponent,
    AccountAddIntervenerComponent,
    AccountAddPageComponent,
    AccountLocksComponent,
    AccountCancelPageComponent
  ],
  exports: [
    AccountPageComponent,
    AccountsPageComponent,
    AccountInfoConditionComponent,
    AccountMovementsComponent,
    AccountMovementDetailComponent,
    MovementTRComponent,
    MovementTRIComponent,
    MovementADComponent,
    MovementCARDComponent,
    MovementLIQComponent,
    MovementRM34Component,
    MovementARADComponent,
    MovementSINDComponent,
    MovementADSRComponent,
    AccountsCardboxComponent,
    AccountRetentionsComponent,
    AccountAddIntervenerComponent,
    AccountAddPageComponent,
    AccountCancelPageComponent,
    AccountLocksComponent
  ],
  providers: [
    DatePipe,
    TranslatePipe
  ]
})
export class ItecbanAccountsModule { }
