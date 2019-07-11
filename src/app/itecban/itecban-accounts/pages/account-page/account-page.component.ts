import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, PageConfiguration, AppConfigService, /*FormatAccountPipe, */ LiteralFormats, HeaderTitleElement } from 'onesait-core';
import { ShareService, HeaderService, HeaderTitleArray } from 'onesait-core';
import { AccountDetail } from 'onesait-api';
import { AccountMovementsComponent } from '../../components/account-movements/account-movements.component';
import { Subscription } from 'rxjs';
import { AccountElement } from 'onesait-api';
import * as _ from 'underscore';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html'
})
export class AccountPageComponent implements OnInit, OnDestroy {

  @ViewChild(AccountMovementsComponent) accountMovementsComponent: AccountMovementsComponent;

  // protected observableAccountDetail: any = [];
  // protected movementSelected: any;
  // accountDetail: any;

  protected paramsObservable: Subscription;
  getAccountObservable: Subscription;
  getAccountsObservable: Subscription;
  loading: boolean;
  showMenuTablet = true;
  id: string;
  title: string;
  accountFormatView: string;
  view = '';
  account: AccountDetail;
  pageConfig: PageConfiguration;
  level1: HeaderTitleElement;
  level2: HeaderTitleArray;
  level2Aux: AccountElement[];
  showView = true;

  private innerWitdh = 0;
  from = 0;

  constructor(
    protected shareService: ShareService, protected accountService: AccountService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected headerService: HeaderService,
    // private formatAccountPipe: FormatAccountPipe,
    protected appConfigService: AppConfigService
  ) {
    // this.sizeWindows(window.outerWidth);
  }

  ngOnInit() {
    this.paramsObservable = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getAccount(this.id);
    });

    this.pageConfig = this.appConfigService.getPageConfig('account-page');
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
  }

  getAccount(id) {
    this.loading = true;
    this.showView = false;

    this.getAccountObservable = this.accountService.getAccount(id).subscribe(result => {
      this.account = result.data;
      // this.title = this.formatAccountPipe.transform(this.account.formats, this.accountFormatView);
      // let title = this.formatAccountPipe.transform(this.account.formats, this.accountFormatView);
      // this.title = this.changeCBU(title);
      if (!this.level2Aux) {
        this.getAccountsObservable =  this.accountService.getAccounts().subscribe(res => {
          this.level2Aux = res.data;
        });
      }

      this.setHeaderTitle();
      this.loading = false;
      if (this.shareService.getData('refreshView')) {
        this.view = this.shareService.getData('refreshView');
      } else {
        this.view = 'movements';
      }
      this.showView = true;
    });
  }

  changeAccountsView(event) {
    this.view = event;
    this.shareService.setData('refreshView', event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.innerWitdh !== event.target.outerWidth) {
      this.innerWitdh = event.target.outerWidth;
    }
    // this.setLevel2(this.level2Aux);
    // this.sizeWindows(this.innerWitdh);
  }

  // sizeLaptop() {
  //   this.level2.selectedTitle = this.title;
  // }

  // sizeWindows(w: any) {
  //   if (w > 0) {
  //     this.from = 15;
  //   }
  //   if (w > 767) {
  //     this.from = 10;
  //   }
  //   if (w > 1023) {
  //     this.from = 0;
  //   }
  //   if (this.level2) {
  //     for (let i = 0; i < this.level2.elements.length; i++) {
  //       this.level2.elements[i].title = this.changeCBU(this.level2.elements[i].title);
  //     }
  //     this.level2.selectedTitle = this.changeCBU(this.level2.selectedTitle);
  //   }
  // }

  // changeCBU(CBU: any) {
  //   let cbu = CBU;
  //   let newCBU = '';
  //   let character;
  //   for (let i = 0; i < cbu.length - 4; i++) {
  //     if (cbu[i] !== ' ') {
  //       if (this.from === 0) {
  //         character = cbu[i];
  //       } else {
  //         character = '*';
  //       }
  //       newCBU = newCBU + character;
  //     } else {
  //       newCBU = newCBU + cbu[i];
  //     }
  //   }
  //   newCBU = newCBU + cbu.substring(25, 29);
  //   newCBU = newCBU.substring(this.from, 29);
  //   return newCBU;
  // }

  setHeaderTitle() {
    // let w = window.outerWidth;
    this.level1 = {
      title: 'MENU.ACCOUNTS',
      routeId: 'accounts-page'
    };
    this.level2 = {
      selectedTitle: this.title,
      elements: [],
      selectedId: '',
      fmt: LiteralFormats.IBAN
    };
    this.headerService.setTitle(this.level1, this.level2);
    this.accountService.getAccounts().subscribe((response) => {
      this.setLevel2(response.data);
      // this.sizeWindows(w);
    });
  }

  setLevel2(data: any) {
    this.level2.elements = [];
    data.forEach(element => {
      // if (element.id !== this.id) {
      // let cbu = element.formats[0].value;
      this.level2.elements.push({
        title: element.formats[0].value,
        routeId: 'account-detail-page',
        routeParams: { id: element.id },
        fmt: LiteralFormats.IBAN
      });
      // } else {
      if (element.id === this.id) {
        this.title = element.formats[0].value;
        this.level2.selectedId = element.id;
        this.level2.selectedTitle = this.title;
      }
    });
    this.level2.elements = _.sortBy(this.level2.elements, function (element) { return element.title; });

  }

  ngOnDestroy() {
    this.shareService.getDataAndClear('refreshView');
    if (this.paramsObservable) {
      this.paramsObservable.unsubscribe();
    }
    this.getAccountObservable.unsubscribe();
    this.getAccountsObservable.unsubscribe();
  }

  // loadDetail(id: string) {
  //   let accountDetail: AccountOS;
  //   let alias: any;
  //   this.loading = true;

  //   this.observableAccountDetail.push(this.accountService.getAccount(id).pipe(map(result => {
  //     accountDetail = result.data;
  //   })));

  //   // this.observableAccountDetail.push(this.accountService.getAlias(id).pipe(map(result => {
  //   //   alias = result.data.alias;
  //   // })));

  //   // forkJoin(this.observableAccountDetail).subscribe(result => {
  //   //   this.accountDetail = accountDetail;
  //   //   this.accountDetail.alias = alias;
  //   //   this.accountDetail.currency.sign = this.utilsService.getCurrency(this.accountDetail.currency.code);
  //   //   this.accountDetail.aliasCoelsa = "";
  //   //   if (this.accountDetail.CBU) {
  //   //     this.coelsaService.getAlias(this.accountDetail.CBU, {disableErrors:true})
  //   //       // tslint:disable-next-line:no-shadowed-variable
  //   //       .subscribe( result => {
  //   //         this.loading = false;
  //   //         if (result.data) {
  //   //           this.accountDetail.aliasCoelsa = result.data.alias;
  //   //         }
  //   //       }, e => this.loading = false);
  //   //   } else {
  //   //     this.loading = false;
  //   //   }
  //   // }, e => {
  //   //   this.accountDetail = accountDetail;
  //   //   if (accountDetail) {
  //   //     this.accountDetail.alias = alias;
  //   //     this.accountDetail.currency.sign = this.utilsService.getCurrency(this.accountDetail.currency.code);
  //   //   }
  //     this.loading = false;
  //   // });
  // }

  // // createTransfer() {
  // //   this.shareService.setData("previusPage", this.router.url);
  // //   let link = ['/itecban/transfer-make'];
  // //   this.router.navigate(link);
  // }

  // cancelAccount() {
  //   let link = ['/itecban/account/cancel', this.id];
  //   this.router.navigate(link);
  // }
}
