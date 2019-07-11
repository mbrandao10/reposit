import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsentsService } from 'itecban-common';
import * as _ from 'underscore';
import { ModalComponent } from 'onesait-core';


@Component({
  selector: 'osb-consents',
  templateUrl: './consents.component.html'
})
export class ConsentsComponent implements OnInit {

  @ViewChild('modal') private modal: ModalComponent;

  userId: any;
  consent: any;
  loading: boolean;
  selectedItem: any;
  anularItem: any;

  constructor(private consentsService: ConsentsService) {

  }

  ngOnInit() {

    this.loading = true;
    this.consentsService.getConsents().subscribe(result => {
      this.consent = result;
      this.loading = false;
    }, e => {
      console.error(e);
      this.loading = false;
    });
  }

  selectItem(consents: any) {
    if (consents.consent.consentId !== this.selectedItem) {
      this.selectedItem = consents.consent.consentId;
    } else {
      this.selectedItem = null;
    }
  }

  deleteConsent(item: any) {
    this.consentsService.removeConsents(item).subscribe( () => {
      this.consent = _.reject(this.consent, function (elem: any) {
          return elem.consent.consentId === item;
      });
      console.log('borrado consentimiento: ' + item);
      this.selectedItem = null;
      this.modal.close();
  });
  }

  close() {
    this.selectedItem = null;
  }

  closemModal() {
    this.modal.close();
  }

  openModal(idItem) {
    this.anularItem = idItem;
    this.modal.open();
  }


}
