import { Injectable } from '@angular/core';
import { UserSessionService } from '../user-session-service/user-session.service';
import { Pageable } from '../../models/classes/Pageable';
import { HttpCacheService } from '../cache-service/cache.service';
import { map, catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';

import * as _ from 'underscore';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpManagerService } from '../http-manager-service/http-manager.service';
import { constants } from '../../config/constants';
import { AppConfigService } from '../app-config-service/app-config.service';


/*
 *opts:any, accepts attrs
 id:@id, this will take the attr like path param, and remove it from the object sended
 disableErrors: boolean, used to disable the request errors,
 strParam: specific when you want send a string in the body of the request
 */
export interface RequestServiceOptions {
  headers?: any;
  disableErrors?: boolean;
  disableError401?: boolean;
  strParam?: string;
  [propName: string]: any;
}

@Injectable()
export class RequestService {

  commonHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private sessionService: UserSessionService,
    private cacheService: HttpCacheService,
    private httpManagerService: HttpManagerService,
    private appConfigService: AppConfigService
  ) {
    this.commonHeaders = new HttpHeaders();
    this.commonHeaders = this.commonHeaders.set('Accept-Language', 'es-ES')
      .set(constants.CHANNEL_KEY, this.appConfigService.getConfig('CHANNEL_KEY'))
      .set(constants.APPLICATION_ID, this.appConfigService.getConfig('APPLICATION_ID'));
  }

  setHeader(key: string, value: string) {
    this.commonHeaders = this.commonHeaders.set(key, value);
  }

  deleteHeader(key: string) {
    this.commonHeaders = this.commonHeaders.delete(key);
  }

  getHeader(key: string) {
    return this.commonHeaders.get(key);
  }

  getHeaders(options?: RequestServiceOptions): HttpHeaders {
    if (this.sessionService.getActiveProfile()) {
      this.setHeader(constants.USER_PROFILE_ID, this.sessionService.getActiveProfile());
    }else{
      this.deleteHeader(constants.USER_PROFILE_ID);
    }

    if (options && options.headers) {
      let headers = new HttpHeaders();
      let me = this;
      this.commonHeaders.keys().forEach(function (key: string) {
        headers = headers.set(key, me.commonHeaders.get(key));
      });
      for (let key in options.headers) {
        headers = headers.set(key, options.headers[key]);
      }
      return headers;
    } else {
      return this.commonHeaders;
    }
  }

  buildPathParams(url: string, params: any, options?: any, deleteAttrs?: boolean) {
    // search the regex :id, :field, ...
    let regex = new RegExp(/\/:[^\/]*/g, 'g');
    let tokens = url.match(regex);
    if (tokens && tokens.length > 0) {
      for (let i = 0; i <= tokens.length - 1; i++) {
        let token = tokens[i];
        token = token.replace('/', '');
        let key = token.replace(':', '');
        if (params[key]) {
          url = url.replace(token, params[key]);
          if (deleteAttrs || (options && options[key] === '@' + key)) {
            delete params[key];
            if (_.keys(params).length === 0) {
              params = null;
            }
          }
        }
      }
    }
    return url;
  }

  buildQueryParams(url: string, params: any) {
    url = this.buildPathParams(url, params, null, true);

    let queryParams = '';
    for (let param in params) {
      if (params[param]) {
        if (params[param].constructor === Array) {
          params[param].forEach(function (value: any) {
            queryParams += ('&' + param + '=' + value);
          });
        } else {
          queryParams += ('&' + param + '=' + params[param]);
        }
      }
    }
    if (queryParams.length > 0) {
      if (queryParams.startsWith('&')) {
        queryParams = queryParams.replace('&', '');
      }
      if (url.indexOf('?') !== -1) {
        url += queryParams;
      } else {
        url += '?' + queryParams;
      }
    }
    return url;
  }

  get(url: string, params?: any, opts?: RequestServiceOptions, pageable?: Pageable): Observable<any> {
    if (pageable && pageable.nextPaginationKey) {
      if (params) {
        params.paginationKey = pageable.nextPaginationKey;
      } else {
        params = {
          paginationKey: pageable.nextPaginationKey
        };
      }
    }
    let urlFinal = this.buildQueryParams(url, params);
    this.sessionService.refreshFinishSessionTimeout();
    if (this.cacheService.isCacheable(url) && this.cacheService.getFromCache(urlFinal)) {
      return of(this.cacheService.getFromCache(urlFinal).data);
    } else {
      return this.http.get(urlFinal, { headers: this.getHeaders(opts) })
        .pipe(map(res => {
          if (this.cacheService.isCacheable(url)) {
            this.cacheService.setToCache(url, urlFinal, res);
          }
          return res;
        }))
        .pipe(catchError((error: HttpErrorResponse) => {
          this.manageError(error, opts);
          return throwError(error);
        }));
    }
  }

  getBlob(url: string, params?: any, opts?: RequestServiceOptions): Observable<any> {
    url = this.buildQueryParams(url, params);
    this.sessionService.refreshFinishSessionTimeout();
    return this.http.get(url, { responseType: 'blob', headers: this.getHeaders(opts) })
      .pipe(map(res => res))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.manageError(error, opts);
        return throwError(error);
      }));
  }

  postBlob(url: string, params?: any, opts?: RequestServiceOptions): Observable<any> {
    this.sessionService.refreshFinishSessionTimeout();
    return this.http.post(url, params, { responseType: 'blob', headers: this.getHeaders(opts) })
      .pipe(map(res => res))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.manageError(error, opts);
        return throwError(error);
      }));
  }

  put(url: string, params: any, opts?: RequestServiceOptions): Observable<any> {
    let urlFinal = this.buildPathParams(url, params, opts);
    if (opts && opts.strParam) {
      params = params[opts.strParam];
    }
    this.sessionService.refreshFinishSessionTimeout();
    return this.http.put(urlFinal, params, { headers: this.getHeaders(opts) })
      .pipe(map(res => {
        this.cacheService.checkClearCache(url, 'PUT');
        return res;
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.manageError(error, opts);
        return throwError(error);
      }));
  }

  post(url: string, params: any, opts?: RequestServiceOptions): Observable<any> {
    url = this.buildPathParams(url, params, opts);
    if (opts && opts.strParam) {
      params = params[opts.strParam];
    }
    this.sessionService.refreshFinishSessionTimeout();
    return this.http.post(url, params, { headers: this.getHeaders(opts) })
      .pipe(map(res => {
        this.cacheService.checkClearCache(url, 'POST');
        return res;
      })).pipe(catchError((error: HttpErrorResponse) => {
        this.manageError(error, opts);
        return throwError(error);
      }));
  }

  delete(url: string, params: any, opts?: RequestServiceOptions): Observable<any> {
    url = this.buildQueryParams(url, params);
    this.sessionService.refreshFinishSessionTimeout();
    return this.http.delete(url, { headers: this.getHeaders(opts) })
      .pipe(map(res => {
        this.cacheService.checkClearCache(url, 'DELETE');
        return res;
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.manageError(error, opts);
        return throwError(error);
      }));
  }


  deleteWithBody(url: string, params: any, headers?: any, opts?: RequestServiceOptions): Observable<any> {
    url = this.buildPathParams(url, params, opts);
    if (opts && opts.strParam) {
      params = params[opts.strParam];
    }
    this.sessionService.refreshFinishSessionTimeout();
    return this.http.request('delete', url, { headers: this.getHeaders(headers), body: params })
      .pipe(map(res => {
        this.cacheService.checkClearCache(url, 'DELETE');
        return res;
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.manageError(error, opts);
        return throwError(error);
      }));
  }

  manageError(error: HttpErrorResponse, reqOptions?: RequestServiceOptions) {
    let body = error.error;
    switch (error.status) {
      case 401:
        // Otro usuario a iniciado sesion con la misma cuenta
        // if (this.httpManager && ((reqOptions && !reqOptions.disableErrors) || !reqOptions )){
        if (body && body.error) {
          let errorDescription = body.error;
          this.httpManagerService.launchSession(errorDescription);
        } else if (body && body.result.errors.length > 0 && body.result.errors[0].errorType === 'T') {
          let errorDescription = body.result.errors[0].errorDescription;
          this.httpManagerService.launchSession(errorDescription);
        }
        // }
        break;
      case 403:
        if ((reqOptions && !reqOptions.disableError401) || !reqOptions) {
          this.httpManagerService.launch40x(error);
        }
        break;
      case 400:
        if ((reqOptions && !reqOptions.disableErrors) || !reqOptions) {
          if (body && body.result.errors.length > 0
            && body.result.errors[0].errorCode !== this.appConfigService.getConfig('signature.responseErrorCode')
          ) {
            this.httpManagerService.launch40x(error);
          }

        }
        break;
      case 404:
        if ((reqOptions && !reqOptions.disableErrors) || !reqOptions) {
          this.httpManagerService.launch40x(error);
        }
        break;
      case 500:
        if ((reqOptions && !reqOptions.disableErrors) || !reqOptions) {
          if (body && body.result.errors.length > 0 && body.result.errors[0].errorType === 'X') {
            this.httpManagerService.launch40x(error);
          } else {
            this.httpManagerService.launch500();
          }

        }
        break;

      default:
    }
    return throwError(error.message);

  }

}
