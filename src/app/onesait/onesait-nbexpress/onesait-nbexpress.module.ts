import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OnesaitCoreModule } from 'onesait-core';

import { NbExpressPageComponent } from './pages/nbexpress-page/nbexpress-page.component';
import { NbExpressAddPageComponent } from './pages/nbexpress-add-page/nbexpress-add-page.component';
import { NbExpressContractPageComponent } from './pages/nbexpress-contract-page/nbexpress-contract-page.component';

import { NbExpressIssueOrdersComponent } from './components/nbexpress-issue-orders/nbexpress-issue-orders.component';
import { NbExpressIssueOrdersIndividualComponent } from './components/nbexpress-issue-orders/nbexpress-issue-orders-individual/nbexpress-issue-orders-individual.component';
import { NbExpressIssueOrdersAddSupplierComponent } from './components/nbexpress-issue-orders-add-supplier/nbexpress-issue-orders-add-supplier.component';
import { NbExpressOrdersRemittancesComponent } from './components/nbexpress-orders-remittances/nbexpress-orders-remittances.component';
import { NbExpressConsultOrdersComponent } from './components/nbexpress-orders-remittances/nbexpress-consult-orders/nbexpress-consult-orders.component';
import { NbExpressConsultRemittancesComponent } from './components/nbexpress-orders-remittances/nbexpress-consult-remittances/nbexpress-consult-remittances.component';
import { NbExpressRequestAdvanceComponent } from './components/nbexpress-request-advance/nbexpress-request-advance.component';
import { NbExpressContractConditionsComponent } from './components/nbexpress-contract-conditions/nbexpress-contract-conditions.component';

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
    NbExpressPageComponent,
    NbExpressAddPageComponent,
    NbExpressContractPageComponent,
    NbExpressIssueOrdersComponent,
    NbExpressIssueOrdersAddSupplierComponent,
    NbExpressOrdersRemittancesComponent,
    NbExpressConsultOrdersComponent,
    NbExpressConsultRemittancesComponent,
    NbExpressRequestAdvanceComponent,
    NbExpressContractConditionsComponent,
    NbExpressIssueOrdersIndividualComponent
  ],
  exports: [
    NbExpressPageComponent,
    NbExpressAddPageComponent,
    NbExpressContractPageComponent,
    NbExpressIssueOrdersComponent,
    NbExpressIssueOrdersAddSupplierComponent,
    NbExpressOrdersRemittancesComponent,
    NbExpressConsultOrdersComponent,
    NbExpressConsultRemittancesComponent,
    NbExpressRequestAdvanceComponent,
    NbExpressContractConditionsComponent,
    NbExpressIssueOrdersIndividualComponent
  ],
  providers: [
    TranslatePipe
  ]
})
export class OnesaitNbExpressModule { }
