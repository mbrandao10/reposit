import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OnesaitCoreModule } from 'onesait-core';

import { ProfileMainPageComponent } from './pages/profile-main-page/profile-main-page.component';
import { ProfileFiscalInfoComponent } from './components/profile-fiscal-info/profile-fiscal-info.component';
import { ProfilePersonalDataComponent } from './components/profile-personal-data/profile-personal-data.component';
import { ProfileSuccessComponent } from './components/profile-success/profile-success.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OnesaitCoreModule,
        TranslateModule,
        BsDatepickerModule
    ],
    declarations: [
        ProfileMainPageComponent,
        ProfileFiscalInfoComponent,
        ProfilePersonalDataComponent,
        ProfileSuccessComponent
    ],
    exports: [
        ProfileMainPageComponent,
        ProfileFiscalInfoComponent,
        ProfilePersonalDataComponent
    ],
    providers: [
        TranslatePipe
    ]
})
export class OnesaitProfileModule { }
