import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class InfoHeaderService {

  private notify = new Subject<any>();

  notifyObservable: Observable<any> = this.notify.asObservable();

  constructor() {
  }


  showInfoHeader(message?: any) {
    this.notify.next({ action: 'show', message: message, type: 'info' });
  }

  showWarningHeader(message?: any) {
    this.notify.next({ action: 'show', message: message, type: 'warning' });
  }

  showErrorHeader(message?: any) {
    this.notify.next({ action: 'show', message: message, type: 'error' });
  }


}
