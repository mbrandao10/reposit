import { Injectable } from '@angular/core';

@Injectable()
export class CompareModificationsService {

  comparations: any = {};

  constructor() { }

  addCompare(key: string, obj1: any, obj2: any) {
    this.comparations[key] = { obj1: obj1, obj2: obj2 };
  }

  validateComparations() {
    for (let key in this.comparations) {
      let comparation = this.comparations[key];
      let obj1String = JSON.stringify(comparation.obj1);
      let obj2String = JSON.stringify(comparation.obj2);
      if (obj1String !== obj2String) {
        return false;
      }
    }
    return true;
  }

  reset() {
    this.comparations = {};
  }

}
