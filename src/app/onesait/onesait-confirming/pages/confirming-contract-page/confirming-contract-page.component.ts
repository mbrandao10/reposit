import { Component, OnInit } from '@angular/core';
import { HeaderService, HeaderTitleArray, ConfirmingService, AppConfigService, PageConfiguration, HeaderTitleElement, DeviceUtilsService, LiteralFormats } from 'onesait-core';
import { ActivatedRoute } from '@angular/router';
import { Currency } from 'onesait-api';


@Component({
  selector: 'osb-confirming-contract-page',
  templateUrl: './confirming-contract-page.component.html'
})
export class ConfirmingContractPageComponent implements OnInit {

  protected paramsObservable: any;

  contractId: string;
  view: string;
  pageConfig: PageConfiguration;
  isMobile: boolean;
  currency: Currency;

  constructor(
    private confirmingService: ConfirmingService,
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
    this.pageConfig = this.appConfigService.getPageConfig('confirming-contract-page');
    if (this.deviceUtilsService.isMobileResolution) {
      this.pageConfig.tabs = [
        {
          name: 'ONESAIT-CONFIRMING.CONDITIONS.VIEW',
          view: 'conditions'
        }
      ];
    }
  }

  setHeaderTitle() {
    let level1: HeaderTitleElement;
    let level2: HeaderTitleArray;

    level1 = {
      title: 'HEADER.TITLE.CONFIRMING',
      routeId: 'confirming-page'
    };

    level2 = {
      selectedTitle: '',
      elements: []
    };
    this.confirmingService.getContracts().subscribe(result => {
      result.data.forEach(element => {
        console.log(element);
        if (element.id !== this.contractId) {
          level2.elements.push({
            // title: element.productData.description,
            title: element.account.formats[0].value,
            routeId: 'confirming-contract-page',
            routeParams: { id: element.id },
            fmt: LiteralFormats.IBAN //Necesario para que formatLiteral.pipe no de error
          });
        } else {
          // level2.selectedTitle = element.productData.description;
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
