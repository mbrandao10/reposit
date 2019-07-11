import { Component, OnInit } from '@angular/core';
import { HeaderService, HeaderTitleArray, AppConfigService, PageConfiguration, HeaderTitleElement, NBExpressBillService, DeviceUtilsService, LiteralFormats } from 'onesait-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osb-nbexpress-contract-page',
  templateUrl: './nbexpress-contract-page.component.html'
})
export class NbExpressContractPageComponent implements OnInit {

  protected paramsObservable: any;

  contractId: string;
  view: string;
  pageConfig: PageConfiguration;

  constructor(
    private nbExpressBillService: NBExpressBillService,
    private headerService: HeaderService,
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private deviceUtilsService: DeviceUtilsService
  ) { }

  ngOnInit() {
    this.paramsObservable = this.route.params.subscribe(params => {
      this.contractId = params['id'];
      this.setHeaderTitle();
    });
    this.pageConfig = this.appConfigService.getPageConfig('express-bill-contract-page');
    if (this.deviceUtilsService.isMobileDevice()) {
      this.pageConfig.tabs = [
        {
          name: 'ONESAIT-NB-EXPRESS.CONDITIONS.VIEW',
          view: 'conditions'
        }
      ];
    }
  }

  setHeaderTitle() {
    let level1: HeaderTitleElement;
    let level2: HeaderTitleArray;

    level1 = {
      title: 'HEADER.TITLE.EXPRESS',
      routeId: 'express-bill-page'
    };

    level2 = {
      selectedTitle: '',
      elements: []
    };

    this.nbExpressBillService.getContracts().subscribe(result => {
      result.data.forEach(element => {
        if (element.id !== this.contractId) {
          level2.elements.push({
            title: element.account.formats[0].value,
            routeId: 'express-bill-contract-page',
            routeParams: { contractId: element.id },
            fmt: LiteralFormats.IBAN //Necesario para que formatLiteral.pipe no de error
          });
        } else {
          level2.selectedTitle = element.account.formats[0].value;
          level2.fmt = LiteralFormats.IBAN;//Necesario para que formatLiteral.pipe no de error
        }
      });
    });
    this.headerService.setTitle(level1, level2);
  }

  selectOrders(opts: string) {
    this.view = opts;
  }
}
