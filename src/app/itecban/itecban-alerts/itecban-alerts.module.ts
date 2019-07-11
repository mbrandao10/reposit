import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule } from 'onesait-core';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { AlertsConfigComponent } from './components/alerts-config/alerts-config.component';
import { AlertsListComponent } from './components/alerts-list/alerts-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ItecbanCommonModule,
    TranslateModule,
    OnesaitCoreModule
  ],
  declarations: [
    AlertsConfigComponent,
    AlertsListComponent
  ],
  exports: [
    AlertsConfigComponent,
    AlertsListComponent
  ],
  providers: [
    TranslatePipe
  ]
})

export class ItecbanAlertsModule { }
