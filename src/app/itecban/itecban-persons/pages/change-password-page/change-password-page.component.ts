import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService, RouterHelperService, LogoutService, InputValidatorOptions, NotificationsManagerService, SignatureEntity, SignatureTokenService } from 'onesait-core';
import { SettingsService, PasswordInput } from 'itecban-common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonsValidator } from '../../validators/persons-validators';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-change-password-page',
  templateUrl: './change-password-page.component.html'
})
export class ChangePasswordPageComponent implements OnInit, OnDestroy {

  view = '';
  token: any;
  lang: string;
  loading: boolean;
  viewAlert = true;
  viewToken = false;
  viewLanguage = true;
  viewEditPass = true;
  tokenValid: boolean;
  rptNewPassword: string;
  passwordForm: FormGroup;
  signatureEntity: SignatureEntity;
  getTranslateServiceSubscription: Subscription;
  inputValidatorCharacter: InputValidatorOptions;
  putChangeSignaturekeySubscription: Subscription;
  PasswordInput: PasswordInput = new PasswordInput();

  constructor(
    protected router: Router,
    protected utilsService: UtilsService,
    protected logoutService: LogoutService,
    protected settingsService: SettingsService,
    protected translateService: TranslateService,
    protected signatureTokenService: SignatureTokenService,
    protected notificationsManagerService: NotificationsManagerService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), PersonsValidator.otherCharacters]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), PersonsValidator.otherCharacters]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), PersonsValidator.otherCharacters]),
    }, [PersonsValidator.sameValue('ITECBAN-PERSONS'), PersonsValidator.sameValueLastPassword('ITECBAN-PERSONS')]);
  }

  goToToken() {
    this.token = this.utilsService.getItemSessionStorage('access_token');
    this.viewToken = true;
    this.changePwd();
  }

  goToMySpace() {
    let link = [RouterHelperService.getPathFromId('login-page')];
    this.router.navigate(link);
  }

  changePwd() {
    this.loading = true;
    this.PasswordInput.checkOnly = false;
    this.PasswordInput.currentPassword =  this.passwordForm.value.currentPassword;
    this.PasswordInput.newPassword =  this.passwordForm.value.newPassword;

    this.settingsService.putChangePassword(this.PasswordInput, this.signatureEntity).subscribe(() => {
      this.utilsService.setItemSessionStorage('access_token', this.token);
      this.loading = false;
      this.cleanPwd();
      this.utilsService.clearSessionStorage();
      this.showChangeSuccess();
    }, (e) => {
      this.loading = false;
      if ( this.signatureTokenService.requireSignature(e) ) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.view = 'TOKEN';
      }
    });
  }

  showChangeSuccess() {
    this.translateService.get('ITECBAN-PERSONS.MY.SPACE.CHANGE.PWD.SUCCESS').subscribe((result: any) => {
      this.notificationsManagerService.InfoNotificationBusiness(result);
      this.logoutService.exit();
      setTimeout(() => {
        this.goToMySpace();
      }, 3500);
    });
  }

  cleanPwd() {
    this.token = '';
    this.rptNewPassword = '';
    this.PasswordInput.newPassword = '';
    this.PasswordInput.currentPassword = '';
  }

  cancel() {
    this.passwordForm.reset();
    this.view = 'RELOAD';
  }

  back() {
    this.view = 'INIT';
  }

  ngOnDestroy() {
    if (this.putChangeSignaturekeySubscription) {
      this.putChangeSignaturekeySubscription.unsubscribe();
    }
    if (this.getTranslateServiceSubscription) {
      this.getTranslateServiceSubscription.unsubscribe();
    }
  }
}
