import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule } from 'onesait-core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { FundAddPageComponent } from './pages/fund-add-page/fund-add-page.component';
import { FundDetailComponent } from './components/fund-detail/fund-detail.component';
import { FundsPageComponent } from './pages/funds-page/funds-page.component';
import { FundPageComponent } from './pages/fund-page/fund-page.component';

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
  FundAddPageComponent,
  FundDetailComponent,
  FundsPageComponent,
  FundPageComponent
],
  exports: [

  ],
  providers: [
    DatePipe
  ]
})
export class ItecbanFundsModule { }
