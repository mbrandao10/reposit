import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnesaitPageComponent, RouteExtended, RouterHelperService } from 'onesait-core';
import { ConfirmingContractPageComponent, ConfirmingPageComponent, ConfirmingAddPageComponent, ConfirmingRequestAdvanceComponent } from 'onesait-confirming';
import { NbExpressAddPageComponent, NbExpressContractPageComponent, NbExpressPageComponent } from 'onesait-nbexpress';
import { LeasingPageComponent, LeasingDetailPageComponent } from 'onesait-leasing';
import { SepaPageComponent } from 'onesait-sepa';
import { FactoringPageComponent, FactoringContractPageComponent, FactoringAddPageComponent} from 'onesait-factoring';
import { TaxesPageComponent } from 'onesait-taxes';
import { TransfersPageComponent } from 'onesait-transfers';
import { ProfileMainPageComponent } from 'onesait-profile';
import { CreditsAddPageComponent } from 'onesait-credits';



const OnesaitRoutes: RouteExtended[] = [
  {
    id: 'onesait-page',
    path: 'onesait/o',
    component: OnesaitPageComponent,
    children: [
      {
        id: 'confirming-page',
        path: 'confirming',
        component: ConfirmingPageComponent
      },
      {
        id: 'confirming-provider-page',
        path: 'confirming-provider',
        component: ConfirmingRequestAdvanceComponent
      },
      {
        id: 'confirming-add-page',
        path: 'confirming-add',
        component: ConfirmingAddPageComponent
      },
      {
        id: 'confirming-contract-page',
        path: 'confirming/:id',
        component: ConfirmingContractPageComponent
      },
      {
        id: 'express-bill-page',
        path: 'express-bill',
        component: NbExpressPageComponent
      },
      {
        id: 'express-bill-add-page',
        path: 'express-bill-add',
        component: NbExpressAddPageComponent
      },
      {
        id: 'express-bill-contract-page',
        path: 'express-bill/:id',
        component: NbExpressContractPageComponent
      },
      {
        id: 'sepa-page',
        path: 'sepa',
        component: SepaPageComponent
      },
      {
        id: 'factoring-page',
        path: 'factoring',
        component: FactoringPageComponent
      },
      {
        id: 'factoring-add-page',
        path: 'factoring-add',
        component: FactoringAddPageComponent
      },
      {
        id: 'factoring-contract-page',
        path: 'factoring/:contractId',
        component: FactoringContractPageComponent
      },
      {
        id: 'leasing-page',
        path: 'leasing',
        component: LeasingPageComponent
      },
      {
        id: 'leasing-detail-page',
        path: 'leasing/:contractId',
        component: LeasingDetailPageComponent
      },
      {
        id: 'taxes-page',
        path: 'taxes',
        component: TaxesPageComponent
      },
      {
        id: 'transfers-page',
        path: 'transfers',
        component: TransfersPageComponent
      },
      {
        id: 'profile-main-page',
        path: 'my-space/personal-data',
        component: ProfileMainPageComponent
      },
      {
        id: 'credit-add-page',
        path: 'credits-add',
        component: CreditsAddPageComponent
      }
    ]
  }
];

RouterHelperService.register(OnesaitRoutes);

@NgModule({
  imports: [RouterModule.forChild(OnesaitRoutes)],
  exports: [RouterModule]
})
export class OnesaitRoutingModule { }

