import { Component, OnInit } from '@angular/core';
import { HeaderService, HeaderTitleArray, AppConfigService, PageConfiguration, FactoringService, HeaderTitleElement } from 'onesait-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osb-factoring-contract-page',
  templateUrl: './factoring-contract-page.component.html'
})
export class FactoringContractPageComponent implements OnInit {
  protected paramsObservable: any;

  contractId: string;
  view: string;
  pageConfig: PageConfiguration;
  loading: boolean;

  constructor(
    private factoringService: FactoringService,
    private headerService: HeaderService,
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.paramsObservable = this.route.params.subscribe(params => {
      this.contractId = params['contractId'];
      this.setHeaderTitle();
    });

    this.pageConfig = this.appConfigService.getPageConfig('factoring-contract-page');
  }

  setHeaderTitle() {
    let level1: HeaderTitleElement;
    let level2: HeaderTitleArray;

    level1 = {
      title: 'HEADER.TITLE.FACTORING',
      routeId: 'factoring-page'
    };

    level2 = {
      selectedTitle: '',
      elements: []
    };

    this.headerService.setTitle(level1, level2);
    this.factoringService.getContracts().subscribe(result => {
      result.data.forEach(element => {
        if (element.id !== this.contractId) {
          if (element.subscriptionAccount) {
            level2.elements.push({
              title: element.subscriptionAccount.id,
              routeId: 'factoring-contract-page',
              routeParams: { contractId: element.id }
            });
          } else {
            level2.elements.push({
              title: element.productData.description,
              routeId: 'factoring-contract-page',
              routeParams: { contractId: element.id }
            });
          }
        } else {
          if (element.subscriptionAccount) {
            level2.selectedTitle = element.subscriptionAccount.id;
          } else {
            level2.selectedTitle = element.productData.description;
          }
        }
      });
    });
  }

}
