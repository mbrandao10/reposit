import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ItecbanCommonModule } from 'itecban-common';
import { ItecbanMailboxModule } from 'itecban-mailbox';
import { ItecbanAlertsModule } from 'itecban-alerts';
import { OnesaitCoreModule } from 'onesait-core';
import { ItecbanSignaturesModule } from 'itecban-signatures';
import { MySpacePageComponent } from './pages/my-space-page/my-space-page.component';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';

import { PersonsConfigComponent } from './components/persons-config/persons-config.component';
import { PersonsPersonalDataComponent } from './components/persons-personal-data/persons-personal-data.component';
import { PersonsUtilsService } from './services/persons-utils/persons-utils.service';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { PasswordExpiredPageComponent } from './pages/pasword-expired-page/password-expired-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ItecbanCommonModule,
    ItecbanMailboxModule,
    ItecbanAlertsModule,
    InfiniteScrollModule,
    TranslateModule ,
    OnesaitCoreModule,
    ReactiveFormsModule,
    ItecbanSignaturesModule
  ],
  declarations: [
    MySpacePageComponent,
    PersonsConfigComponent,
    PersonsPersonalDataComponent,
    ChangePasswordPageComponent,
    PasswordExpiredPageComponent
  ],
  exports: [
    MySpacePageComponent,
    PersonsConfigComponent,
    PersonsPersonalDataComponent,
    ChangePasswordPageComponent,
    PasswordExpiredPageComponent
  ],
  providers: [
    TranslatePipe,
    PersonsUtilsService
  ]
})
export class ItecbanPersonsModule { }
