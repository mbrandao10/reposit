import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ES_ES } from './config/langs/es_es';
import { EN_EN } from './config/langs/en_en';
import { constants, UtilsService, AppConfigService, TokenService } from 'onesait-core';
import { Router, NavigationEnd } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale, plLocale } from 'ngx-bootstrap/locale';
import * as _moment from 'moment';
const moment = _moment;
import * as _ from 'underscore';

import { config } from './config/config';
// import { CacheConfig } from './config/cache-config';
// import { PageConfig } from './config/config-pages';
// import { ServerConfig } from './config/config-server';

// import { environment } from 'itecban-environment';
import { environment } from '../environments/environment';
import { CompareModificationsService } from 'itecban-common';

const locales = [esLocale, plLocale];
locales.forEach(locale => defineLocale(locale.abbr, locale));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(translate: TranslateService,
    router: Router,
    compareModificationsService: CompareModificationsService,
    protected bsDatepickerConfig: BsDatepickerConfig,
    localeService: BsLocaleService,
    utilsService: UtilsService,
    appConfigService: AppConfigService,
    tokenService: TokenService
  ) {

    
    
    translate.setTranslation('es', ES_ES);
    translate.setTranslation('en', EN_EN);
    moment.locale('es');
    translate.use('es');
    
    localeService.use('es');
    
    this.configDatePicker();
    
    // appConfigService.setConfig(config);
    // appConfigService.setCacheConfig(CacheConfig);
    // appConfigService.setPagesConfig(PageConfig);
    // appConfigService.setServerConfig(ServerConfig);
    
     tokenService.init();
    
    if (environment && environment.config) {
      appConfigService.updateConfig(environment.config);
      if (utilsService.getItemSessionStorage(constants.APP_CONFIG)) {
        appConfigService.updateConfig(utilsService.getItemSessionStorage(constants.APP_CONFIG));
      }
    }

    if (environment && environment.serverConfig) {
      appConfigService.updateServerConfig(environment.serverConfig);
    }

    if (router) {
      router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          compareModificationsService.reset();
        }
      });
    }
  }
  configDatePicker(){
    esLocale.invalidDate = config.bsDatepicker.bsConfig.invalidDate;
    esLocale.months[0]="Enero";
    esLocale.months[1]="Febrero";
    esLocale.months[2]="Marzo";
    esLocale.months[3]="Abril";
    esLocale.months[4]="Mayo";
    esLocale.months[5]="Junio";
    esLocale.months[6]="Julio";
    esLocale.months[7]="Agosto";
    esLocale.months[8]="Septiembre";
    esLocale.months[9]="Octubre";
    esLocale.months[10]="Noviembre";
    esLocale.months[11]="Diciembre";
    defineLocale('es', esLocale);

    this.bsDatepickerConfig.dateInputFormat = config.bsDatepicker.bsConfig.dateInputFormat;
    this.bsDatepickerConfig.containerClass = config.bsDatepicker.bsConfig.containerClass;
    this.bsDatepickerConfig.adaptivePosition = config.bsDatepicker.bsConfig.adaptivePosition;
  }
}
