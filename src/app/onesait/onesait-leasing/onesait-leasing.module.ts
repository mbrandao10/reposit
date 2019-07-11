import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { OnesaitCoreModule } from 'onesait-core';

import { LeasingPageComponent } from './pages/leasing-page/leasing-page.component';
import { LeasingDetailPageComponent } from './pages/leasing-detail-page/leasing-detail-page.component';
import { LeasingConditionsComponent } from './components/leasing-conditions/leasing-conditions.component';
import { LeasingAmortizationComponent } from './components/leasing-amortization/leasing-amortization.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
    LeasingPageComponent,
    LeasingDetailPageComponent,
    LeasingConditionsComponent,
    LeasingAmortizationComponent
  ],
  exports: [
    LeasingPageComponent,
    LeasingDetailPageComponent,
    LeasingConditionsComponent,
    LeasingAmortizationComponent
  ],
  providers: [
    TranslatePipe
  ]
})
export class OnesaitLeasingModule { }
