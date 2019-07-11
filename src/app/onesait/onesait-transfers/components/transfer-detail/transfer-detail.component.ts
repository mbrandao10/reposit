import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { TransferOutput } from 'onesait-api';
import { TransferService, ModalComponent } from 'onesait-core';

@Component({
  selector: 'osb-transfer-detail',
  templateUrl: './transfer-detail.component.html'
})
export class TransferDetailComponent implements OnInit {

  @Input() transfer: TransferOutput;
  @Output() deleteTansferOk = new EventEmitter();
  @ViewChild('modal') private modal: ModalComponent;
  loading: boolean;

  constructor(
    private transferService: TransferService
  ) { }

  ngOnInit() {
  }

  cancelConfirmModal() {
    this.modal.close();
  }

  openModal() {
    this.modal.open();
  }

  anulTransfer() {
    this.modal.close();
    this.loading = true;
    this.transferService.removeTransfer(this.transfer.id).subscribe(() => {
      this.loading = false;
      this.deleteTansferOk.emit();
    }, (e) => {
      console.log(e);
      this.loading = false;
    });
  }

}
