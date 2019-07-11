import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SepaFile, SepaFileType, SepaRemittanceInput, SepaFileDetail } from 'onesait-api';
import { SepaService, SignatureEntity, SignatureTokenService, RouterHelperService, ModalService } from 'onesait-core';

enum VIEWS {
  SELECT_FILETYPE,
  SEND_FILE,
  CONFIRM,
  TOKEN,
  FINISH
}

@Component({
  selector: 'osb-send-remittance',
  templateUrl: './send-remittance.component.html'
})
export class SendRemittanceComponent implements OnInit {

  file: File;
  fileTypes: SepaFileType[];
  fileType: string;
  fileTypeName: string;
  sepaFile: SepaFile = {
    fileType: null,
    file: null,
  };
  sepaFileDetail: SepaFileDetail;
  signatureEntity: SignatureEntity;
  pdfUrl: string;
  loading: boolean;
  view: number;
  VIEWS = VIEWS;

  constructor(
    private sepaService: SepaService,
    private signatureTokenService: SignatureTokenService,
    private router: Router,
    protected modalService: ModalService,
    protected translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.loadFileFormats();
    this.view = VIEWS.SELECT_FILETYPE;
  }

  loadFileFormats() {
    this.loading = true;
    this.sepaService.getFileFormats().subscribe(({ data }) => {
      this.fileTypes = data;
      this.fileType = this.fileTypes[0].id;
      this.fileTypeName = this.fileTypes[0].name;
      this.loading = false;
    }, (e: any) => {
      console.error(e);
      this.loading = false;
    });
  }

  fileAdded() {
    this.view = VIEWS.SEND_FILE;
    this.fileTypeName = this.fileTypes.find(elem => elem.id === this.fileType).name;
  }

  fileDeleted() {
    this.file = null;
    this.view = VIEWS.SELECT_FILETYPE;
    this.sepaFile = {
      fileType: null,
      file: null,
    };
  }

  sendFile(file: any) {
    this.file = file;
    this.loading = true;

    let formData = new FormData();
    formData.append("fileType", this.fileType);
    formData.append("file" , file);

    this.sepaService.postFile(formData).subscribe(({ data }) => {
      this.loading = false;
      this.sepaFileDetail = data;
      this.view = VIEWS.CONFIRM;
    }, (e: any) => {
      console.error(e);
      this.loading = false;
      if(e.error &&  e.error.result && 
            e.error.result.errors && e.error.result.errors.length > 0){
          let listMessages: string[] = [];
          e.error.result.errors.forEach(element => {
              listMessages.push(element.errorDescription);
          });
          this.translateService.get('ONESAIT-SEPA.SEND-REMITTANCE.ERRORS-INFILE').subscribe((result: any) => {
            this.modalService.showErrorModalList(result,listMessages);
        });

          
      }
    });
  }

  back() {
    switch (this.view) {
      case VIEWS.FINISH:
        this.signatureEntity = null;
        break;
      case VIEWS.CONFIRM:
        this.sepaFile.file = this.file;

        this.view = VIEWS.SEND_FILE;
        delete this.sepaFileDetail;
        break;
      case VIEWS.TOKEN:
        this.signatureEntity = null;
        this.view = VIEWS.CONFIRM;
        break;
      default:
        break;
    }
  }

  cancel() {
    this.back();
    this.fileDeleted();
  }

  confirm() {
    this.finish();
  }

  finish() {
    this.loading = true;
    const sepaRemittanceInput: SepaRemittanceInput = {
      fileTypeId: this.sepaFileDetail.fileType.id,
      documentId: this.sepaFileDetail.documentId,
    };
    this.sepaService.postRemittance(sepaRemittanceInput, this.signatureEntity).subscribe(() => {
      this.loading = false;
      this.view = VIEWS.FINISH;
      this.pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    }, (e: any) => {
      this.loading = false;
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }

      if (this.signatureEntity) {
        this.view = VIEWS.TOKEN;
      }
    });
  }

  goToAccounts() {
    this.router.navigate([RouterHelperService.getPathFromId('accounts-page')]);
  }

  goToSendRemittance() {
    this.cancel();
    this.view = VIEWS.SELECT_FILETYPE;
  }
}
