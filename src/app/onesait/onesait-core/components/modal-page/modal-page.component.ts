import { Component, OnInit, ContentChild, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { ModalPageHeaderComponent } from './modal-page-header/modal-page-header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-modal-page',
  templateUrl: './modal-page.component.html'
})
export class ModalPageComponent implements OnInit, OnDestroy {
  @Input()
  isOpenModal: boolean;

  @Output() closeEvent = new EventEmitter();

  // private subscriptionBack: Subscription;
  private subscriptionClose: Subscription;

  @ContentChild(ModalPageHeaderComponent) header: ModalPageHeaderComponent;

  constructor() { }

  ngOnInit() {
    if (this.header) {
      this. subscriptionClose = this.header.closeObservable.subscribe(() => {
        this.close();
      });
    }

  }

  ngOnDestroy() {
    if (this.subscriptionClose) {
      this.subscriptionClose.unsubscribe();
    }
  }

  open() {
    this.isOpenModal = true;
  }

  close() {
    this.closeEvent.emit();
    this.isOpenModal = false;
  }

  getHeader(): ModalPageHeaderComponent {
    return this.header;
  }

}

