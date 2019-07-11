import { Component, OnInit } from '@angular/core';
import { HeaderService, PageConfiguration, AppConfigService } from 'onesait-core';

@Component({
  selector: 'osb-sepa-page',
  templateUrl: './sepa-page.component.html'
})

export class SepaPageComponent implements OnInit {

  view: string;
  pageConfig: PageConfiguration;

  constructor(
    private headerService: HeaderService,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit() {
    this.headerService.setTitle('MENU.PAYMENTS', 'HEADER.TITLE.SEPA');
    this.pageConfig = this.appConfigService.getPageConfig('sepa-page');
  }
}
