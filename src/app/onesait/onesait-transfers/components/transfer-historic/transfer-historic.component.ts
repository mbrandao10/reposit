import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchConfig, SEARCH_CONFIG_TYPE, AppConfigService, FormatAccountPipe, TransferService, List, DeviceUtilsService, InfoHeaderService } from 'onesait-core';
import { AccountElement, GenericIdNameElement, TransferOutput, CreditElement } from 'onesait-api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'osb-transfer-historic',
  templateUrl: './transfer-historic.component.html'
})
export class TransferHistoricComponent implements OnInit {

  protected listTransfersObservable: Subscription;
  protected listTransfers: List;

  loading: boolean;
  filterSearchForm: FormGroup;
  formConfig: SearchConfig;
  transferModes: GenericIdNameElement[];
  accountsToSelect: GenericIdNameElement[] = [];
  accountFormatView: string;
  transfers: TransferOutput[];
  selectedItem: '';
  hasMoreData: boolean;

  @Input() accounts: AccountElement[];
  @Input() credits: CreditElement[];

  constructor(
    private transferService: TransferService,
    private appConfigService: AppConfigService,
    private formatAccountPipe: FormatAccountPipe,
    private deviceUtilsService: DeviceUtilsService,
    private infoHeaderService: InfoHeaderService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit() {
    this.listTransfers = new List(this.transferService, 'get');
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.createFormControl();
    this.loadDataForm();
    // this.getAccounts();
    // this.getTransfers();
  }

  loadDataForm() {
    this.accountsToSelect.push({name: '', id: ''});
    if (this.accounts) {
      this.accounts.forEach(element => {
        this.accountsToSelect.push({
          name: this.formatAccountPipe.transform(element.formats, this.accountFormatView),
          id: element.id
        });
      });
    }
    if (this.credits && this.credits.length > 0) {
      this.credits.forEach(element => {
        this.accountsToSelect.push({
          name: this.formatAccountPipe.transform(element.formats, this.accountFormatView),
          id: element.id
        });
      });
    }
  }

  isMobileResolution(): boolean {
    return this.deviceUtilsService.isMobileResolution;
  }
  // getAccounts() {
  //   this.loading = true;
  //   this.accountService.getAccounts().subscribe(results => {
  //     this.accounts = results.data;
  //     this.loading = false;

  //     this.accounts.forEach(element => {
  //       this.accountsToSelect.push({
  //         name: this.formatAccountPipe.transform(element.formats, this.accountFormatView),
  //         id: element.id});
  //     });
  //   }, (e) => {
  //     console.log(e);
  //     this.loading = true;
  //   });
  // }

  createFormControl() {
    this.filterSearchForm = new FormGroup({
      accountId: new FormControl('', Validators.required),
      type: new FormControl('issued')
    });
    this.prepareSearch();
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonFloatRight = true;
    this.formConfig.buttonText = 'ONESAIT-TRANSFERS.HISTORIC.FILTER.SEARCH';
    this.formConfig.mobileText = 'ONESAIT-TRANSFERS.PENDING.TEXT';
    this.formConfig.mobileSearcherTitle = 'ONESAIT-TRANSFERS.PENDING.TEXT';

    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-TRANSFERS.HISTORIC.FILTER.ACCOUNT-SELECT',
        class: 'col-xs-12 col-sm-6 col-md-4',
        formControlName: 'accountId',
        elements: this.accountsToSelect,
        selectText: 'name',
        selectValue: 'id'
      } /* ,
    {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-TRANSFERS.HISTORIC.FILTER.MODE',
        class: 'col-xs-12 col-sm-3 col-md-4',
        formControlName: 'mode',
        elements: this.transferModes,
        selectText: 'name',
        selectValue: 'id'
      }*/
    ];
  }

  getTransfers() {
    this.listTransfers.reset();
    this.next();
  }

  next() {
    this.loading = true;
    let args = [this.filterSearchForm.value];
    if (args[0]) {
      args[0].mode = 'SEPA';
    }
    if (this.listTransfersObservable) {
      this.listTransfersObservable.unsubscribe();
    }
    this.listTransfersObservable = this.listTransfers.next(args).subscribe(results => {
      this.loading = false;
      this.transfers = results.data;
      if (results.paging && results.paging.hasMorePages) {
        this.hasMoreData = true;
      } else {
        this.hasMoreData = false;
      }
    }, (e) => {
      this.transfers = undefined;
      this.loading = false;
      console.log(e);
    });

  }

  viewDetail(transfer) {
    if (this.selectedItem === transfer.id) {
      this.selectedItem = '';
    } else {
      this.selectedItem = transfer.id;
    }
  }

  close(): void {
    this.selectedItem = null;
  }

  deleteTansferOk() {
    this.infoHeaderService.showInfoHeader(this.translateService.instant('ONESAIT-TRANSFERS.HISTORIC.DELETE.OK'));
    this.transfers = undefined;
    this.getTransfers();
  }

}
