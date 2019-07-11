import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OnesaitCoreModule } from 'onesait-core';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { SignaturesPendingListComponent } from './components/signatures-pending-list/signatures-pending-list.component';
import { SignaturesPendingDetailComponent } from './components/signatures-pending-detail/signatures-pending-detail.component';
import { SignaturesPendingSignerComponent } from './components/signatures-pending-signer/signatures-pending-signer.component';
import { SignaturesSignProccesComponent } from './components/signatures-sign-procces/signatures-sign-procces.component';


@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    TranslateModule ,
    OnesaitCoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignaturesPendingListComponent,
    SignaturesPendingDetailComponent,
    SignaturesPendingSignerComponent,
    SignaturesSignProccesComponent
  ],
  exports: [
    SignaturesPendingListComponent,
    SignaturesSignProccesComponent
  ],
  providers: [
    TranslatePipe
  ]
})
export class ItecbanSignaturesModule { }
