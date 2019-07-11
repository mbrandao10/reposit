import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { ItecbanCommonModule } from 'itecban-common';
import { OnesaitCoreModule } from 'onesait-core';


import { MailboxPageComponent } from './pages/mailbox-page/mailbox-page.component';
import { MailboxCreatePageComponent } from './pages/mailbox-create-page/mailbox-create-page.component';
import { MailboxDetailComponent } from './components/mailbox-detail/mailbox-detail.component';
import { MailboxCreateComponent } from './components/mailbox-create/mailbox-create.component';
import { MailboxListComponent } from './components/mailbox-list/mailbox-list.component';
import { DocumentboxListComponent } from './components/documentbox-list/documentbox-list.component';
import { MailboxComponent } from './components/mailbox/mailbox.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ItecbanCommonModule,
    TranslateModule,
    OnesaitCoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    MailboxPageComponent,
    MailboxCreatePageComponent,
    MailboxListComponent,
    MailboxDetailComponent,
    MailboxCreateComponent,
    DocumentboxListComponent,
    MailboxComponent
  ],
  exports: [
    MailboxPageComponent,
    MailboxCreatePageComponent,
    MailboxListComponent,
    MailboxDetailComponent,
    MailboxComponent,
    MailboxCreateComponent,
    DocumentboxListComponent
  ],
  providers: [
    TranslatePipe,
    DatePipe
  ]
})
export class ItecbanMailboxModule { }
