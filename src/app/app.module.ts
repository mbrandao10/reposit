import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppInit } from './appInit.component';

import { ItecbanAccountsModule } from 'itecban-accounts';

import { ItecbanCommonModule } from 'itecban-common';
import { ConfirmDeactivateGuard } from 'itecban-common';

import { ItecbanDepositsModule } from 'itecban-deposits';

import { ItecbanLoansModule } from 'itecban-loans';
import { ItecbanMailboxModule } from 'itecban-mailbox';
import { ItecbanCardsModule } from 'itecban-cards';
import { ItecbanPersonsModule } from 'itecban-persons';

import { OnesaitCoreModule, AppConfigService } from 'onesait-core';
import { OnesaitConfirmingModule } from 'onesait-confirming';
import { OnesaitLeasingModule } from 'onesait-leasing';
import { OnesaitSepaModule } from 'onesait-sepa';
import { OnesaitFactoringModule } from 'onesait-factoring';
import { OnesaitTaxesModule } from 'onesait-taxes';
import { OnesaitNbExpressModule } from 'onesait-nbexpress';
import { OnesaitTransfersModule } from 'onesait-transfers';
import { OnesaitProfileModule } from 'onesait-profile';
import { OnesaitCreditsModule } from 'onesait-credits';

import { AppRoutingModule } from './app-routing.module';
import { ItecbanRoutingModule } from './itecban/itecban.routing';
import { OnesaitRoutingModule } from './onesait/onesait.routing';
import { ItecbanCreditsModule } from 'itecban-credits';
import { ItecbanFundsModule } from 'itecban-funds';
import { ItecbanEquitiesModule } from 'itecban-equities';
import { ItecbanCashpoolingModule } from 'itecban-cashpooling';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { ItecbanForeingOperationsModule } from 'itecban-foreignoperations';
import { ItecbanSettingsModule } from 'itecban-settings';



registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule,
    BsDatepickerModule,
    ItecbanCommonModule,
    ItecbanPersonsModule,
    ItecbanMailboxModule,
    ItecbanAccountsModule,
    ItecbanDepositsModule,
    ItecbanCreditsModule,
    ItecbanLoansModule,
    ItecbanFundsModule,
    ItecbanEquitiesModule,
    OnesaitCoreModule,
    OnesaitConfirmingModule,
    OnesaitLeasingModule,
    OnesaitSepaModule,
    OnesaitFactoringModule,
    OnesaitTaxesModule,
    OnesaitNbExpressModule,
    OnesaitTransfersModule,
    OnesaitProfileModule,
    OnesaitCreditsModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot(),
    ItecbanRoutingModule,
    OnesaitRoutingModule,
    ItecbanCardsModule,
    ItecbanForeingOperationsModule,
    ItecbanCashpoolingModule,
    ItecbanSettingsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'ConfirmDeactivateGuard', useClass: ConfirmDeactivateGuard },
    { provide: APP_INITIALIZER, useFactory: AppInit,  multi: true, deps: [ AppConfigService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
