import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { OnesaitCoreModule, DateLocalizedPipe } from 'onesait-core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CreditsAddPageComponent } from './pages/credit-add-page/credit-add-page.component';
import { ItecbanCommonModule } from 'itecban-common';


@NgModule({
    imports: [
      CommonModule,
      OnesaitCoreModule,
      FormsModule,
      InfiniteScrollModule,
      ReactiveFormsModule,
      TranslateModule,
      BsDatepickerModule,
      ItecbanCommonModule
    ],
    declarations: [
        CreditsAddPageComponent
    ],
    exports: [
        CreditsAddPageComponent
    ],
    providers: [
        TranslatePipe,
        DateLocalizedPipe
    ]
  })
  export class OnesaitCreditsModule { }
  