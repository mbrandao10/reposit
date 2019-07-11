import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule, FormatCardNumberHiddenPipe } from 'onesait-core';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { CardContractPageComponent } from './pages/card-contract/card-contract-page.component';

import { CardDetailPageComponent } from './pages/card-detail-page/card-detail-page.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { CardMovementsComponent } from './components/card-movements/card-movements.component';
import { CardStatementsComponent } from './components/card-statements/card-statements.component';
import { CardPinComponent } from './components/card-pin/card-pin.component';
import { CardFormComponent } from './components/card-form/card-form.component';
import { CardConditionsComponent } from './components/card-conditions/card-conditions.component';
import { CardFormGeneratorComponent } from './components/card-form-generator/card-form-generator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItecbanCommonModule,
    InfiniteScrollModule,
    TranslateModule,
    OnesaitCoreModule,
    BsDatepickerModule,
    DatepickerModule
  ],
  declarations: [
    CardsPageComponent,
    CardPageComponent,
    CardContractPageComponent,
    CardDetailPageComponent,
    CardMovementsComponent,
    CardStatementsComponent,
    CardPinComponent,
    CardFormComponent,
    CardConditionsComponent,
    CardFormGeneratorComponent,
    CardInfoComponent
  ],
  exports: [
    CardsPageComponent,
    CardPageComponent,
    CardContractPageComponent,
    CardDetailPageComponent,
    CardMovementsComponent,
    CardStatementsComponent,
    CardPinComponent,
    CardFormComponent,
    CardConditionsComponent,
    CardFormGeneratorComponent,
    CardInfoComponent
  ],
  providers: [
    TranslatePipe,
    FormatCardNumberHiddenPipe
  ]
})
export class ItecbanCardsModule { }
