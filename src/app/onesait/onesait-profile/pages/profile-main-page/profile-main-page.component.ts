import { Component, OnInit } from '@angular/core';
import { PageConfiguration, AppConfigService, HeaderService } from 'onesait-core';

@Component({
  selector: 'osb-profile-main-page',
  templateUrl: './profile-main-page.component.html'
})
export class ProfileMainPageComponent implements OnInit {

  view: string;

  pageConfig: PageConfiguration;


  constructor(
    protected appConfigService: AppConfigService,
    protected headerService: HeaderService,
  ) { }

  ngOnInit() {
    this.headerService.setTitle('HEADER.TITLE.MY-SPACE');
    this.view = 'personal-data';
    this.pageConfig = this.appConfigService.getPageConfig('profile-main-page');
  }

}
