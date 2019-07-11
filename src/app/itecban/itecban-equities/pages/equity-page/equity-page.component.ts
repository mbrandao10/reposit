import { Component, OnInit } from '@angular/core';
import { EquitiesList, /*EquityDetail, */EquitiesService, InversisManager } from 'itecban-common';
import { /*PageConfiguration, */AppConfigService, HeaderTitleElement, HeaderTitleArray, HeaderService, RouterHelperService, CustomersService, LiteralFormats } from 'onesait-core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'osb-equity-page',
  templateUrl: './equity-page.component.html'
})
export class EquityPageComponent  extends InversisManager implements OnInit {

  accountId: string;
  equityId: string;
  equitiesAccountList: EquitiesList [];
  accountEquity: EquitiesList;
  loading: boolean;
  // equity: EquityDetail;
  view: 'conditions';
  // pageConfig: PageConfiguration;
  accountFormatView: string;


  constructor(
    private activateRoute: ActivatedRoute,
    private equitiesService: EquitiesService,
    private appConfigService: AppConfigService,
    private headerService: HeaderService,
    protected router: Router,
    customerServices: CustomersService
  ) {
    super(customerServices);
  }

  ngOnInit() {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    // this.pageConfig = this.appConfigService.getPageConfig('equity-page');
    this.activateRoute.params.subscribe(params => {
      this.accountId = params['id'];
      /*this.equityId = params['equityId'];*/
      this.getEquities();
    });
  }

  getEquities() {
    this.loading = true;
    this.equitiesService.getEquities(this.accountId).subscribe(results => {
        this.equitiesAccountList = results.data;
        if (this.equitiesAccountList.length > 0) {
          this.accountEquity = this.equitiesAccountList[0];
          /*this.equitiesAccountList[0].equities.forEach(element => {
            if (element.id === this.equityId) {
              this.equity = element;
            }
          });*/
        }
        this.setHeaderTitle();
      },
      e => {
        console.log(e);
        this.loading = false;
      }
    );
  }

  setHeaderTitle() {
    let level1: HeaderTitleElement;
    let level2: HeaderTitleArray;

    level1 = {
      title: 'HEADER.TITLE.EQUITIES',
      routeId: 'equities-page'
    };

    level2 = {
      selectedTitle: '',
      elements: [],
      selectedId: '',
      fmt: LiteralFormats.IBAN
    };
    this.headerService.setTitle(level1,level2);
    
    this.equitiesService.getEquities().subscribe(result => {
      result.data.forEach(element => {
        level2.elements.push({
          title: element.formats[0].value,
          routeId: 'equity-page',
          routeParams: {id: element.accountEquityId},
          fmt: LiteralFormats.IBAN
        });
        if (element.accountEquityId === this.accountId) {
          level2.selectedId = this.accountId;
          level2.selectedTitle = element.formats[0].value;
        }
      });

      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  addEquities() {
    let link = [RouterHelperService.getPathFromId('equity-add-page')];
    this.router.navigate(link);
  }

  operateInversis() {
    this.callInversis('Inversis', null, null);
  }

}
