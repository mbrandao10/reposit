import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule } from 'onesait-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyExchangeComponent } from './pages/currency-exchange/currency-exchange.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ItecbanCommonModule,
    OnesaitCoreModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ],
    declarations: [
    CurrencyExchangeComponent
  ],
  exports: [
  ],
  providers: [
  ]
})
export class ItecbanForeingOperationsModule { }
