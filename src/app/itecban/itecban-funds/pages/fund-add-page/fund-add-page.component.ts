import { Component, OnInit } from '@angular/core';
import { FundsService, NewFund, AccountsFundsLinkable, ConditionsElement } from 'itecban-common';
import { AppConfigService, UtilsService, SignatureEntity, SignatureTokenService, CustomersService, RouterHelperService, HeaderService } from 'onesait-core';
import { CustomerProductType, User, ProductExt } from 'onesait-api';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'osb-fund-add-page',
  templateUrl: './fund-add-page.component.html',
})
export class FundAddPageComponent implements OnInit {

  conditions: ConditionsElement;
  loading: boolean;
  step = 'FIRST';
  accounts: AccountsFundsLinkable[];
  newFund: NewFund;
  accountFormatView: string;
  // crear interfaz para tipo de producto de fondos y valors (actualmente no tenemos los formatos)
  products: ProductExt [];
  selectedProduct: any;
  userInfo: any;
  user: User;
  userName = '';
  checkControl: boolean;
  signatureEntity: SignatureEntity;
  idFundCreate: string;
  activeBoton = false;
  selectedProductName: string;
  accountSelected: AccountsFundsLinkable;
  dateOpen: Date;

  constructor(
    private fundsService: FundsService,
    private customersService: CustomersService,
    private appConfigService: AppConfigService,
    private headerService: HeaderService,
    private utilsService: UtilsService,
    private signatureTokenService: SignatureTokenService,
    private translateService: TranslateService,
    private router: Router
  ) {
      this.utilsService.accesForbidden();
  }

  ngOnInit() {
    this.resetConditions();
    let conditions;
    let page;
    this.translateService.get('ITECBAN-FUNDS.ADD.CONTRACT.CONDITIONS').subscribe((result: any) => {
      conditions = result;
    });
    this.translateService.get('MENU.FUNDS').subscribe((result: any) => {
      page = result;
    });
    let title = conditions + ' - ' + page;
    this.headerService.setTitle(title);
    this.step = 'FIRST';
    this.user = this.utilsService.getUser();

    if (this.user.userName) {
      this.userName = this.user.userName;
    }
    if (this.user.userFirstSurname) {
      this.userName += ' ' + this.user.userFirstSurname;
    }
    if (this.user.userSecondSurname) {
      this.userName += ' ' + this.user.userSecondSurname;
    }

    this.userInfo = {
      businessName: this.user.activeProfileObj.contractName,
      businessId: this.user.activeProfileObj.holderLegalId,
      // Apoderado
      attorney: this.userName,
      userId: this.user.userLegalId,
    };

    this.newFund = {
      productId: '',
      accountId : ''
    };
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.getProducts();
    this.getAccounts();
  }

  getProducts() {
    this.customersService.getProducts(CustomerProductType.FUNDS).subscribe((results) => {
      this.products = results.data;
      this.products.unshift(
        { id: '',
          description: '',
          type: null,
          subtype: null,
          name: '',
          currency: null
        });
    });
  }

  getAccounts() {
    this.loading = true;
    this.fundsService.getAccountsLinkable().subscribe((results) => {
      this.loading = false;
      this.accounts = results.data;
      this.accounts.unshift({
        id: '',
        formats: null,
        currency: null
      });
    }, e => {
      this.loading = false;
      console.log(e);
    });
  }

  changeProduct(selectedProduct) {
    this.selectedProduct = selectedProduct;
  }

  downloadDocument(document: string) {
    let url: string;
    if (document === 'preContractual') {
      url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'construccion.pdf';
    }
    if (url !== undefined) {
      window.open(url, '_blank');
    }
  }

  addFund() {
    this.loading = true;
    this.fundsService.postFunds( this.newFund , this.signatureEntity).subscribe( result => {
      this.idFundCreate = result.data.id;
      this.selectedProductName = _.findWhere(this.products, { id: this.newFund.productId  }).name;
      this.accountSelected = _.findWhere(this.accounts, { id: this.newFund.accountId });
      this.dateOpen = new Date();
      this.step = 'CREATED';
      this.loading = false;
    },  e => {
      this.loading = false;
      if (!this.signatureEntity) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.step = 'TOKEN';
      }
    });
  }

  controlCheck() {
    this.checkControl = !this.checkControl;
  }

  tokenCompleted() {
    this.addFund();
  }

  cancel() {
    let link = [RouterHelperService.getPathFromId('funds-page')];
    this.router.navigate(link);
  }

  goNewFund() {
    let link = [RouterHelperService.getPathFromId('funds-page')];
    this.router.navigate(link);
  }

  getDetailProduct(productId: string) {
    console.log(productId);
    this.resetConditions();
  }

  returnOperation(event: boolean) {
    this.activeBoton = event;
  }

  resetConditions() {
    this.conditions = {
      data: [
        {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-FUNDS.ADD.LINK.DOCUMENTS.PRECONTRACTUAL.INFORMATION', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'construccion.pdf', read: false}
      ]};
      this.activeBoton = false;
      this.checkControl = false;
  }

}
