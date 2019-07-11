import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, Renderer2, AfterViewInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, LogoutService, DeviceUtilsService, //TokenService 
} from 'onesait-core';
import { SettingsService } from '../../services-http/settings/settings.service';
import { UtilsService } from 'onesait-core';
import { RequestService } from 'onesait-core';
import { constants } from 'onesait-core';
import { TranslateService } from '@ngx-translate/core';
import { ResourceService } from '../../services/resource-service/resource.service';
import { AppConfigService, RouterHelperService } from 'onesait-core';
import { UsersService } from 'onesait-core';
import { Token, User, Profile } from 'onesait-api';
import { NgForm } from '@angular/forms';

/**
  * Component to make login and choose profile
  */

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

	private loginService: LoginService;
	//private tokenService: TokenService;
	private requestService: RequestService;
	private router: Router;
	private utilsService: UtilsService;
	private logoutService: LogoutService;
	private settingsService: SettingsService;
	private translateService: TranslateService;
	private resourceService: ResourceService;
	private appConfigService: AppConfigService;
	private usersService: UsersService;
	protected changeDetectorRef: ChangeDetectorRef;
	protected deviceUtilsService: DeviceUtilsService;
	protected renderer: Renderer2;

	username: string;
	password: string;
	newPassword: string;
	newPasswordRepeat: string;
	oldPassword: string;
	dni: string;
	email: string;
	profiles: any;
	view: string; // login, choose, remember, loading, newPass, compToken, newPassOK
	rememberUser: boolean;
	token: string;
	tokenValid: any;
	rememberPasswordTokenIsRequired: any;
	changePasswordTokenIsRequired: any;

	showLoader = false;
	loadingApp: boolean;
	errorMsg: string;
	version: string;
	// MessageError
	messageError: string;
	@ViewChild('loginForm', { read: NgForm }) loginForm: NgForm;
	@ViewChild('splash', { read: ElementRef }) splash: ElementRef;

	constructor(
		private injectorObj: Injector
	) {
		this.loginService = this.injectorObj.get(LoginService);
		//this.tokenService = this.injectorObj.get(TokenService);
		this.requestService = this.injectorObj.get(RequestService);
		this.router = this.injectorObj.get(Router);
		this.utilsService = this.injectorObj.get(UtilsService);
		this.logoutService = this.injectorObj.get(LogoutService);
		this.settingsService = this.injectorObj.get(SettingsService);
		this.translateService = this.injectorObj.get(TranslateService);
		this.resourceService = this.injectorObj.get(ResourceService);
		this.appConfigService = this.injectorObj.get(AppConfigService);
		this.usersService = this.injectorObj.get(UsersService);
		this.changeDetectorRef = this.injectorObj.get(ChangeDetectorRef);
		this.deviceUtilsService = this.injectorObj.get(DeviceUtilsService);
		this.renderer = this.injectorObj.get(Renderer2);

		this.rememberPasswordTokenIsRequired = this.appConfigService.getConfig().rememberPasswordTokenIsRequired;
		this.changePasswordTokenIsRequired = this.appConfigService.getConfig().changePasswordTokenIsRequired;
	}

	ngOnInit() {
		this.view = 'login';
		this.checkRememberUser();
		this.utilsService.clearSessionStorage();
		this.version = this.appConfigService.getConfig().version;
		this.messageError = null;
	}


	ngAfterViewInit() {
		if (this.deviceUtilsService.isMobileResolution) {
			this.renderer.setStyle(this.splash.nativeElement, 'display', 'block');
			setTimeout(() => {
				this.renderer.setStyle(this.splash.nativeElement, 'display', 'none');
			}, 2000);
		}
	}

	checkRememberUser() {
		if (this.utilsService.getItemLocalStorage(constants.REMEBER_USERNAME)) {
			let username = this.utilsService.getItemLocalStorage(constants.REMEBER_USERNAME);
			let password = this.utilsService.getItemLocalStorage(constants.REMEBER_USERNAME); // ITECNB - 636
			if (username) {
				this.username = username;
				this.password = password; 	// ITECNB - 636
			}
			this.rememberUser = true;
		}
	}

	/**
	 * Login with username and password
	 */
	loginUserPassword() {

		if (!this.loginForm.valid) {
			if (!this.loginForm.controls['username'].valid) {
				this.loginForm.controls['username'].markAsTouched();
			}
			if (!this.loginForm.controls['password'].valid) {
				this.loginForm.controls['password'].markAsTouched();
			}
			return;
		}

		this.utilsService.clearSessionStorage();
		if (this.rememberUser) {
			this.utilsService.setItemLocalStorage(constants.REMEBER_USERNAME, this.username);
		} else {
			this.utilsService.removeItemLocalStorage(constants.REMEBER_USERNAME);
		}
		this.showLoader = true;
		this.requestService.setHeader('Authorization', this.appConfigService.getConfig('BASIC_HEADER_AUTHORIZATION'));
		this.loginService.loginUserPassword(this.composeCallLogin()).subscribe((result: Token) => {
			this.requestService.deleteHeader('Authorization');
			this.requestService.setHeader('Authorization', 'Bearer ' + result.access_token);

			this.utilsService.setItemSessionStorage(constants.ACCESS_TOKEN, result.access_token);
			this.utilsService.setItemSessionStorage(constants.TOKEN_EXPIRATION, new Date().getTime() + result.expires_in * 1000);
			this.utilsService.setItemSessionStorage(constants.TOKEN_REFRESH, result.refresh_token);

			// this.tokenService.refreshTokenExpiration();

			this.usersService.getUserInformation().subscribe((userInfoResult: User) => {
				this.utilsService.changeLanguage(userInfoResult.userLanguage);

				if (!userInfoResult.updateCredentialRequired) {
					this.utilsService.setItemSessionStorage(constants.USER, JSON.stringify(userInfoResult));
					this.parseProfiles(userInfoResult.profiles);
				} else {
					let link = [RouterHelperService.getPathFromId('expired-password')];
					this.router.navigate(link);
				}
				this.errorMsg = undefined;
				this.showLoader = false;
			});
		}, e => {
			this.utilsService.clearSessionStorage();
			this.showLoader = false;
			this.password = '';
			let body = e.error;

			let usernameAux = this.username;
			this.loginForm.reset();
			this.changeDetectorRef.detectChanges();
			this.username = usernameAux;
			if (body.result && body.result.errors && body.result.errors[0]) {
				this.errorMsg = body.result.errors[0].errorDescription;
				if (body.result.errors[0].errorCode === '391B') {
					this.errorMsg += ' ' + this.translateService.instant('ITECBAN-COMMON.LOGIN.ERROR.MAX.TRIED');
				}
			}

		});
	}

	// callManuallyProfiles() {
	// 	this.loginService.getProfiles().subscribe(result => {
	// 		this.parseProfiles(result);
	// 	});
	// }

	parseProfiles(profiles: Profile[]) {
		if (profiles.length > 1) {
			this.profiles = profiles;
			this.view = 'choose';
		} else if (profiles.length === 1) {
			// MBR: seteamos el observable
			this.utilsService.setIsLogged(true);
			this.loginService.setProfile(profiles[0].id);
			this.prepareApp();
		}
	}

	prepareApp2() {
		this.resourceService.getResource('config').subscribe(result => {
			this.utilsService.setItemSessionStorage(constants.APP_CONFIG, JSON.stringify(result));
			this.appConfigService.updateConfig(result);
			this.loadingApp = false;
			this.goHome();
		}, () => {
			this.loadingApp = false;
			this.prepareAppError();
		});
	}

	// Metodo provisional, el bueno es prepareApp2
	prepareApp() {
		this.loadingApp = false;
		this.goHome();
	}


	prepareAppError() {
		this.router.navigate(['/error500']);
	}

	/**
	 * Write data to remember the password
	 */
	rememberUserData() {
		this.view = 'remember';
		this.username = '';
		this.dni = '';
		this.email = '';
		this.token = '';
	}

	/**
	 * Go to login screen
	 */
	goBackLogin() {
		this.checkRememberUser();
		this.tokenValid = false;
		this.password = '';
		this.view = 'login';
	}

	/**
	 * Go to Loading screen
	 */
	goLoading() {
		this.messageError = null;
		let rememberPwd = {
			email: this.email,
			legalDocumentId: this.dni,
			legalDocumentType: this.appConfigService.getConfig().login.rememberPwd.docType,
			userName: this.username
		};
		if (!this.rememberPasswordTokenIsRequired) {
			this.token = '222222';
		}

		this.showLoader = true;
		this.settingsService.rememberPassword(rememberPwd, this.token).subscribe(() => {
			this.messageError = null;
			this.view = 'loading';
			this.showLoader = false;
		}, e => {
			let body = JSON.parse(e._body);
			let code = body.result.errors[0].errorDescription;
			this.messageError = code;
			this.showLoader = false;
		});

	}

	/**
	 * Back botton
	 */
	back() {
		switch (this.view) {
			case 'choose': {
				this.goBackLogin();
				break;
			}
			case 'remember': {
				this.messageError = null;
				this.goBackLogin();
				break;
			}
			case 'loading': {
				this.changeView('remember');
				break;
			}
			case 'newPass': {
				this.changeView('loading');
				break;
			}
			case 'compToken': {
				this.goBackWriteNewPass();
				break;
			}
		}
	}

	changeView(nextView: string) {
		this.view = nextView;
	}

	/**
	 * Write new pass
	 */
	writeNewPass() {
		this.oldPassword = '';
		this.newPassword = '';
		this.newPasswordRepeat = '';
		this.view = 'newPass';
	}

	/**
	 * Go to write new pass screen
	 */
	goBackWriteNewPass() {
		this.messageError = null;
		this.oldPassword = '';
		this.newPassword = '';
		this.newPasswordRepeat = '';
		this.view = 'newPass';
	}

	/**
	 * Go to complete Token
	 */
	completeToken() {
		if (this.changePasswordTokenIsRequired) {
			this.token = '';
			this.view = 'compToken';
		} else {
			this.token = '222222';
			this.changePwd();
		}
	}

	/**
	 * Go to finally screen, new password OK
	 */
	writeNewPassOK() {
		this.view = 'newPassOK';
	}

	goHome() {
		let link;
		/*if (this.utilsService.getItemLocalStorage(constants.FIRST_ACCESS_KEY)) {
		} else {
			link = [RouterHelperService.getPathFromId('first-access-page')];
		}*/
		link = [RouterHelperService.getPathFromId('global-position-page')];
		this.router.navigate(link);
	}

	changePwd() {
		/*let changePwd = {
			currentPassword: this.oldPassword,
			newPassword: this.newPassword,
		};
		this.showLoader = true;
		this.settingsService.putChangePassword(changePwd, this.token).subscribe(() => {
			this.view = 'newPassOK';
			this.showLoader = false;
		}, e => {
			let body = JSON.parse(e._body);
			let code = body.result.errors[0].errorDescription;
			this.messageError = code;
			this.showLoader = false;
		});*/
	}

	changePwdFinished() {
		this.logoutService.logout().subscribe(() => { });
		this.view = 'login';
	}

	goTonlyapp() {
		let url: string;
		url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'construccion.pdf';
		if (url !== undefined) {
			window.open(url, '_blank');
		}
		// this.router.navigate(['/OnlyApp']);
	}

	private composeCallLogin(): FormData {
		let formData = new FormData();
		formData.append('grant_type', 'password');
		formData.append('username', this.username);
		formData.append('password', this.password);
		return formData;
	}

	close() {
		this.errorMsg = undefined;
	  }

}
