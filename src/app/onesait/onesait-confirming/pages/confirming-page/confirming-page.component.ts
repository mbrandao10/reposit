import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService, ConfirmingService, RouterHelperService, ModalPageComponent, DeviceUtilsService, AppConfigService, UtilsService } from 'onesait-core';
import { ConfirmingContracts, Amount } from 'onesait-api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'osb-confirming-page',
  templateUrl: './confirming-page.component.html'
})
export class ConfirmingPageComponent implements OnInit {
  private deviceUtilsServiceSubscription: Subscription;

  loading: boolean;
  contracts: ConfirmingContracts[];
  contractsDetail: ConfirmingContracts[];

  totalAlive: Amount;
  totalAdvanced: Amount;

  currencySymbol: string;
  accountFormatView: string;
  ismobileResolution: boolean;

  @ViewChild('modal') private modal: ModalPageComponent;

  constructor(
    private headerService: HeaderService,
    private confirmingService: ConfirmingService,
    private deviceUtilsService: DeviceUtilsService,
    private router: Router,
    private appConfigService: AppConfigService,
    private utilsService: UtilsService,
  ) {
    this.contractsDetail = [];
    this.totalAlive = { amount: 0, currency: { id: '978', code: 'EUR' } };
    this.totalAdvanced = { amount: 0, currency: { id: '978', code: 'EUR' } };
    this.currencySymbol = this.utilsService.getCurrency(this.appConfigService.getConfig('defaultCurrency'));
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.deviceUtilsServiceSubscription = this.deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = this.deviceUtilsService.isMobileResolution;
    });
  }

  ngOnInit() {

    this.headerService.setTitle('MENU.BILLS', 'HEADER.TITLE.CONFIRMING');
    this.getContracts();
  }

  getContracts(): void {
    this.loading = true;
    this.confirmingService.getContracts().subscribe(result => {
      this.loading = false;
      this.contracts = result.data;
      if (this.contracts && this.contracts.length > 0) {
        this.getContractsDetail();
      }
    }, () => {
      this.loading = false;
    });
  }

  getContractsDetail(): void {
    // this.loading = true;
    for (let contract of this.contracts) {
      // this.confirmingService.getContract(contract.id).subscribe(result => {
      // this.loading = false;
      this.contractsDetail.push(contract);
      if (contract.totalAmountOfAdvanceOrders) {
        this.totalAlive.amount += contract.totalAmountOfActiveOrders.amount;
        this.totalAlive.currency = contract.totalAmountOfActiveOrders.currency;
        this.currencySymbol = this.utilsService.getCurrency(contract.totalAmountOfActiveOrders.currency.code);

      }
      if (contract.totalAmountOfAdvanceOrders) {
        this.totalAdvanced.amount += contract.totalAmountOfAdvanceOrders.amount;
        this.totalAdvanced.currency = contract.totalAmountOfAdvanceOrders.currency;
      }
      // }, () => {
      // this.loading = false;
      // });
    }
  }

  selectContract(contract: ConfirmingContracts) {
    let link = RouterHelperService.getPathFromId('confirming-contract-page', { id: contract.id });
    this.router.navigate([link]);
  }

  newContract() {
    if (this.deviceUtilsService.isMobileResolution) {
      this.modal.open();
    } else {
      let link = RouterHelperService.getPathFromId('confirming-add-page');
      this.router.navigate([link]);
    }
  }

  ngOnDestroy(): void {
    this.deviceUtilsServiceSubscription.unsubscribe();
  }
}
