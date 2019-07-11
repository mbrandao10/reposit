import { Component, OnInit } from '@angular/core';
import { PageConfiguration, AppConfigService } from 'onesait-core';


@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html'
})
export class SettingsPageComponent implements OnInit {

    view = 'change-password';
    loading = false;
    pageConfig: PageConfiguration;
    accountFormatView: any;

    constructor(private appConfigService: AppConfigService) {

    }
    ngOnInit() {
        this.pageConfig = this.appConfigService.getPageConfig('settings-page');
        this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    }

}
