import { Component, OnInit } from '@angular/core';
import { AppConfigService, PageConfiguration, HeaderService, AccountService, CreditsService, TransferService, DeviceUtilsService } from 'onesait-core';
import { TransferFavouriteOutput, TransferState } from 'onesait-api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'osb-transfers-page',
  templateUrl: './transfers-page.component.html'
})
export class TransfersPageComponent implements OnInit {

  pageConfig: PageConfiguration;
  favourite: TransferFavouriteOutput;
  transferState: TransferState;
  transferFavs: TransferFavouriteOutput[];
  view: string;
  loading: boolean;

  constructor(
    private appConfigService: AppConfigService,
    private headerService: HeaderService,
    private accountService: AccountService,
    private creditsService: CreditsService,
    private transferService: TransferService,
    private deviceUtilsService: DeviceUtilsService
  ) {
    if (this.isMobileResolution()) {
      this.pageConfig = this.appConfigService.getPageConfig('transfers-page-mobile');
    } else {
      this.pageConfig = this.appConfigService.getPageConfig('transfers-page');
    }
  }

  ngOnInit() {
    this.headerService.setTitle('HEADER.TITLE.TRANSFER');

    let observableData: any = [];
    observableData.push(this.accountService.getAccounts());
    observableData.push(this.transferService.getCurrencies());
    observableData.push(this.transferService.getFrequencyTypes());
    observableData.push(this.transferService.getFavourites());
    observableData.push(this.transferService.getCharges());
    observableData.push(this.transferService.getPurposeTypes());
    observableData.push(this.creditsService.getCredits());
    observableData.push(this.transferService.getCountries("international"));
    observableData.push(this.transferService.getCountries("target2"));

    this.loading = true;
    forkJoin(observableData).subscribe((result: any) => {
      this.transferState = new TransferState();
      this.transferState.accounts = result[0].data;
      this.transferState.currencies = result[1].data;
      this.transferState.frequencyTypes = result[2].data;
      this.transferFavs = result[3].data;
      this.transferState.chargeBearer = result[4].data;
      this.transferState.purposeTypes = result[5].data;
      this.transferState.credits = result[6].data;
      this.transferState.beneficiaryCountriesInternational = result[7].data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
      this.transferState.beneficiaryCountriesTarget = result[8].data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
      this.transferState.beneficiaryResident = '';
      this.loading = false;
      this.view = 'emit';
    }, () => {
      this.loading = false;
    });

  }

  reuseFavourite(favourite: TransferFavouriteOutput) {
    this.favourite = favourite;
    this.view = 'emit';
  }

  refreshFavList() {
    this.loading = true;
    this.transferService.getFavourites().subscribe(results => {
      this.transferFavs = results.data;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

}
