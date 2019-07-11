import { Component, OnInit, Input } from '@angular/core';
import { SignatureEntity, SignatureTokenService, RouterHelperService, NBExpressBillService } from 'onesait-core';
import { EBOrder, EBFileResponse} from 'onesait-api';
import { Router } from '@angular/router';

@Component({
  selector: 'osb-nbexpress-issue-orders',
  templateUrl: './nbexpress-issue-orders.component.html'
})
export class NbExpressIssueOrdersComponent implements OnInit {

  @Input() contractId: string;

  signatureEntity: SignatureEntity;
  loading: boolean;
  file: any;
  fileResponse: EBFileResponse;
  newOrderObject: EBOrder;
  modal: string;
  option = '';
  showTextFiles = false;

  view = 'INIT';

  constructor(
    private nbExpresBillService: NBExpressBillService,
    private signatureTokenService: SignatureTokenService,
    protected router: Router) { }

  ngOnInit(): void {

  }

  sendFileEvent(file: any) {
    this.file = file;
    this.sendFile();
  }

  tokenCompleted() {
    if (this.option === 'sendFile') {
      this.sendFileConfirm();
    } else if (this.option === 'issueOrder') {
      this.createIssueOrder();
    }
  }

  sendFile() {
    this.loading = true;
    this.option = 'sendFile';
    let formData = new FormData();
    formData.append('file', this.file);
    this.nbExpresBillService.postRemittances(this.contractId, formData).subscribe(result => {
      this.loading = false;
      this.fileResponse = result.data;
      if (!this.fileResponse) {
        this.fileResponse = <EBFileResponse>{};
      }
      this.fileResponse.date = new Date();
      this.view = 'CONFIRM';
    }, () => { this.loading = false; });
  }

  sendFileConfirm() {
    this.loading = true;
    this.option = 'sendFile';
    this.nbExpresBillService.postRemittancesConfirm(this.contractId, this.file.documentId, this.signatureEntity).subscribe(() => {
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


  getNewIssueOrder(newOrderObject: EBOrder) {
    this.newOrderObject = newOrderObject;
    this.createIssueOrder();
  }

  fileAdded() {
    this.showTextFiles = true;
  }

  fileDeleted(){
    this.showTextFiles = false;
  }

  createIssueOrder() {
    this.loading = true;
    this.option = 'issueOrder';
    this.nbExpresBillService.postOrders(this.newOrderObject, this.signatureEntity).subscribe(() => {
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

  goToCompatibleFiles() {
    this.modal = 'compatibleFiles';
  }

  goBackFromModal() {
    this.modal = '';
  }

  cancel() {
    this.signatureEntity = null;
    this.view = 'INIT';
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
        if (this.option === 'sendFile') {
          this.view = 'CONFIRM';
        } else {
          this.view = 'INIT';
        }
        this.option = '';
        break;
      default:
        break;
    }
  }

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }


}
