import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalPageComponent } from 'onesait-core';
import { TransferState } from 'onesait-api';

@Component({
  selector: 'osb-transfer-header',
  templateUrl: './transfer-header.component.html'
})
export class TransferHeaderComponent  implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() back: EventEmitter<any> = new EventEmitter<any>();

  @Input() transferState: TransferState;
  @Input() modal: ModalPageComponent;

  counter = Array;

  ngOnInit(): void {

  }

  backModal() {
    this.back.emit();
  }

  closeModal() {
    this.close.emit();
  }

}
