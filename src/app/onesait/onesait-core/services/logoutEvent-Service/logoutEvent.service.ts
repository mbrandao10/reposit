import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class LogoutEvent {

  private logout = new Subject<any>();
  logoutObservable: Observable<any> = this.logout.asObservable();

  constructor() {
  }

  logoutEvent() {
    let milliseconds = new Date().getMilliseconds();
    this.logout.next(milliseconds);
  }

}
