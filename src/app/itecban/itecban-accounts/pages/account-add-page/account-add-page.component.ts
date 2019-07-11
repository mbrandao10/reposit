import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService, RouterHelperService, SignatureTokenService, SignatureEntity } from 'onesait-core';

import { AccountService, CustomersService } from 'onesait-core';
import { CustomerProductType, GenericAccountInfo, ProductExt, User, AccountCreateSuccess } from 'onesait-api';
import { ConditionsElement } from 'itecban-common';

@Component({
  selector: 'app-account-add-page',
  templateUrl: './account-add-page.component.html'
})
export class AccountAddPageComponent implements OnInit {

  conditions: ConditionsElement = {
  data: [
    {icon: 'icon icononesait icon-accounts', text: 'ITECBAN-ACCOUNT.ADD.LINK.DOCUMENTS.CONDITIONS', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Condiciones_Generales_ahorro.pdf', read: false},
    {icon: 'icon icononesait icon-accounts', text: 'ITECBAN-ACCOUNT.ADD.LINK.DOCUMENTS.PRECONTRACT', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Ficha_Pre_contractual.ppt', read: false},
    {icon: 'icon icononesait icon-accounts', text: 'ITECBAN-ACCOUNT.ADD.LINK.DOCUMENTS.FGD', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/FGD_dIGITAL.ppt', read: false},
    {icon: 'icon icononesait icon-accounts', text: 'ITECBAN-ACCOUNT.ADD.LINK.DOCUMENTS.RATE', link: location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'Accounts/Tarifas_Empresas.pdf', read: false},
  ]};
  signatureEntity: SignatureEntity;
  accountCreated: AccountCreateSuccess;
  genericAccountInfo: GenericAccountInfo;
  products: ProductExt[];
  user: User;
  step = 'FIRST';
  productSelected: string;
  dateAndTime: Date;
  loading = false;
  primeraEntrada = false;
  acceptTerms = false;
  checkControl = false;
  userName: string;
  activeBoton = false;

  constructor(
    protected router: Router,
    private utilsService: UtilsService,
    private accountService: AccountService,
    private customersService: CustomersService,
    protected routerHelperService: RouterHelperService,
    private signatureTokenService: SignatureTokenService
  ) {
    this.utilsService.accesForbidden();
  }

  ngOnInit() {
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

    this.genericAccountInfo = {
      userId: this.user.userLegalId,
      // Empresa
      username: this.user.activeProfileObj.contractName,
      // Apoderado
      attorney: this.user.userName
    };

    // Lista de productos disponibles
    this.getProducts();
    // *
    // this.translateService.get('ITECBAN-ACCOUNT.ADD.NEW.ALIAS').subscribe((result: any) => {
    //   this.genericAccountInfo.alias = result;
    // });
  }

  getProducts() {
    this.loading = true;
    this.customersService.getProducts(CustomerProductType.SAVING_ACCOUNTS).subscribe( results => {
      this.products = results.data;
      if (this.products && this.products.length) {
        this.productSelected = this.products[0].id;
        this.getDetailProduct(this.productSelected);
      }
    }, (e) => {
      this.loading = false;
      console.log(e);
    });
  }

  getDetailProduct(productCode: string) {
    this.loading = true;
    this.accountService.getProduct( productCode ).subscribe( (result: any) => {
      this.genericAccountInfo.product = result.data;
      this.loading = false;
    }, (e) => {
      this.loading = false;
      console.log(e);
    });
  }


  cancel() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }

  // A valta del servicio de links
  downloadDocument(document: string) {
    let url: string;
    if (document === 'pre-contractual') {
      url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '')  + window.location.pathname + 'Condiciones_Generales_ahorro.pdf';
    }
    // if (document === 'pre-employment') {
    //   url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '')  + window.location.pathname + 'construccion.pdf';
    // }
    // if (document === 'global-contract') {
    //   url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname  + 'construccion.pdf';
    // }
    // if (document === 'book-rates') {
    //   url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname  + 'construccion.pdf';
    // }
    // if (document === 'straight') {
    //   url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname  + 'construccion.pdf';
    // }
    // if (document === '') {
    //   url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname  + 'construccion.pdf';
    // }
    if (url !== undefined) {
      window.open(url, '_blank');
    }
  }

  controlCheck() {
    this.checkControl = !this.checkControl;
  }

  tokenCompleted() {
    this.addAccount();
    /* } else {
      this.step = 'TOKEN';
    } */
  }

  addAccount() {
    this.loading = true;
    this.accountService.addAccount({ productType: this.productSelected }, this.signatureEntity).subscribe( result => {
      this.accountCreated = result.data;
      this.dateAndTime = new Date;
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

  returnOperation(event: boolean) {
    this.activeBoton = event;
  }

  ////////////
  // Necesario para la ventana modal
  ////////////
  // // Pulso el texto
  // goToTermsConditions() {
  //   this.step = 'TERMS';
  // }

  // // Pulso el check
  // goTermsCheck() {
  //   // La primera vez que entro siempre abre las condiciones
  //   if ( this.primeraEntrada === false ) {
  //     // Si no se han leido las condiciones
  //     this.step = 'TERMS';
  //   }
  //   if ( this.primeraEntrada === true ) {
  //     this.acceptTerms = true;
  //     this.newAccount.acceptConditions = this.acceptTerms;
  //   }
  // }

  // // Aceptar
  // goBackFromTermsConditions() {
  //   this.primeraEntrada = true;
  //   this.acceptTerms = true;
  //   this.newAccount.acceptConditions = this.acceptTerms;
  //   this.step = 'FIRST';
  // }

  //  // Salir
  //  goExitTerms() {
  //   this.acceptTerms = false;
  //   this.step = 'FIRST';
  // }
}
