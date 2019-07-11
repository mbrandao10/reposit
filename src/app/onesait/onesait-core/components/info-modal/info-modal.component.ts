import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal-service/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-info-modal',
  templateUrl: './info-modal.component.html'
})
export class InfoModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  bgColor: string;
  @ViewChild('modal') private modal: ModalComponent;
  message: string;
  listMessages: string[];

  constructor(
    protected modalService: ModalService
  ) {

    this.subscription = this.modalService.showModalObservable.subscribe((value) => {
      if (value.type === 'info') {
        this.bgColor = 'bg-green-darker'
      } else if (value.type === 'error') {
        this.bgColor = 'bg-red';
      } else if (value.type === 'warning') {
        this.bgColor = 'bg-orange';
      }
      this.message = value.message;
      if(value.listMessages)
       this.listMessages =  value.listMessages;

      this.modal.open();
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
