import { Component, OnInit, OnDestroy } from '@angular/core';
import { SepaService, List, SearchConfig, SEARCH_CONFIG_TYPE, UtilsService, DatesValidator, InputValidatorOptions, AccountsValidator } from 'onesait-core';
import { SepaRemittanceReturned, SepaFileType, SepaSender } from 'onesait-api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { Subscription } from 'rxjs';
const moment = _moment;

@Component({
  selector: 'osb-remittance-returned-list',
  templateUrl: './remittance-returned-list.component.html'
})
export class RemittanceReturnedListComponent implements OnInit, OnDestroy {

  protected listRemittancesReturnedObservable: Subscription;
  protected listRemittancesReturned: List;
  remittancesReturned: SepaRemittanceReturned[];

  loading: boolean;
  hasMoreData: boolean;
  fileTypes: SepaFileType[];
  formConfig: SearchConfig;
  returnsListForm: FormGroup;

  senders: SepaSender[];

  inputValidatorOptionsIni: InputValidatorOptions;
  inputValidatorOptionsEnd: InputValidatorOptions;

  constructor(private sepaService: SepaService,
    private utilsService: UtilsService) {
    this.createFormControl();
    this.createFormValidation();
    this.loading = true;
    this.listRemittancesReturned = new List(this.sepaService, 'getRemittancesReturned');
  }

  ngOnInit() {
    // this.loadFileFormats();
    this.loadSenders();
  }

  createFormControl() {
    this.returnsListForm = new FormGroup({
      // type: new FormControl(''),
      sender: new FormControl('', Validators.required),
      dateFrom: new FormControl('', [Validators.required, AccountsValidator.DateInitialValidator, DatesValidator.DateInvalidDateValidator]),
      dateTo: new FormControl('', [Validators.required, DatesValidator.DateInvalidDateValidator, AccountsValidator.DateEndValidator]),
    }, DatesValidator.groupValidationSearch('ITECBAN-ACCOUNT'));
  }

  createFormValidation() {
    this.inputValidatorOptionsIni = <InputValidatorOptions>{
      errorText: {
        INVALIDDATE: 'Fecha inicial superior a la del día'
      }
    };
    this.inputValidatorOptionsEnd = <InputValidatorOptions>{
      errorText: {
        INVALIDDATE: 'Fecha fin mayor a la del día'
      }
    };
  }

  loadSenders() {
    this.loading = true;
    this.sepaService.getSenders().subscribe(({ data }) => {
      this.senders = data;
      this.loading = false;
      this.returnsListForm.patchValue({ sender: this.senders[0].id });
      this.prepareSearch();
      //this.next();
    }, (e: any) => {
      console.error(e);
      this.prepareSearch();
      this.loading = false;
    });
  }

  loadFileFormats() {
    this.loading = true;
    this.sepaService.getFileFormats().subscribe(({ data }) => {
      this.fileTypes = data;
      this.loading = false;
      this.prepareSearch();
      this.next();
    }, (e: any) => {
      console.error(e);
      this.loading = false;
    });
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.formsControl = [
      // {
      //   type: SEARCH_CONFIG_TYPE.SELECT,
      //   label: 'ONESAIT-SEPA.REMITTANCE-LIST.FILTER-FILETYPE',
      //   class: 'col-xs-12 col-sm-4 col-md-3',
      //   formControlName: 'type',
      //   elements: this.fileTypes,
      //   selectText: 'name',
      //   selectValue: 'id'
      // },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-SEPA.REMITTANCE-RETURNED-LIST.SENDER',
        class: 'col-xs-12 col-sm-4 col-md-3',
        formControlName: 'sender',
        elements: this.senders,
        selectText: 'description',
        selectValue: 'id',
        selectPlaceHolder: 'COMMON.SELECT-OPTION',
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'ONESAIT-SEPA.REMITTANCE-RETURNED-LIST.FROM',
        class: 'col-xs-6 col-sm-4 col-md-3',
        formControlName: 'dateFrom',
        opts: this.inputValidatorOptionsIni
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'ONESAIT-SEPA.REMITTANCE-RETURNED-LIST.TO',
        class: 'col-xs-6 col-sm-4 col-md-3',
        formControlName: 'dateTo',
        maxDate: new Date(),
        opts: this.inputValidatorOptionsEnd
      },
    ];
  }

  next() {
    let args = [this.returnsListForm.value];

    if (this.listRemittancesReturnedObservable) {
      this.listRemittancesReturnedObservable.unsubscribe();
    }
    this.loading = true;
    this.listRemittancesReturnedObservable = this.listRemittancesReturned.next(args).subscribe(this.successReturned, this.errorReturned);
  }

  private successReturned = (myResult) => {
    this.loading = false;
    this.remittancesReturned = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorReturned = (error) => {
    this.loading = false;
    console.log(error);
  }

  getReturns(): void {
    this.listRemittancesReturned.reset();
    if (this.returnsListForm) {
      if (this.returnsListForm.value.dateFrom) {
        this.returnsListForm.value.dateFrom = moment(this.returnsListForm.value.dateFrom).format('YYYY-MM-DD');
      }
      if (this.returnsListForm.value.dateTo) {
        this.returnsListForm.value.dateTo = moment(this.returnsListForm.value.dateTo).format('YYYY-MM-DD');
      }
    }
    this.next();
  }


  downloadFile(remittanceReturned: SepaRemittanceReturned) {
    console.log('download', remittanceReturned);
    this.loading = true;
    this.sepaService.downloadDocument(remittanceReturned.documentId).subscribe((res) => {
      this.loading = false;
      let txtName: string = new Date().getTime().toString();
      if (!txtName.endsWith('.txt')) {
        txtName = txtName + '.txt';
      }
      console.log(res);
      this.utilsService.downloadBlob(res, txtName);
    }, e => {
      console.log(e);
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.listRemittancesReturnedObservable) {
      this.listRemittancesReturnedObservable.unsubscribe();
    }
  }

}
