import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

  private data: any = {};
  private statatusLoansInfo: boolean;

  constructor() { }

  setLoansInfo(status: boolean) {
    this.statatusLoansInfo = status;
  }

  getLoansInfo() {
    return this.statatusLoansInfo;
  }

  setData(key: string, item: any) {
    this.data[key] = item;
  }

  getData(key: string): any {
    return this.data[key];
  }

  getDataAndClear(key: string): any {
    let value =  this.data[key];
    delete this.data[key];
    return value;
  }

  removeData(key: string) {
    delete this.data[key];
  }

  clear() {
    this.data = {};
  }

}
