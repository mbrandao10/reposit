import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { OnesaitCoreModule, DateLocalizedPipe } from 'onesait-core';

import { FactoringPageComponent } from './pages/factoring-page/factoring-page.component';
import { FactoringContractPageComponent } from './pages/factoring-contract-page/factoring-contract-page.component';
import { FactoringAddPageComponent } from './pages/factoring-add-page/factoring-add-page.component';
import { FactoringContractConditionsComponent } from './components/factoring-contract-conditions/factoring-contract-conditions.component';
import { FactoringInvoicesComponent } from './components/factoring-invoices/factoring-invoices.component';
import { FactoringUploadInvoiceComponent } from './components/factoring-upload-invoice/factoring-upload-invoice.component';
import { FactoringInvoiceDetailComponent } from './components/factoring-invoice-detail/factoring-invoice-detail.component';

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
        FactoringPageComponent,
        FactoringAddPageComponent,
        FactoringContractPageComponent,
        FactoringContractConditionsComponent,
        FactoringInvoicesComponent,
        FactoringUploadInvoiceComponent,
        FactoringInvoiceDetailComponent,
    ],
    exports: [
        FactoringPageComponent,
        FactoringAddPageComponent,
        FactoringContractPageComponent,
        FactoringContractConditionsComponent,
        FactoringInvoicesComponent,
        FactoringUploadInvoiceComponent,
        FactoringInvoiceDetailComponent
    ],
    providers: [
        TranslatePipe,
        DateLocalizedPipe
    ]
  })
  export class OnesaitFactoringModule { }
