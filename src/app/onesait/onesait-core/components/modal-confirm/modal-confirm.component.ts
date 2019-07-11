import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../services/modal-service/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-modal-confirm',
  templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent implements OnInit, OnDestroy {


  @ViewChild('modal') private modal: ModalComponent;

  modalData: any;

  private subscription: Subscription;

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.modalService.showConfirmObservable.subscribe((value) => {
      this.modalData = value;
      this.modal.open();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  acceptConfirmModal() {
    this.modalService.acceptConfirmModal(this.modalData.id);
    this.modal.close();
  }

  cancelConfirmModal() {
    this.modalService.cancelConfirmModal(this.modalData.id);
    this.modal.close();
  }

}
