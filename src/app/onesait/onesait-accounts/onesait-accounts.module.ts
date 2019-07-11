import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OnesaitCoreModule } from 'onesait-core';

import { AccountChecksComponent } from './components/account-checks/account-checks.component';
import { AccountSettlementComponent } from './components/account-settlement/account-settlement.component';

import { AccountContractCheckPageComponent } from './pages/account-contract-check-page/account-contract-check-page.component';

@NgModule({
  imports: [
    CommonModule,
    OnesaitCoreModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDatepickerModule
  ],
  declarations: [
    AccountChecksComponent,
    AccountSettlementComponent,
    AccountContractCheckPageComponent
  ],
  exports: [
    AccountChecksComponent,
    AccountSettlementComponent,
    AccountContractCheckPageComponent
  ],
  providers: [
    TranslatePipe
  ]
})
export class OnesaitAccountsModule { }
