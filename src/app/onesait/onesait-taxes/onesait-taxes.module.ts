import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { OnesaitCoreModule } from 'onesait-core';

import { TaxesPageComponent } from './pages/taxes-page/taxes-page.component';
import { TaxIvaComponent } from './components/tax-iva/tax-iva.component';
import { TaxNotificationFeesComponent } from './components/tax-notification-fees/tax-notification-fees.component';
import { TaxOthersComponent } from './components/tax-others/tax-others.component';
import { TaxSocialSecurityComponent } from './components/tax-social-security/tax-social-security.component';
import { TaxSocietiesComponent } from './components/tax-societies/tax-societies.component';
import { TaxRentComponent } from './components/tax-rent/tax-rent.component';
import { InquiryComponent } from './components/inquiry/inquiry.component';

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    OnesaitCoreModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    TranslateModule,
    BsDatepickerModule
  ],
  declarations: [
    TaxesPageComponent,
    TaxIvaComponent,
    TaxNotificationFeesComponent,
    TaxOthersComponent,
    TaxSocialSecurityComponent,
    TaxSocietiesComponent,
    TaxRentComponent,
    InquiryComponent
  ],
  exports: [
    TaxesPageComponent,
    TaxIvaComponent,
    TaxNotificationFeesComponent,
    TaxOthersComponent,
    TaxRentComponent,
    TaxSocialSecurityComponent,
    TaxSocietiesComponent,
    TaxRentComponent,
    InquiryComponent
  ],
  providers: [
    TranslatePipe
  ]
})
export class OnesaitTaxesModule { }
