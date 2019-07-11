import { Component, OnInit, Input } from '@angular/core';
import { SignatureEntity, FactoringService, SignatureTokenService, RouterHelperService } from 'onesait-core';
import { FactoringFileResponse } from 'onesait-api';
import { Router } from '@angular/router';


@Component({
  selector: 'osb-factoring-upload-invoice',
  templateUrl: './factoring-upload-invoice.component.html'
})
export class FactoringUploadInvoiceComponent implements OnInit {
  @Input() contractId: string;

  signatureEntity: SignatureEntity;
  loading: boolean;
  file: any;
  fileResponse: FactoringFileResponse;
  modal: string;
  view = 'INIT';

  constructor(private factoringService: FactoringService,
    private signatureTokenService: SignatureTokenService,
    protected router: Router) { }

  ngOnInit() {
  }

  sendFileEvent(file: any) {
    this.file = file;
    this.sendFile();
  }

  sendFile() {
    this.loading = true;
    let formData = new FormData();
    formData.append('file', this.file);
    this.factoringService.postInvoiceFile(this.contractId, formData).subscribe(result => {
      this.loading = false;
      this.fileResponse = result.data;
      this.fileResponse.date = new Date();
      this.view = 'CONFIRM';
    }, () => {
      this.loading = false;
    });
  }

  sendFileConfirm() {
    this.loading = true;
    this.factoringService.postInvoiceFileConfirm(this.contractId, this.file.documentId, this.signatureEntity).subscribe(() => {
      this.loading = false;
      this.view = 'FINISH';
    }, e => {
      this.loading = false;
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }

      if (this.signatureEntity) {
        this.view = 'TOKEN';
      }
    });
  }

  goToCompatibleFiles(): void {
    this.modal = 'compatibleFiles';
  }

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }

  tokenCompleted() {
    this.sendFileConfirm();
  }

  back() {
    switch (this.view) {
      case 'FINISH':
        this.signatureEntity = null;
        this.view = 'INIT';
        break;
      case 'CONFIRM':
        this.view = 'INIT';
        break;
      case 'TOKEN':
        this.signatureEntity = null;
        this.view = 'CONFIRM';
        break;
      default:
        break;
    }
  }

  cancel() {
    this.signatureEntity = null;
    this.view = 'INIT';
  }

  goBackFromModal() {
    this.modal = '';
  }

}
