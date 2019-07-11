import { Component, OnInit } from '@angular/core';
import { HeaderService, FactoringService, RouterHelperService, AppConfigService } from 'onesait-core';
import { FactoringContracts, FactoringContract } from 'onesait-api';
import { Router } from '@angular/router';
import { Amount } from 'onesait-api';

@Component({
  selector: 'osb-factoring-page',
  templateUrl: './factoring-page.component.html'
})
export class FactoringPageComponent implements OnInit {

  loading: boolean;
  contracts: FactoringContracts[];
  contractsDetail: FactoringContract[];

  totalFinanced: Amount;
  totalCollection: Amount;

  constructor(
    private headerService: HeaderService,
    private factoringService: FactoringService,
    private router: Router,
    private appConfigService: AppConfigService
  ) {
    this.contractsDetail = [];
    this.totalCollection = { amount: 0, currency: { id: '', code: this.appConfigService.getConfig('defaultCurrency') } };
    this.totalFinanced = { amount: 0, currency: { id: '', code: this.appConfigService.getConfig('defaultCurrency') } };
  }

  ngOnInit() {
    this.headerService.setTitle('MENU.BILLS', 'HEADER.TITLE.FACTORING');
    this.getContracts();
  }

  getContracts(): void {
    this.loading = true;
    this.factoringService.getContracts().subscribe(result => {
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
    if (this.contracts.length > 0) {
      this.loading = true;
      for (let contract of this.contracts) {
        this.factoringService.getContract(contract.id).subscribe(result => {
          this.loading = false;
          this.contractsDetail.push(result.data);
          this.totalFinanced.amount += result.data.financedAmount.amount;
          this.totalFinanced.currency = result.data.financedAmount.currency;
          this.totalCollection.amount += result.data.collectionsAmount.amount;
          this.totalCollection.currency = result.data.collectionsAmount.currency;
        }, () => {
          this.loading = false;
        });
      }
    }
  }

  selectContract(contract: FactoringContract) {
    let link = RouterHelperService.getPathFromId('factoring-contract-page', { contractId: contract.id });
    this.router.navigate([link]);
  }

  newContract() {
    let link = RouterHelperService.getPathFromId('factoring-add-page');
    this.router.navigate([link]);
  }

}
