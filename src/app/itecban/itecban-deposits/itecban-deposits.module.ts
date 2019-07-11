import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DepositsPageComponent } from './pages/deposits-page/deposits-page.component';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule } from 'onesait-core';
import { DepositPageComponent } from './pages/deposit-page/deposit-page.component';
import { DepositInfoConditionComponent } from './components/deposit-info-condition/deposit-info-condition.component';
import { DepositAddPageComponent } from './pages/deposit-add-page/deposit-add-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    DepositsPageComponent,
    DepositPageComponent,
    DepositInfoConditionComponent,
    DepositAddPageComponent
  ],
  exports: [

  ],
  providers: [

  ]
})
export class ItecbanDepositsModule { }
