import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { OnesaitPageComponent } from './pages/onesait-page/onesait-page.component';
import { OnesaitLayoutComponent } from './pages/onesait-layout/onesait-layout.component';

import { ModalPageComponent } from './components/modal-page/modal-page.component';
import { ModalPageHeaderComponent } from './components/modal-page/modal-page-header/modal-page-header.component';
import { ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent } from './components/modal/modal.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuMobileComponent } from './components/menu/mobile/menu-mobile.component';
import { MenuHeaderMobileComponent } from './components/menu/mobile/menu-header-mobile/menu-header-mobile.component';
import { UserMenuMobileTopComponent, UserMenuMobileBottomComponent } from './components/menu/mobile/user-menu-mobile/user-menu-mobile.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { LoaderComponent } from './components/loader/loader.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InfoHeaderComponent } from './components/info-header/info-header.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderTitleComponent } from './components/header/header-title/header-title.component';
import { HeaderTitleElementComponent } from './components/header/header-title-element/header-title-element.component';
import { SignatureComponent } from './components/signature/signature.component';
import { SignatureSecurityCardComponent } from './components/signature/signature-security-card/signature-security-card.component';
import { SignatureTokenComponent } from './components/signature/signature-token/signature-token.component';
import { FinalMessageComponent } from './components/final-message/final-message.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { DownloadInfoComponent } from './components/download-info/download-info.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { VoucherContainerComponent } from './components/voucher/voucher.component';
import { InputValidatorComponent } from './components/input-validator/input-validator.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';

import { AppConfigService } from './services/app-config-service/app-config.service';
import { JsonUtilsService } from './services/json-utils-serice/json-utils.service';
import { UtilsService } from './services/utils-service/utils.service';
import { RouterHelperService } from './services/router-helper-service/router-helper.service';
import { MenuService } from './services/menu-service/menu.service';
import { InfoHeaderService } from './services/info-header-service/info-header.service';
import { HttpCacheService } from './services/cache-service/cache.service';
import { UserSessionService } from './services/user-session-service/user-session.service';
import { RequestService } from './services/request-service/request.service';
import { HttpManagerService } from './services/http-manager-service/http-manager.service';
import { ShareService } from './services/share-service/share.service';
import { LogoutService, LogoutServiceDesktop } from './services/logout-service/logout.service';
import { LogoutEvent } from './services/logoutEvent-Service/logoutEvent.service';
import { LoginService } from './services/login-service/login.service';
import { ModalService } from './services/modal-service/modal.service';
import { HeaderService } from './services/header-service/header.service';
import { SignatureTokenService } from './services/signature-token-service/signature-token.service';
import { DeviceUtilsService } from './services/device-utils-service/device-utils.service';
import { SignatureService } from './services-http/signature-service/signature.service';
import { TokenService } from './services/token-service/token.service';

import { CurrencyPipe } from './pipes/currency.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DateAgoPipe } from './pipes/dateago.pipe';
import { BooleanToStringPipe } from './pipes/booleanToString.pipe';
import { TranslateCodePipe } from './pipes/translateCode.pipe';
import { TrimLastPipe } from './pipes/trimString';
import { FormatCardNumberPipe, FormatCardNumberHiddenPipe } from './pipes/formatCardNumber.pipe';
import { InitialsUser } from './pipes/initialsUser.pipe';
import { DateymdTodmyPipe } from './pipes/dateymdTodmy.pipe';
import { DateLocalizedPipe } from './pipes/date-localized.pipe';
import { FormatLiteralPipe } from './pipes/format-literal.pipe';

