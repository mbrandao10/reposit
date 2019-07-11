import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ModalService {

  private showConfirm = new Subject<any>();
  private showModal = new Subject<any>();
  showConfirmObservable: Observable<any> = this.showConfirm.asObservable();
  showModalObservable: Observable<any> = this.showModal.asObservable();

  private modals: any = {};

  constructor() { }

  showConfirmModal(text: string, acceptText?: string, cancelText?: string) {
    let id: number = new Date().getTime();
    this.showConfirm.next({ id: id, action: 'show', text: text, acceptText: acceptText, cancelText: cancelText });
    let showConfirmResult = new Subject<any>();
    let showConfirmResultObservable: Observable<boolean> = showConfirmResult.asObservable();
    this.modals[id] = {
      showConfirmResult: showConfirmResult,
      showConfirmResultObservable: showConfirmResultObservable
    };
    return this.modals[id].showConfirmResultObservable;
  }

  acceptConfirmModal(id: number) {
    this.modals[id].showConfirmResult.next(true);
    this.modals[id].showConfirmResult.complete();
    delete this.modals[id];
  }

  cancelConfirmModal(id: number) {
    this.modals[id].showConfirmResult.next(false);
    this.modals[id].showConfirmResult.complete();
    delete this.modals[id];
  }

  showErrorModal(errorDescription: string){
     this.showModal.next({action: 'show', type:'error', message:errorDescription});
  }

  showErrorModalList(errorDescription: string, listMessages: string[]){
    this.showModal.next({action: 'show', type:'error', message:errorDescription,listMessages: listMessages});
 }

  showInfoModal(errorDescription: string){
    this.showModal.next({action: 'show', type:'info', message:errorDescription});
 }

  showWarningModal(errorDescription: string){
  this.showModal.next({action: 'show', type:'warning', message:errorDescription});
}

}
