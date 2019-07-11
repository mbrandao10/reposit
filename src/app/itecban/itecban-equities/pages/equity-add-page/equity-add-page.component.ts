import { Component, OnInit } from '@angular/core';
import { NewEquity, EquitiesService, AccountsEquitiesLinkable, ConditionsElement } from 'itecban-common';
import { AppConfigService, UtilsService, SignatureEntity, SignatureTokenService, CustomersService, RouterHelperService, HeaderService } from 'onesait-core';
import { CustomerProductType, User, ProductExt } from 'onesait-api';
import { Router } from '@angular/router';
import { AccountService } from 'onesait-core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'osb-equity-add-page',
  templateUrl: './equity-add-page.component.html'
})
export class EquityAddPageComponent implements OnInit {

  conditions: ConditionsElement;
  loading: boolean;
  step = 'FIRST';
  accounts: AccountsEquitiesLinkable[];
  newEquity: NewEquity;
  accountFormatView: string;
  products: ProductExt [];
  selectedProduct: any;
  userInfo: any;
  user: User;
  userName = '';
  checkControl: boolean;
  signatureEntity: SignatureEntity;
  idEquityCreate: string;
  activeBoton = false;
  selectedProductName: string;
  accountSelected: AccountsEquitiesLinkable;
  dateOpen: Date;

  constructor(
    private equitiesService: EquitiesService,
    private customersService: CustomersService,
    private appConfigService: AppConfigService,
    private headerService: HeaderService,
    private utilsService: UtilsService,
    private signatureTokenService: SignatureTokenService,
    private router: Router,
    private translateService: TranslateService,
    private accountService: AccountService
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
    this.translateService.get('MENU.EQUITIES').subscribe((result: any) => {
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

    this.newEquity = {
      productId: '',
      accountId: ''
    };
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.loadDataForm();
  }

  loadDataForm() {
    let observableData: any = [];
    observableData.push(this.customersService.getProducts(CustomerProductType.EQUITIES));
    observableData.push(this.accountService.getAccounts());

    this.loading = true;

    forkJoin(observableData).subscribe((result: any) => {

      this.products = result[0].data;
      this.products.unshift(
        { id: '',
          description: '',
          type: null,
          subtype: null,
          name: '',
          currency: null
        });
      this.accounts = result[1].data;
      this.accounts.unshift({
          id: '',
          formats: null,
          currency: null
        });
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  changeProduct(selectedProduct) {
    this.resetConditions();
    this.selectedProduct = selectedProduct;
  }

  downloadDocument(document: string) {
    let url: string;
    if (document === 'pre-contractual') {
       url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'construccion.pdf';
    }
    if (url !== undefined) {
      window.open(url, '_blank');
    }
  }

  addEquity() {
    this.loading = true;
    this.equitiesService.postEquity( this.newEquity , this.signatureEntity).subscribe( result => {
      this.idEquityCreate = result.data.id;
      this.step = 'CREATED';
      this.loading = false;
      this.selectedProductName = _.findWhere(this.products, { id: this.newEquity.productId  }).name;
      this.accountSelected = _.findWhere(this.accounts, { id: this.newEquity.accountId });
      this.dateOpen = new Date;
    },  e => {
      this.loading = false;
      if (this.signatureTokenService.requireSignature(e)) {
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
    this.addEquity();
  }
  cancel() {
    let link = [RouterHelperService.getPathFromId('equities-page')];
    this.router.navigate(link);
  }

  goNewEquity() {
    // this.checkControl = false;
    // this.newEquity = {
    //   productId: '',
    //   accountId: ''
    // };
    // this.step = 'FIRST';
    let link = [RouterHelperService.getPathFromId('equities-page')];
    this.router.navigate(link);
  }

  returnOperation(event: boolean) {
    this.activeBoton = event;
  }

  resetConditions() {
    this.conditions  = {
      data: [
        {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-EQUITIES.ADD.LINK.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Equities/Condiciones_Generales_cuenta valores.pdf', read: false},
        {icon: 'icon icononesait icon-documents fa-pull-left', text: 'ITECBAN-EQUITIES.ADD.LINK.DOCUMENTS.INFORMATION', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Equities/Ficha_Valores.pdf', read: false},
      ]};
      this.checkControl = false;
      this.activeBoton = false;
  }

}
