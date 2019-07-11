import { Component, OnInit, Input } from '@angular/core';
import { TransferService, List, FormatAccountPipe, AppConfigService, DeviceUtilsService, InfoHeaderService, SignatureEntity, SignatureTokenService, CapitalizePipe } from 'onesait-core';
import { TransferPeriodicOutput, GenericListResponse, GenericIdNameElement, AccountElement, CreditElement, TransferPeriodicUpdate, SignatureData } from 'onesait-api';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchConfig, SEARCH_CONFIG_TYPE} from 'onesait-core';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'osb-transfer-scheduled',
  templateUrl: './transfer-scheduled.component.html'
})
export class TransferScheduledComponent implements OnInit {

  @Input() accounts: AccountElement[];
  @Input() credits: CreditElement[];
  transferScheduledList: TransferPeriodicOutput[];
  transferscheduledSelected: TransferPeriodicOutput;


  listScheduledSubscription: Subscription;
  listScheduled: List;
  hasMoreData: boolean;
  filterSearchForm: FormGroup;
  formConfig: SearchConfig;
  accountsToSelect: GenericIdNameElement[] = [];
  loading: boolean;
  selectedItem = '';
  view = 'LIST';
  accountFormatView: string;
  transferPeriodicUpdate: TransferPeriodicUpdate;
  signatureData: SignatureData;
  signatureEntity: SignatureEntity;
  frequencyTypes: GenericIdNameElement[];
  idDeleteSchedule: string;


  constructor(
    private transferService: TransferService,
    private formatAccountPipe: FormatAccountPipe,
    private appConfigService: AppConfigService,
    private deviceUtilsService: DeviceUtilsService,
    private infoHeaderService: InfoHeaderService,
    private translateService: TranslateService,
    protected signatureTokenService: SignatureTokenService,
    protected capitalizePipe: CapitalizePipe,
  ) { }

  ngOnInit() {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.view = 'LIST';
    this.listScheduled = new List(this.transferService, 'getPeriodics');
    this.transferService.getFrequencyTypes().subscribe((result: GenericListResponse<GenericIdNameElement>) => {
      this.frequencyTypes =  result.data;
      this.frequencyTypes.forEach( fr => {  return this.capitalizePipe.transform( fr.name ); });
      // this.frequencyTypes.unshift({name: this.capitalizePipe.transform('Puntual - Otro día'), id: '-1' });
    });
    this.createFormControl();
    this.getAccounts();
  }

