import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { HeaderTitle, HeaderTitleArray, HeaderTitleElement } from '../../models/classes/header';

@Injectable()
export class HeaderService {

  private notify = new Subject<any>();

  notifyObservable: Observable<any> = this.notify.asObservable();

  constructor() {}

  setTitle(
    level1: string | HeaderTitleElement | HeaderTitleArray,
    level2?: string | HeaderTitleElement | HeaderTitleArray,
    level3?: string | HeaderTitleElement | HeaderTitleArray
    ) {
    let headerTitle: HeaderTitle = {
      level1: level1,
      level2: level2 ? level2 : null,
      level3: level3 ? level3 : null,
    };
    this.notify.next(headerTitle);
  }

}
