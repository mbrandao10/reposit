import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OnesaitCoreModule, FormatAccountPipe } from 'onesait-core';
import { ItecbanCommonModule } from 'itecban-common';

import { ConfirmingPageComponent } from './pages/confirming-page/confirming-page.component';
import { ConfirmingAddPageComponent } from './pages/confirming-add-page/confirming-add-page.component';
import { ConfirmingContractPageComponent } from './pages/confirming-contract-page/confirming-contract-page.component';
import { ConfirmingIssueOrdersComponent } from './components/confirming-issue-orders/confirming-issue-orders.component';
import { ConfirmingIssueOrdersIndividualComponent } from './components/confirming-issue-orders/confirming-issue-orders-individual/confirming-issue-orders-individual.component';
import { ConfirmingIssueOrdersComponentAddSupplierComponent } from './components/confirming-issue-orders-add-supplier/confirming-issue-orders-add-supplier.component';
import { ConfirmingOrdersRemittancesComponent } from './components/confirming-orders-remittances/confirming-orders-remittances.component';
import { ConfirmingConsultOrdersComponent } from './components/confirming-orders-remittances/confirming-consult-orders/confirming-consult-orders.component';
import { ConfirmingConsultRemittancesComponent } from './components/confirming-orders-remittances/confirming-consult-remittances/confirming-consult-remittances.component';
import { ConfirmingRequestAdvanceComponent } from './components/confirming-request-advance/confirming-request-advance.component';
import { ConfirmingContractConditionsComponent } from './components/confirming-contract-conditions/confirming-contract-conditions.component';
import { ConfirmingAddFormComponent } from './components/confirming-add/confirming-add-form/confirming-add-form.component';
import { ConfirmingAddResumeComponent } from './components/confirming-add/confirming-add-resume/confirming-add-resume.component';


@NgModule({
  imports: [
    CommonModule,
    OnesaitCoreModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDatepickerModule,
    ItecbanCommonModule,
  ],
  declarations: [
    ConfirmingPageComponent,
    ConfirmingAddPageComponent,
    ConfirmingContractPageComponent,
    ConfirmingIssueOrdersComponent,
    ConfirmingIssueOrdersComponentAddSupplierComponent,
    ConfirmingOrdersRemittancesComponent,
    ConfirmingConsultOrdersComponent,
    ConfirmingConsultRemittancesComponent,
    ConfirmingRequestAdvanceComponent,
    ConfirmingContractConditionsComponent,
    ConfirmingIssueOrdersIndividualComponent,
    ConfirmingAddFormComponent,
    ConfirmingAddResumeComponent
  ],
  exports: [
    ConfirmingPageComponent,
    ConfirmingAddPageComponent,
    ConfirmingContractPageComponent,
    ConfirmingIssueOrdersComponent,
    ConfirmingIssueOrdersComponentAddSupplierComponent,
    ConfirmingOrdersRemittancesComponent,
    ConfirmingConsultOrdersComponent,
    ConfirmingConsultRemittancesComponent,
    ConfirmingRequestAdvanceComponent,
    ConfirmingContractConditionsComponent,
    ConfirmingIssueOrdersIndividualComponent,
    ConfirmingAddFormComponent,
    ConfirmingAddResumeComponent
  ],
  providers: [
    TranslatePipe,
    FormatAccountPipe
  ]
})
export class OnesaitConfirmingModule { }
