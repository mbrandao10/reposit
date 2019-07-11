import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService, RouterHelperService, NBExpressBillService, DeviceUtilsService, ModalPageComponent, UtilsService, AppConfigService } from 'onesait-core';
import { ConfirmingContracts, Amount } from 'onesait-api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-nbexpress-page',
  templateUrl: './nbexpress-page.component.html'
})
export class NbExpressPageComponent implements OnInit {
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
    private nbExpressBillService: NBExpressBillService,
    private deviceUtilsService: DeviceUtilsService,
    private router: Router,
    private appConfigService: AppConfigService,
    private utilsService: UtilsService

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
    this.headerService.setTitle('MENU.BILLS', 'HEADER.TITLE.EXPRESS');
    this.getContracts();
  }

  getContracts(): void {
    this.loading = true;
    this.nbExpressBillService.getContracts().subscribe(result => {
      this.loading = false;
      this.contracts = result.data;
      if (this.contracts) {
        this.getContractsDetail();
      }
    }, () => {
      this.loading = false;
    });
  }

  getContractsDetail(): void {
    // this.loading = true;
    for (let contract of this.contracts) {
      // this.nbExpressBillService.getContract(contract.id).subscribe(result => {
      //   this.loading = false;
        this.contractsDetail.push(contract);
        if (contract.totalAmountOfAdvanceOrders) {
          this.totalAlive.amount += contract.totalAmountOfActiveOrders.amount;
          this.totalAlive.currency = contract.totalAmountOfActiveOrders.currency;
        }
        if (contract.totalAmountOfAdvanceOrders) {
          this.totalAdvanced.amount += contract.totalAmountOfAdvanceOrders.amount;
          this.totalAdvanced.currency = contract.totalAmountOfAdvanceOrders.currency;
        }
      // }, () => {
      //   this.loading = false;
      // });
    }
  }

  selectContract(contract: ConfirmingContracts) {
    let link = RouterHelperService.getPathFromId('express-bill-contract-page', { contractId: contract.id });
    this.router.navigate([link]);
  }

  newContract() {
    if (this.deviceUtilsService.isMobileResolution) {
      this.modal.open();
    } else {
      let link = RouterHelperService.getPathFromId('express-bill-add-page');
      this.router.navigate([link]);
    }
  }
  ngOnDestroy(): void {
    this.deviceUtilsServiceSubscription.unsubscribe();
  }

}
