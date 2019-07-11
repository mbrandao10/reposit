import { Injectable } from '@angular/core';
import { JsonUtilsService } from '../json-utils-serice/json-utils.service';
import { PagesConfiguration, PageConfiguration } from '../../models/classes/page-config';


@Injectable()
export class AppConfigService {

  private appConfig: any;
  private appCacheConfig: any;
  private pageConfig: PagesConfiguration;
  private appServerConfig: any;

  constructor(
    private jsonUtilsService: JsonUtilsService
  ) {

  }

  setConfig(config: any): void {
    this.appConfig = Object.assign({}, config);
  }

  getConfig(key?: string): any {
    if (!key) {
      return this.appConfig;
    } else {
      return this.jsonUtilsService.getValueFromDotNotation(this.appConfig, key);
    }
  }

  updateConfig(config: any) {
    this.jsonUtilsService.overwriteJSONAttributes(this.appConfig, config);
  }

  setServerConfig(serverConfig: any): void {
    this.appServerConfig = Object.assign({}, serverConfig);
  }

  getServerConfig(key?: string): any {
    if (!key) {
      return this.appServerConfig;
    } else {
      return this.jsonUtilsService.getValueFromDotNotation(this.appServerConfig, key);
    }
  }

  updateServerConfig(serverConfig: any) {
    this.jsonUtilsService.overwriteJSONAttributes(this.appServerConfig, serverConfig);
  }

  setCacheConfig(config: any): void {
    this.appCacheConfig = Object.assign({}, config);
  }

  getCacheConfig(): any {
    return this.appCacheConfig;
  }

  setPagesConfig(config: PagesConfiguration): void {
    this.pageConfig = Object.assign({}, config);
  }

  getPagesConfig(): PagesConfiguration {
    return this.pageConfig;
  }

  getPageConfig(key?: string): PageConfiguration {
    return this.pageConfig[key];
  }

}
