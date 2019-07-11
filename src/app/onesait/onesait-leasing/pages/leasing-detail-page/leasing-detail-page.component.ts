import { Component, OnInit } from '@angular/core';
import { HeaderService, HeaderTitleArray, AppConfigService, PageConfiguration, LeasingService, HeaderTitleElement } from 'onesait-core';
import { ActivatedRoute } from '@angular/router';
import { LeasingContract } from 'onesait-api';

@Component({
  selector: 'osb-leasing-detail-page',
  templateUrl: './leasing-detail-page.component.html'
})
export class LeasingDetailPageComponent implements OnInit {

  protected paramsObservable: any;

  loading: boolean;
  contractId: string;
  contract: LeasingContract;
  view: string;
  pageConfig: PageConfiguration;

  constructor(
    private leasingService: LeasingService,
    private headerService: HeaderService,
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.paramsObservable = this.route.params.subscribe(params => {
      this.contractId = params['contractId'];
      this.setHeaderTitle();
      this.resetPage();
    });

    this.pageConfig = this.appConfigService.getPageConfig('leasing-detail-page');
    this.getContract();
  }

  resetPage() {
    this.view = 'amortization-table';
  }

  setHeaderTitle() {
    let level1: HeaderTitleElement;
    let level2: HeaderTitleArray;

    level1 = {
      title: 'HEADER.TITLE.LEASING',
      routeId: 'leasing-page'
    };

    level2 = {
      selectedTitle: '',
      elements: []
    };

    this.headerService.setTitle(level1, level2);
    this.leasingService.getContracts().subscribe(result => {
      result.data.forEach(element => {
        if (element.id !== this.contractId) {
          level2.elements.push({
             title: (element.productData)?element.productData.description:"",
             routeId: 'leasing-detail-page',
             routeParams: {contractId: element.id}
          });
        } else {
          level2.selectedTitle = (element.productData)?element.productData.description:"";
        }
      });
    });
  }

  selectOrders(opts: string) {
    this.view = opts;
  }

  getContract() {
    this.loading = true;
    this.leasingService.getContract(this.contractId).subscribe(result => {
      this.loading = false;
      this.contract = result.data;
    }, () => {
      this.loading = false;
    });
  }
}
