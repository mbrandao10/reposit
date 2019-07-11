import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule } from 'onesait-core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';

import { EquityDetailComponent } from './components/equity-detail/equity-detail.component';
import { EquityAddPageComponent } from './pages/equity-add-page/equity-add-page.component';
import { EquitiesPageComponent } from './pages/equities-page/equities-page.component';
import { EquityPageComponent } from './pages/equity-page/equity-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ItecbanCommonModule,
    OnesaitCoreModule,
    FormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    EquityDetailComponent,
    EquityAddPageComponent,
    EquitiesPageComponent,
    EquityPageComponent
  ],

  exports: [

  ],
  providers: [
    DatePipe
  ]
})
export class ItecbanEquitiesModule { }