  createFormControl() {
    this.filterSearchForm = new FormGroup({
      accountId: new FormControl('', Validators.required)
    });
    this.prepareSearch();
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonFloatRight = true;
    this.formConfig.buttonText = 'ONESAIT-TRANSFERS.HISTORIC.FILTER.SEARCH';
    this.formConfig.mobileText = 'ONESAIT-TRANSFERS.SCHEDULED.TEXT';
    this.formConfig.mobileSearcherTitle = 'ONESAIT-TRANSFERS.SCHEDULED.TEXT';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-TRANSFERS.HISTORIC.FILTER.ACCOUNT-SELECT',
        class: 'col-xs-12 col-sm-6 col-md-4',
        formControlName: 'accountId',
        elements: this.accountsToSelect,
        selectText: 'name',
        selectValue: 'id'
      }
    ];
  }


  getAccounts() {
    this.accountsToSelect.push({name: '', id: ''});
    if (this.accounts) {
      this.accounts.forEach(element => {
        // if (element.currency.code === '978') {
          this.accountsToSelect.push({
            name: this.formatAccountPipe.transform(element.formats, this.appConfigService.getConfig().account.viewKey),
            id: element.id
          });
        // }
      });
    }

    if (this.credits && this.credits.length > 0) {
      this.credits.forEach(element => {
        // if (element.currency.code === '978') {
          this.accountsToSelect.push({
            name: this.formatAccountPipe.transform(element.formats, this.appConfigService.getConfig().account.viewKey),
            id: element.id
          });
        // }
      });
    }

    // this.loading = true;
    // this.accountService.getAccounts().subscribe(results => {
    //   this.accounts = results.data;
    //   this.loading = false;

    //   this.accounts.forEach(element => {
    //     this.accountsToSelect.push({
    //       name: this.formatAccountPipe.transform(element.formats, this.appConfigService.getConfig().account.viewKey),
    //       id: element.id});
    //   });
    // }, (e) => {
    //   console.log(e);
    //   this.loading = true;
    // });
  }


  getTransfersScheduled() {
    this.listScheduled.reset();
    this.next();
  }

  next() {
    let args = [this.filterSearchForm.controls['accountId'].value];
    this.loading = true;

    if (this.listScheduledSubscription) {
      this.listScheduledSubscription.unsubscribe();
    }
    this.listScheduledSubscription = this.listScheduled.next([args]).subscribe(this.successBlock, this.errorBlock);
  }

  private successBlock = (myResult: GenericListResponse<TransferPeriodicOutput>) => {

    this.loading = false;
    this.transferScheduledList = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages ) {
        this.hasMoreData =  myResult.paging.hasMorePages;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorBlock = (error) => {
    this.loading = false;
    this.transferScheduledList = [];
    console.log(error);
  }

  viewDetail(transfer: TransferPeriodicOutput) {
    if (this.selectedItem === transfer.id) {
      this.selectedItem = '';
    } else {
      this.selectedItem = transfer.id;
    }
  }
  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

  close() {
    this.selectedItem = null;
  }

  cancelEdit() {
    this.signatureEntity = null;
    this.view = 'LIST';
    this.selectedItem = null;
  }

  back(action: string) {
    this.signatureEntity = null;
    if (action === 'MODIFICATION') {
      this.view = 'MODIFICATION';
      // guardamos los cambios que se habian hecho en la modificacion para que no se pisen por los datos iniciales
    } else {
      this.view = 'LIST';
    }
  }

  editTransferScheduled(transferscheduled: TransferPeriodicOutput) {
    this.transferscheduledSelected = transferscheduled;
    this.transferPeriodicUpdate = null;
    this.view = 'MODIFICATION';
  }

  deleteSchedule(id: string) {
    this.idDeleteSchedule = id;
    this.loading = true;
    this.transferService.deleteTransferPeriodic(id, this.signatureEntity).subscribe(result => {
      console.log(result);
      this.infoHeaderService.showInfoHeader(this.translateService.instant('ONESAIT-TRANSFERS.SCHEDULED.DELETE.OK'));
      this.selectedItem = '';
      this.loading = false;
      this.view = 'LIST';
      this.signatureEntity = null;
      this.getTransfersScheduled();
    }, e => {
      this.loading = false;
      if (this.signatureTokenService.requireSignature(e)) {
        this.signatureEntity = this.signatureTokenService.requireSignature(e);
      }
      if (this.signatureEntity) {
        this.view = 'TOKEN-DELETE';
      }
    });
  }

  updatePeriodic(transferPeriodicUpdate: TransferPeriodicUpdate) {
    this.transferPeriodicUpdate = transferPeriodicUpdate;
    if (!this.transferPeriodicUpdate.transferId) {
      this.transferPeriodicUpdate.transferId = this.transferscheduledSelected.id;
    }

    this.loading = true;
    this.transferService.putTransferPeriodic( transferPeriodicUpdate, this.signatureEntity).subscribe((result) => {
      this.signatureData = this.signatureTokenService.requireHolderSignature(result);
      this.loading = false;
      this.view = 'FINISH';
      this.signatureEntity = null;
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

  tokenCompleted(action: string) {
    if (action === 'MODIFICATION') {
      this.updatePeriodic(this.transferPeriodicUpdate);
    } else if (action === 'DELETE') {
      this.deleteSchedule(this.idDeleteSchedule);
    }
  }

  finish() {
    this.selectedItem = '';
    this.view = 'LIST';
    this.signatureData = null;
    this.getTransfersScheduled();
  }
}
