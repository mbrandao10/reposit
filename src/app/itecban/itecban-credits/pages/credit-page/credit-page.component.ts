import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditsService, PageConfiguration, AppConfigService, HeaderService, HeaderTitleArray, DeviceUtilsService, HeaderTitleElement, ShareService, UtilsService, LiteralFormats } from 'onesait-core';
import { CreditDetail } from 'onesait-api';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';


@Component({
  selector: 'app-credit-page',
  templateUrl: './credit-page.component.html'
})

export class CreditPageComponent implements OnInit, OnDestroy {

  creditId: string;
  loading: boolean;
  view = 'movements';
  creditDate: string;
  level2: HeaderTitleArray;
  accountFormatView: string;
  level1: HeaderTitleElement;
  creditDetail: CreditDetail;
  ismobileResolution: boolean;
  pageConfig: PageConfiguration;
  paramsObservable: Subscription;
  creditServiceSubscription: Subscription;
  getCreditServiceSubscription: Subscription;
  deviceUtilsServiceSubscription: Subscription;
  showView = true;
  from = 0;

  constructor(
    protected route: ActivatedRoute,
    protected shareService: ShareService,
    private headerService: HeaderService,
    protected creditsService: CreditsService,
    private appConfigService: AppConfigService,
    protected deviceUtilsService: DeviceUtilsService,
    protected utilsService : UtilsService,
    protected router: Router
    ) {
      this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
      this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
        this.ismobileResolution = deviceUtilsService.isMobileResolution;
      });
    }

  ngOnInit() {
    this.paramsObservable = this.route.params.subscribe(params => {
      this.creditId = params['id'];
      this.getCredit(this.creditId);
      this.setHeaderTitle();
    });
    this.pageConfig = this.appConfigService.getPageConfig('credit-page');

  }

  getCredit(creditId: string) {
    this.showView = false;
    this.loading = true;
    this.getCreditServiceSubscription = this.creditsService.getCredit(creditId).subscribe(result => {
      this.creditDetail = result.data;
      this.creditDate = result.data.openingDate.toString();

      if (this.shareService.getData('refreshView')) {
        this.view = this.shareService.getData('refreshView');
      } else {
        this.view = 'movements';
      }
      this.loading = false;
      this.showView = true;
    }, () => this.loading = false);
  }

  setHeaderTitle() {
    // if( !this.shareService.getData('breadcrumb-trail')) {
    this.level1 = {
      title: 'MENU.CREDITS',
      routeId: 'credits-page'
    };

    this.level2 = {
      selectedTitle: '',
      elements: [],
      selectedId: '',
      fmt: LiteralFormats.IBAN
    };

    this.headerService.setTitle(this.level1, this.level2);
    this.creditsService.getCredits().subscribe(result => {
      result.data.forEach(elemen => {
          this.level2.elements.push({
             title: elemen.formats[0].value,
             routeId: 'credit-detail-page',
             routeParams: {id: elemen.id},
             fmt: LiteralFormats.IBAN
            });
       if (elemen.id === this.creditId) {
         this.level2.selectedId = this.creditId;
          this.level2.selectedTitle = elemen.formats[0].value;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
      // ordenamos el campo créditos
      this.level2.elements = _.sortBy(this.level2.elements, function (element) {return element.title})           
    console.log(this.level2.elements)});
  /*}else{
    let breadcrumb = this.shareService.getData('breadcrumb-trail');
    breadcrumb.level2.selectedTitle = this.utilsService.formatearIBAN( this.utilsService.calcularIBAN(this.creditId,'ES'));
    this.headerService.setTitle(breadcrumb.level1, breadcrumb.level2);
  }*/
  }


  changeAccountsView(event) {
    this.view = event;
    this.shareService.setData('refreshView', event);
  }

  ngOnDestroy() {
    if (this.paramsObservable) {
      this.paramsObservable.unsubscribe();
    }
    if (this.getCreditServiceSubscription) {
      this.getCreditServiceSubscription.unsubscribe();
    }
    if (this.creditServiceSubscription) {
      this.creditServiceSubscription.unsubscribe();
    }
    if (this.shareService) {
      this.shareService.getDataAndClear('refreshView');
      this.shareService.getDataAndClear('breadcrumb-trail');
    }
  }

}
