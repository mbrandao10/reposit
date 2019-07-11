import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'osb-modal-page-header',
  templateUrl: './modal-page-header.component.html'
})
export class ModalPageHeaderComponent  implements OnInit {

  /*@Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() back: EventEmitter<any> = new EventEmitter<any>();*/
  @Input()
  backVisible: boolean;

  @Input()
  title: string;

  private backEvent = new Subject<any>();
  backObservable: Observable<any> = this.backEvent.asObservable();

  private closeEvent = new Subject<any>();
  closeObservable: Observable<any> = this.closeEvent.asObservable();


  ngOnInit(): void {

  }

  closeModal() {
    this.closeEvent.next();
  }

  backModal() {
    this.backEvent.next();
  }

  setBackVisible(visible: boolean) {
    this.backVisible = visible;
  }

  setTitle(title: string) {
    this.title = title;
  }

  visibleBack() {
    return this.backVisible;
  }

}
