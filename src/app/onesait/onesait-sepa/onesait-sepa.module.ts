import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { OnesaitCoreModule, DateLocalizedPipe } from 'onesait-core';
import { SepaPageComponent } from './pages/sepa-page/sepa-page.component';
import { SendRemittanceComponent } from './components/send-remittance/send-remittance.component';
import { RemittanceListComponent } from './components/remittance-list/remittance-list.component';
import { RemittanceDetailComponent } from './components/remittance-list/remittance-detail/remittance-detail.component';
import { RemittanceReturnedListComponent } from './components/remittance-returned-list/remittance-returned-list.component';

@NgModule({
  imports: [
    CommonModule,
    OnesaitCoreModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDatepickerModule,
    InfiniteScrollModule
  ],
  declarations: [
    SepaPageComponent,
    SendRemittanceComponent,
    RemittanceListComponent,
    RemittanceDetailComponent,
    RemittanceReturnedListComponent,
  ],
  exports: [
    SepaPageComponent
  ],
  providers: [
    TranslatePipe,
    DateLocalizedPipe
  ]
})
export class OnesaitSepaModule { }
