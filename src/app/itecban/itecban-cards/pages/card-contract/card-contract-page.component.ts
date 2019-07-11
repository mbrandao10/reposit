import { Component, OnInit } from '@angular/core';
import { AppConfigService, DeviceUtilsService, AccountService, HeaderService, SignatureEntity, SignatureTokenService, RouterHelperService, UtilsService /*, FormatAccountPipe,*/ } from 'onesait-core';
import { AccountElement } from 'onesait-api';
import { CardsService } from 'itecban-common';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
    selector: 'app-card-contract',
    templateUrl: './card-contract-page.component.html'
  })
  export class CardContractPageComponent implements OnInit {

  loading: boolean;
  step = 'FIRST';
  accountFormatView: string;
  accounts: AccountElement[];
  cards: any [];
  signatureEntity: SignatureEntity;
  username: string;
  customer: any;
  creditCardsProducts: any;
  addresses;
  disable = false;
  observableData: any = [];
  allServiceFull = false;
  activeBoton = false;
  conditions: string;
  contract;
  accountId: string;
  view: string;

  constructor(
    protected accountService: AccountService,
    protected router: Router,
    protected utilsService: UtilsService,
    protected appConfigService: AppConfigService,
    protected headerService: HeaderService,
    protected cardsSevice: CardsService,
    protected deviceUtilsService: DeviceUtilsService,
    protected signatureTokenService: SignatureTokenService
    ) {
    this.utilsService.accesForbidden();
  }

  ngOnInit() {
    this.headerService.setTitle('ITECBAN-CARDS.CONTRACT');
  }


  goStep(contractConditions: any) {
    this.step = 'SECOND';
    this.conditions = contractConditions.conditions;
    this.contract = contractConditions.contract;
    this.view = contractConditions.view;
    if (this.contract.accountId) {
      this.accountId = contractConditions.contract.accountId.substring(0, 4) + ' ' +
                                contractConditions.contract.accountId.substring(4, 8) + ' ' +
                                contractConditions.contract.accountId.substring(8, 12) + ' ' +
                                contractConditions.contract.accountId.substring(12, 16) + ' ' +
                                contractConditions.contract.accountId.substring(16, 20) + ' ' +
                                contractConditions.contract.accountId.substring(20, 24);
      this.addresses = contractConditions.address;
    }
    // this.step = 'CREATED';
  }

  goToken() {
    this.loading = true;
    // tarjetas de Debito
    if (this.view === 'debit') {
      this.cardsSevice.addDebitCard( this.contract, this.signatureEntity).subscribe(res => {
          let newCard  = res.data;
          console.log(newCard);
          this.step = 'CREATED';
          this.loading = false;
        }, e => {
          console.log(e);
          this.loading = false;
          if ( this.signatureTokenService.requireSignature(e) ) {
            this.signatureEntity = this.signatureTokenService.requireSignature(e);
          }
          if (this.signatureEntity) {
            this.step = 'TOKEN';
          }
        });
    }
    // tarjetas de Credito
    if (this.view === 'credit') {
      this.cardsSevice.addCreditCard( this.contract, this.signatureEntity).subscribe(res => {
        let newCard  = res.data;
        console.log(newCard);
        this.step = 'CREATED';
        this.loading = false;
      }, e => {
        this.loading = false;
          if ( this.signatureTokenService.requireSignature(e) ) {
            this.signatureEntity = this.signatureTokenService.requireSignature(e);
          }
          if (this.signatureEntity) {
            this.step = 'TOKEN';
          }
      });
  }
}

  returnOperation(event: boolean) {
    this.activeBoton = event;
  }

  goCards() {
    let link = [RouterHelperService.getPathFromId('cards-page')];
    this.router.navigate(link);
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

  close() {
    this.goCards();
  }

  back() {
    if (this.step === 'TOKEN') {
      this.step = 'SECOND';
    } else {
      this.signatureEntity = null;
      // this.loadForm();
      this.step = 'FIRST';
    }
  }

  cancel() {
    this.goCards();
  }

}
