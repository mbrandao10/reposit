import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OnesaitCoreModule, FormatAccountPipe } from 'onesait-core';

import { TransfersPageComponent } from './pages/transfers-page/transfers-page.component';

import { TransferEmitComponent } from './components/transfer-emit/transfer-emit.component';
import { TransferGenericComponent } from './components/transfer-emit/transfer-generic/transfer-generic.component';
import { TransferEmitNBComponent } from './components/transfer-emit/transfer-emit-nb/transfer-emit-nb.component';
import { TransferEmitInterComponent } from './components/transfer-emit/transfer-emit-inter/transfer-emit-inter.component';
import { TransferEmitTargetComponent } from './components/transfer-emit/transfer-emit-target/transfer-emit-target.component';
import { TransferEmitSimulatorComponent } from './components/transfer-emit/components/transfer-emit-simulator/transfer-emit-simulator.component';
import { TransferEmitTraspComponent } from './components/transfer-emit/transfer-emit-trasp/transfer-emit-trasp.component';
import { TransferExecutionComponent } from './components/transfer-emit/components/transfer-execution/transfer-execution.component';
import { TransferHeaderComponent } from './components/transfer-emit/components/transfer-header/transfer-header.component';
import { TransferVerifyComponent } from './components/transfer-emit/components/transfer-verify/transfer-verify.component';
import { TransferResumeComponent } from './components/transfer-emit/components/transfer-resume/transfer-resume.component';
import { TransferHistoricComponent } from './components/transfer-historic/transfer-historic.component';
import { TransferDetailComponent } from './components/transfer-detail/transfer-detail.component';
import { TransferScheduledComponent } from './components/transfer-scheduled/transfer-scheduled.component';
import { TransferFavouritesComponent } from './components/transfer-favourites/transfer-favourites.component';
import { TransferFavouritesDetailComponent } from './components/transfer-favourites/transfer-favourites-detail/transfer-favourites-detail.component';
import { TransferShowAddFavComponent } from './components/transfer-emit/components/transfer-show-add-fav/transfer-show-add-fav.component';
import { TransferSheduledModificationComponent } from './components/transfer-scheduled/transfer-sheduled-modification/transfer-sheduled-modification.component';
import { TransferScheduledDetailComponent } from './components/transfer-scheduled/transfer-scheduled-detail/transfer-scheduled-detail.component';
import { TransferEmitSepaComponent } from './components/transfer-emit/transfer-emit-sepa/transfer-emit-sepa.component';
import { TransferHistoricDetailComponent } from './components/transfer-historic/transfer-historic-detail/transfer-historic-detail.component';
import { TransferScheduledResumeComponent } from './components/transfer-scheduled/transfer-scheduled-resume/transfer-scheduled-resume.component';
import { TransferHistoricInterComponent } from './components/transfer-historic-inter/transfer-historic-inter.component';


@NgModule({
  imports: [
    CommonModule,
    OnesaitCoreModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDatepickerModule
  ],
  declarations: [
    TransfersPageComponent,
    TransferEmitComponent,
    TransferGenericComponent,
    TransferEmitNBComponent,
    TransferEmitInterComponent,
    TransferEmitTargetComponent,
    TransferEmitSimulatorComponent,
    TransferEmitTraspComponent,
    TransferExecutionComponent,
    TransferHeaderComponent,
    TransferVerifyComponent,
    TransferResumeComponent,
    TransferHistoricComponent,
    TransferHistoricInterComponent,
    TransferDetailComponent,
    TransferScheduledComponent,
    TransferFavouritesComponent,
    TransferFavouritesDetailComponent,
    TransferShowAddFavComponent,
    TransferSheduledModificationComponent,
    TransferScheduledDetailComponent,
    TransferShowAddFavComponent,
    TransferEmitSepaComponent,
    TransferHistoricDetailComponent,
    TransferScheduledResumeComponent,
  ],
  exports: [
    TransfersPageComponent,
    TransferEmitComponent,
    TransferGenericComponent,
    TransferEmitNBComponent,
    TransferEmitInterComponent,
    TransferEmitTargetComponent,
    TransferEmitSimulatorComponent,
    TransferExecutionComponent,
    TransferEmitTraspComponent,
    TransferHeaderComponent,
    TransferVerifyComponent,
    TransferResumeComponent,
    TransferShowAddFavComponent
  ],
  providers: [
    TranslatePipe,
    FormatAccountPipe
  ]
})
export class OnesaitTransfersModule { }
