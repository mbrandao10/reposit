import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule, FormatAccountPipe } from 'onesait-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CashpoolingPageComponent } from './pages/cashpooling-page/cashpooling-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ItecbanCommonModule,
    OnesaitCoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CashpoolingPageComponent
  ],
  exports: [
    CashpoolingPageComponent
  ],
  providers: [
    DatePipe,
    FormatAccountPipe
  ]
})

export class ItecbanCashpoolingModule { }
