import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule, FormatAccountPipe } from 'onesait-core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { LoanAddPageComponent } from './pages/loan-add-page/loan-add-page.component';
import { LoansPageComponent } from './pages/loans-page/loans-page.component';
import { LoanPageComponent } from './pages/loan-page/loan-page.component';
import { LoanAmortizationsTableComponent } from './components/loan-amortizations-table/loan-amortizations-table.component';
import { LoanAmortizationsTableDetailComponent } from './components/loan-amortizations-table-detail/loan-amortizations-table-detail.component';
import { FeesPaidComponent } from './components/fees-paid/fees-paid.component';
import { FeesPaidDetailComponent } from './components/fees-paid-detail/fees-paid-detail.component';
import { LoanAmortizeComponent } from './components/loan-amortize/loan-amortize.component';
import { LoanAmortizeDetailComponent } from './components/loan-amortize-detail/loan-amortize-detail.component';
import { LoanInfoConditionsComponent } from './components/loan-info-conditions/loan-info-conditions.component';
import { LoanMovementsComponent } from './components/loan-movements/loan-movements.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ItecbanCommonModule,
    OnesaitCoreModule,
    InfiniteScrollModule,
    BsDatepickerModule
  ],
  declarations: [
    LoansPageComponent,
    LoanPageComponent,
    LoanInfoConditionsComponent,
    LoanAmortizationsTableComponent,
    LoanAmortizationsTableDetailComponent,
    FeesPaidComponent,
    FeesPaidDetailComponent,
    LoanAmortizeComponent,
    LoanAmortizeDetailComponent,
    LoanAddPageComponent,
    LoanMovementsComponent
  ],
  exports: [
    LoansPageComponent,
    LoanPageComponent,
    LoanInfoConditionsComponent,
    LoanAmortizationsTableComponent,
    LoanAmortizationsTableDetailComponent,
    FeesPaidComponent,
    FeesPaidDetailComponent,
    LoanAmortizeComponent,
    LoanAmortizeDetailComponent,
    LoanAddPageComponent,
    LoanMovementsComponent
  ],
  providers: [
    DatePipe,
    FormatAccountPipe
  ]
})
export class ItecbanLoansModule { }
