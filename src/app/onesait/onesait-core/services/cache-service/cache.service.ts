import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config-service/app-config.service';
import { UtilsService } from '../utils-service/utils.service';

export interface CacheObject {
  entityCache: string;
  path: string;
  data: string;
  key: string;
  TTL: number;
}

export interface CacheInterface {
  isCacheable(key: string): boolean;
  getFromCache(key: string): any;
  setToCache(cacheKey: string, key: string, obj: any): void;
  checkClearCache(key: string, method?: string);
}


@Injectable()
export class HttpCacheService implements CacheInterface {

  cacheConfig: any;

  constructor(
    private utilsService: UtilsService,
    private appConfigService: AppConfigService
  ) {
    this.cacheConfig = this.appConfigService.getCacheConfig();
   }

  isCacheable(key: string) {
    let keyNoParams = this.getPath(key);
    if (this.cacheConfig && this.cacheConfig.paths[keyNoParams]) {
      return true;
    } else {
      return false;
    }
  }

  getFromCache(key: string) {
    let result = null;
    this.getEntity(key);
    let objFromSession = this.utilsService.getItemSessionStorage(key);
    if (objFromSession) {
      result = JSON.parse(objFromSession);
      let now = new Date().getTime();
      if (result.TTL && result.TTL < now) {
        this.utilsService.removeItemSessionStorage(key);
        return null;
      }
    }
    return result;
  }

  setToCache(cacheKey: string, key: string, obj: any) {
    let cacheObj = <CacheObject>{};
    cacheObj.data = obj;
    cacheObj.key = key;
    cacheObj.path = cacheKey;
    cacheObj.entityCache = this.getEntity(cacheKey);
    if (this.cacheConfig.paths[this.getPath(cacheKey)].TTL) {
      cacheObj.TTL = new Date().getTime() + (this.cacheConfig.paths[this.getPath(cacheKey)].TTL * 1000);
    }
    this.utilsService.setItemSessionStorage(key, JSON.stringify(cacheObj));
  }

  checkClearCache(key: string, method?: string) {
    let entity = this.getEntity(key);
    if (entity && method &&  this.cacheConfig.entitiesClearCache[entity]
      && this.cacheConfig.entitiesClearCache[entity].methodsClearCache
      && this.cacheConfig.entitiesClearCache[entity].methodsClearCache.indexOf(method.toUpperCase()) >= 0 ) {
        this.removeFromSession( 'entityCache', entity);
    }
    if (entity && this.cacheConfig.entitiesClearCache[entity]
      && this.cacheConfig.entitiesClearCache[entity].specificPaths
      && this.cacheConfig.entitiesClearCache[entity].specificPaths[key]
      && this.cacheConfig.entitiesClearCache[entity].specificPaths[key].clearPaths) {
        this.cacheConfig.entitiesClearCache[entity].specificPaths[key].clearPaths.forEach((path: string) => {
          this.removeFromSession( 'path', path);
        });
    }
    if (entity && this.cacheConfig.entitiesClearCache[entity]
      && this.cacheConfig.entitiesClearCache[entity].clearRelatedEntities
      ) {
        this.cacheConfig.entitiesClearCache[entity].clearRelatedEntities.forEach((entityValue: string) => {
          this.removeFromSession( 'entityCache', entityValue);
        });
      }
  }

  clearAllCache() {
    for (let path in  this.cacheConfig.paths) {
      this.removeFromSession( 'path', path);
    }
  }

  removeFromSession(field: string, entity: string) {
    let removeKeys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      try {
        let obj = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
        if (obj[field] === entity) {
          removeKeys.push(sessionStorage.key(i));
        }
      } catch (e) {
      }
    }
    removeKeys.forEach((key: string) => {
      sessionStorage.removeItem(key);
    });
  }

  getEntity(url: string) {
    let regexString = '\\/(' + this.cacheConfig.entities.join('|') + ')[\\/$]?';
    let regex = new RegExp( regexString, 'g' );
    let tokens = url.match(regex);
    if (tokens) {
      let entity = tokens[0];
      entity = entity.replace('/', '');
      if (entity.indexOf('/') >= 0) {
        entity = entity.replace('/', '');
      }
      return entity;
    } else {
      return null;
    }
  }


  getPath(key: any) {
    // Funcion para obteher el path sin paramatros de una key
    let index = key.indexOf('?');
    let keyNoParams = '';
    if (index !== -1) {
      keyNoParams = key.substring(0, key.indexOf('?'));
    } else {
      keyNoParams = key;
    }
    return keyNoParams;
  }

}
