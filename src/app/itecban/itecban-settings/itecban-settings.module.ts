import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { OnesaitCoreModule } from 'onesait-core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ConsentsComponent } from './components/consents/consents.component';
import { ConsentsDetailComponent } from './components/consents-detail/consents-detail.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ItecbanPersonsModule } from 'itecban-persons';

@NgModule({
    imports: [
        CommonModule,
        OnesaitCoreModule,
        InfiniteScrollModule,
        ItecbanPersonsModule,
        TranslateModule

    ],
    declarations: [
        SettingsPageComponent,
        ConsentsComponent,
        ConsentsDetailComponent

    ],
    exports: [
        SettingsPageComponent,
        ConsentsComponent,
        ConsentsDetailComponent

    ],
    providers: [
        TranslatePipe,
    ]
})
export class ItecbanSettingsModule { }
