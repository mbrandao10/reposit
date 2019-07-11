import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule } from 'onesait-core';
import { ItecbanMailboxModule } from 'itecban-mailbox';
import { ItecbanAlertsModule } from 'itecban-alerts';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { DirectdebitPageComponent } from './pages/directdebit-page/directdebit-page.component';
import { DirectdebitsPageComponent } from './pages/directdebits-page/directdebits-page.component';
import { DirectdebitPaymentsComponent } from './components/directdebit-payments/directdebit-payments.component';
import { DirectdebitInfoConditionComponent } from './components/directdebit-info-condition/directdebit-info-condition.component';
import { DirectdebitPaymentDetailComponent } from './components/directdebit-payments-detail/directdebit-payment-detail.component';
import { DirectdebitVerifyComponent } from './components/directdebit-verify/directdebit-verify.component';
import { DirectdebitInfoDetailComponent } from './components/directdebit-info-detail/directdebit-info-detail.component';
import { DirectdebitPaymentsReturnComponent } from './components/directdebit-payments-return/directdebit-payments-return.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ItecbanCommonModule,
    ItecbanMailboxModule,
    ItecbanAlertsModule,
    TranslateModule,
    OnesaitCoreModule
  ],
  declarations: [
    DirectdebitPageComponent,
    DirectdebitsPageComponent,
    DirectdebitPaymentsComponent,
    DirectdebitInfoConditionComponent,
    DirectdebitPaymentDetailComponent,
    DirectdebitVerifyComponent,
    DirectdebitInfoDetailComponent,
    DirectdebitPaymentsReturnComponent
  ],
  exports: [
    DirectdebitPageComponent,
    DirectdebitsPageComponent,
    DirectdebitPaymentsComponent,
    DirectdebitInfoConditionComponent,
  ],
  providers: [
    TranslatePipe
  ]
})
export class ItecbanDirectdebitsModule { }
