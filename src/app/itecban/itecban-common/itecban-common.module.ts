import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { OnesaitCoreModule } from 'onesait-core';

import { InputSearchComponent } from './components/input-search/input-search.component';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ListSearchComponent } from './components/list-search/list-search.component';
import { LoginComponent } from './components/login/login.component';
import { HeadComponent } from './components/head/head.component';
import { CurrencyformatComponent } from './components/currencyformat/currencyFormat.component';
import { FormAttrValidatorComponent } from './components/form-attr-validator/form-attr-validator.component';
import { GlobalPositionBoxComponent } from './components/global-position-box/global-position-box.component';
import { GlobalPositionChartsComponent } from './components/global-position-charts/global-position-charts.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { ConditionsComponent } from './components/conditions/conditions.component';

import { FirstAccessComponent } from './pages/first-access-page/first-access-page.component';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { InProgressPageComponent } from './pages/in-progress-page/in-progress-page.component';
import { ErrorLoginPageComponent } from './pages/error-login-page/error-login-page.component';
import { Error500PageComponent } from './pages/error-500-page/error-500-page.component';
import { GlobalPositionPageComponent } from './pages/global-position-page/global-position-page.component';

import { CompareModificationsService } from './services/compare-modifications-service/compare-modifications.service';
import { AccountUtilsService } from './services/account-utils/account-utils.service';
import { NotificationsUtilsService } from './services/notifications-utils/notifications-utils.service';
import { DocumentsUtilsService } from './services/documents-utils/documents-utils.service';
import { CardsUtilsService } from './services/cards-utils/cards-utils.service';
import { TransferUtilsService } from './services/transfer-utils/transfer-utils.service';
import { ResourceService } from './services/resource-service/resource.service';

import { LoansService } from './services-http/loans-service/loans.service';
import { FundsService } from './services-http/funds/funds.service';
import { CreditsService } from './services-http/credits/credits.service';
import { NotificationsService } from './services-http/notifications/notifications.service';
import { MailboxService } from './services-http/mailbox-service/mailbox.service';
import { DocumentboxService } from './services-http/documentbox-service/documentbox.service';
import { SettingsService } from './services-http/settings/settings.service';
import { CardsService } from './services-http/cards/cards.service';
import { DirectdebitsService } from './services-http/directdebits/directdebits.service';
import { DepositsService } from './services-http/deposits/deposits.service';
import { DebinService } from './services-http/debin/debin.service';
import { ForeignoperationsService } from './services-http/foreignoperations/foreignoperations.service';

import { ScrollCollapseEmitterDirective, ScrollCollapseReceiverDirective } from './directives/collapse/collapse.directive';
import { ProvinceCityValidatorDirective } from './directives/province-city-validator/province-city-validator.directive';
import { NumberValidatorDirective} from './directives/number-validator/number-validator.directive';
import { DifferenceDatesDirective } from './directives/diff-dates/diff-dates.directive';
export { NumberValidatorDirective } from './directives/number-validator/number-validator.directive';
export { DifferenceDatesDirective } from './directives/diff-dates/diff-dates.directive';
import { AngularFittextDirective } from './directives/angular-fittext/angular-fittext.directive';
import { SwipeDirective} from './directives/swipe-directive/swipe-directive';

export { ConfirmDeactivateGuard } from './guards/confirm-deactivate-guard';

export { PasswordInput } from './classes/entities/password-input';
export { Credit } from './classes/entities/credits/credit';
export { Movement } from './classes/entities/accounts/movement';
export { Deposit, Product } from './classes/entities/deposits/deposit';
export { Debin, DebinDetail } from './classes/entities/debin/debin';
export { Currency, Money, MoneyCurrency } from './classes/entities/generics/money';
export { OptionList, BankData } from './classes/entities/generics/generics';

import { ErrorSessionPageComponent } from './pages/error-session-page/error-session-page.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ConsentsService } from './services-http/consents-service/consents.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    OnesaitCoreModule
  ],
  declarations: [
    LoginComponent,
    HeadComponent,
    CurrencyformatComponent,
    FormAttrValidatorComponent,
    GlobalPositionBoxComponent,
    GlobalPositionPageComponent,
    GlobalPositionChartsComponent,
    ErrorLoginPageComponent,
    Error500PageComponent,
    InitPageComponent,
    InProgressPageComponent,
    InputSearchComponent,
    InputAutocompleteComponent,
    LoaderComponent,
    FirstAccessComponent,
    ListSearchComponent,
    ScrollCollapseEmitterDirective,
    ScrollCollapseReceiverDirective,
    ProvinceCityValidatorDirective,
    NumberValidatorDirective,
    DifferenceDatesDirective,
    AngularFittextDirective,
    PieChartComponent,
    ConditionsComponent,
    ErrorSessionPageComponent,
    ProfilesComponent,
    SwipeDirective
  ],
  exports: [
    HeadComponent,
    CurrencyformatComponent,
    FormAttrValidatorComponent,
    GlobalPositionBoxComponent,
    GlobalPositionPageComponent,
    GlobalPositionChartsComponent,
    InitPageComponent,
    InProgressPageComponent,
    InputSearchComponent,
    InputAutocompleteComponent,
    LoaderComponent,
    FirstAccessComponent,
    ListSearchComponent,
    ScrollCollapseEmitterDirective,
    ScrollCollapseReceiverDirective,
    NumberValidatorDirective,
    DifferenceDatesDirective,
    AngularFittextDirective,
    PieChartComponent,
    ConditionsComponent,
    ProfilesComponent,
    SwipeDirective,
  ],
  providers: [
    TranslatePipe,
    CompareModificationsService,
    CreditsService,
    AccountUtilsService,
    LoansService,
    FundsService,
    NotificationsService,
    NotificationsUtilsService,
    MailboxService,
    DocumentboxService,
    DocumentsUtilsService,
    SettingsService,
    TransferUtilsService,
    CardsService,
    CardsUtilsService,
    DirectdebitsService,
    DepositsService,
    DebinService,
    DecimalPipe,
    DatePipe,
    ResourceService,
    ForeignoperationsService,
    ConsentsService,
    SwipeDirective
  ]
})
export class ItecbanCommonModule { }
