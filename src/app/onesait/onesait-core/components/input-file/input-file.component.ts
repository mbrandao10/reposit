import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { ModalService } from '../../services/modal-service/modal.service';


@Component({
  selector: 'osb-input-file',
  templateUrl: './input-file.component.html'
})
export class InputFileComponent implements OnInit{

  @Input() disableButton?: boolean;

  @Input() file: File = null;
  @Output() sendFile = new EventEmitter();
  @Output() fileAdded = new EventEmitter();
  @Output() fileDeleted = new EventEmitter();

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    if (this.file !== null) {
      this.fileAdded.emit(this.file);
    }
  }

  selectFile(event: any) {
    this.file = event.srcElement.files[0];
    this.fileAdded.emit(this.file);
  }

  removeFile() {
    this.modalService.showConfirmModal('ONESAIT-CORE.INPUT-FILE.REMOVE-FILE').subscribe(result => {
      if (result) {
        this.file = null;
        this.fileDeleted.emit();
      }
    });
  }

  send() {
    this.sendFile.emit(this.file);
  }
}
