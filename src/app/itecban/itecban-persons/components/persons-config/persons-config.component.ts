import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService, RouterHelperService, HeaderService, CustomersService } from 'onesait-core';

@Component({
  selector: 'app-persons-config',
  templateUrl: './persons-config.component.html'
})
export class PersonsConfigComponent implements OnInit {

  @Input() productIdAlert: any;

  lang: string;
  loading: boolean;
  userNumber: string;
  viewAlert = true;

  // Pin
  oldPinValue: any;
  newPinValue: any;
  editPin: boolean;
  showPin: boolean;

  constructor(
    private customersService: CustomersService,
    private utilsService: UtilsService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.setTitle('HEADER.TITLE.PERSONS-CONFIG');
    this.lang = this.utilsService.getCurrentLanguage();
  }

  getPin() {
    this.loading = true;
    this.userNumber = this.utilsService.getUser().userNumber;
    this.customersService.getPin(this.userNumber, {disableErrors: true}).subscribe(result => {
      this.oldPinValue = result.data;
      this.loading = false;
    },
    () => this.loading = false);
    console.log(this.userNumber);
  }

  updatePin(newPin: string, oldPin: string) {
    this.loading = true;
    let params = { pin: newPin, oldPin: oldPin };
    this.customersService.putPin(params).subscribe(() => {
      this.loading = false;
      this.oldPinValue = newPin;
      this.initPinValues();
    }, () => this.loading = false);
  }

  initPinValues() {
    this.editPin = false;
    this.showPin = false;
    this.newPinValue = '';
  }

  changeLang(lang: string) {
    this.utilsService.changeLanguage(lang);
  }

  goChangePassword() {
    // let link = '/onesait/i/change-password';
    let link = RouterHelperService.getPathFromId('change-password-page');
    this.router.navigate([link]);
  }

}