import { AccountService } from './services-http/accounts-service/account.service';
import { CreditsService } from './services-http/credits-service/credits.service';
import { DocumentboxService } from './services-http/documentbox-service/documentbox.service';
import { MailboxService } from './services-http/mailbox-service/mailbox.service';
import { UsersService } from './services/users-service/users.service';
import { ConfirmingService } from './services-http/confirming-service/confirming.service';
import { LeasingService } from './services-http/leasing-service/leasing.service';
import { FormatAccountPipe } from './pipes/format-account.pipe';
import { SepaService } from './services-http/sepa-service/sepa.service';
import { FactoringService } from './services-http/factoring-service/factoring.service';
import { TaxesService } from './services-http/taxes-service/taxes.service';
import { CustomersService } from './services-http/customers-service/customers.service';
import { CheckService } from './services-http/checks-service/check.service';
import { TransferService } from './services-http/transfers-service/transfer.service';
import { DocumentService } from './services-http/document-service/document.service';
import { ChannelService  } from './services-http/channel-service/channel.service';
import { PensionsService } from './services-http/pensions-service/pensions.service';
// import { ErrorManagerService } from './services/error-manager/error-manager.service';
import { VAlignDirective } from './directives/valign-center/valign.directive';
import { CloseMenuDirective } from './directives/close-menu/close-menu.directive';
import { VoucherKeyValueDirective, VoucherKeyDirective, VoucherValueDirective } from './directives/voucher/voucher.directive';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { NotificationsManagerService } from './services/notifications-manager/notifications-manager.service';
import { FormGroupValidatorComponent } from './components/formgroup-validator/form-group-validator.component';
import { ValidatorProfileComponent } from './components/validator-profile/validator-profile.component';
import { AdvisorService } from './services-http/advisor-service/advisor.service';
import { PromosService } from './services-http/promos-service/promos.service';
import { FormatAccountMobilePipe } from './pipes/format-account-mobile.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule
  ],
  declarations: [
    OnesaitPageComponent,
    OnesaitLayoutComponent,
    MenuComponent,
    MenuMobileComponent,
    MenuHeaderMobileComponent,
    UserMenuMobileTopComponent,
    UserMenuMobileBottomComponent,
    UserMenuComponent,
    LoaderComponent,
    InputFileComponent,
    CurrencyPipe,
    CapitalizePipe,
    DateAgoPipe,
    InitialsUser,
    BooleanToStringPipe,
    TranslateCodePipe,
    TrimLastPipe,
    FormatCardNumberPipe,
    FormatCardNumberHiddenPipe,
    DateymdTodmyPipe,
    DateLocalizedPipe,
    ModalPageComponent,
    ModalPageHeaderComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalConfirmComponent,
    InfoHeaderComponent,
    FormatAccountPipe,
    FormatAccountMobilePipe,
    HeaderComponent,
    HeaderTitleComponent,
    HeaderTitleElementComponent,
    SignatureComponent,
    SignatureSecurityCardComponent,
    SignatureTokenComponent,
    FinalMessageComponent,
    TabsComponent,
    SearchListComponent,
    DownloadInfoComponent,
    AutocompleteComponent,
    VoucherContainerComponent,
    InputValidatorComponent,
    CloseMenuDirective,
    VoucherKeyValueDirective,
    VoucherKeyDirective,
    VoucherValueDirective,
    VAlignDirective,
    FooterMenuComponent,
    InfoModalComponent,
    FormGroupValidatorComponent,
    ValidatorProfileComponent,
    FormatLiteralPipe
  ],
  exports: [
    OnesaitPageComponent,
    OnesaitLayoutComponent,
    MenuComponent,
    MenuMobileComponent,
    MenuHeaderMobileComponent,
    UserMenuMobileTopComponent,
    UserMenuMobileBottomComponent,
    UserMenuComponent,
    LoaderComponent,
    InputFileComponent,
    CurrencyPipe,
    CapitalizePipe,
    DateAgoPipe,
    InitialsUser,
    BooleanToStringPipe,
    TranslateCodePipe,
    TrimLastPipe,
    FormatCardNumberPipe,
    FormatCardNumberHiddenPipe,
    DateymdTodmyPipe,
    FormatAccountPipe,
    FormatAccountMobilePipe,
    DateLocalizedPipe,
    ModalPageComponent,
    ModalPageHeaderComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalConfirmComponent,
    InfoHeaderComponent,
    HeaderComponent,
    HeaderTitleComponent,
    HeaderTitleElementComponent,
    SignatureComponent,
    SignatureSecurityCardComponent,
    SignatureTokenComponent,
    FinalMessageComponent,
    TabsComponent,
    SearchListComponent,
    DownloadInfoComponent,
    AutocompleteComponent,
    VoucherContainerComponent,
    InputValidatorComponent,
    CloseMenuDirective,
    VoucherKeyValueDirective,
    VoucherKeyDirective,
    VoucherValueDirective,
    VAlignDirective,
    FooterMenuComponent,
    FormGroupValidatorComponent,
    ValidatorProfileComponent,
    InfoModalComponent,
    FormatLiteralPipe
  ],
  providers: [
    TranslatePipe,
    AppConfigService,
    JsonUtilsService,
    RequestService,
    HttpManagerService,
    UtilsService,
    UserSessionService,
    ShareService,
    LogoutServiceDesktop,
    LogoutEvent,
    LoginService,
    ModalService,
    InfoHeaderService,
    RouterHelperService,
    MenuService,
    HttpCacheService,
    {
      provide: LogoutService,
      useClass: LogoutServiceDesktop
    },
    CurrencyPipe,
    CapitalizePipe,
    DateAgoPipe,
    FormatAccountPipe,
    FormatAccountMobilePipe,
    InitialsUser,
    BooleanToStringPipe,
    TranslateCodePipe,
    TrimLastPipe,
    FormatCardNumberPipe,
    FormatCardNumberHiddenPipe,
    DateymdTodmyPipe,
    DateLocalizedPipe,
    DocumentboxService,
    MailboxService,
    UsersService,
    ConfirmingService,
    LeasingService,
    SepaService,
    HeaderService,
    SignatureTokenService,
    FactoringService,
    AccountService,
    CreditsService,
    TaxesService,
    CheckService,
    CustomersService,
    TransferService,
    DeviceUtilsService,
    DocumentService,
    TokenService,
    ChannelService,
    SignatureService,
    NotificationsManagerService,
    AdvisorService,
    PromosService,
    FormatLiteralPipe,
    TransferService,
    PensionsService,
    // ErrorManagerService
  ]
})
export class OnesaitCoreModule { }
