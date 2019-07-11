import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SepaService, List, SearchConfig, SEARCH_CONFIG_TYPE } from 'onesait-core';
import { SepaFileType, SepaRemittanceStatusType, SepaRemittance, SepaRemittanceDetail, GenericListResponse, SepaRemittancesQueryParams } from 'onesait-api';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { Subscription } from 'rxjs';
const moment = _moment;

@Component({
  selector: 'osb-remittance-list',
  templateUrl: './remittance-list.component.html'
})
export class RemittanceListComponent implements OnInit, OnDestroy {

  fileTypes: SepaFileType[];
  statusTypes: SepaRemittanceStatusType[];
  selectedType: SepaRemittanceStatusType;

  protected listRemittancesObservable: Subscription;
  protected listRemittances: List;
  remittances: GenericListResponse<SepaRemittance>;

  loading: boolean;
  showingLastRemittances: boolean;
  remittanceListForm: FormGroup;

  viewRemittanceDetail = false;
  remittance: SepaRemittanceDetail;

  formConfig: SearchConfig;
  hasMoreData: boolean;

  queryParams: SepaRemittancesQueryParams;

  constructor(private sepaService: SepaService,
    private datePipe: DatePipe, ) {
    this.showingLastRemittances = true;
    this.loading = true;
    this.createFormControl();
    this.listRemittances = new List(this.sepaService, 'getRemittances');
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loading = true;
    this.sepaService.getFileFormats().subscribe((result: any) => {
      this.fileTypes = result.data;
      this.remittanceListForm.patchValue({ type: this.fileTypes[0].id });

      this.sepaService.getRemittanceStatusTypes(this.fileTypes[0].id).subscribe(result => {
        this.statusTypes = result.data;
        this.remittanceListForm.patchValue({ status: this.statusTypes[0].id });
        this.setRequiredItems(this.fileTypes[0].id);
        this.prepareSearch();
        if (this.remittanceListForm.valid) this.next();
        this.loading = false;
      }, (e: any) => {
        console.error(e);
        this.loading = false;
      });
    }, (e: any) => {
      console.error(e);
      this.loading = false;
    });
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-SEPA.REMITTANCE-LIST.FILTER-FILETYPE',
        class: 'col-xs-12 col-sm-4 col-md-3',
        formControlName: 'type',
        elements: this.fileTypes,
        selectText: 'name',
        selectValue: 'id',
        selectChange: true
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'ONESAIT-SEPA.REMITTANCE-LIST.FILTER-DATE',
        class: 'col-xs-6 col-sm-4 col-md-3',
        formControlName: 'dateFrom'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.TO',
        class: 'col-xs-6 col-sm-4 col-md-3',
        formControlName: 'dateTo'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-SEPA.REMITTANCE-LIST.FILTER-STATUS',
        class: 'col-xs-12 col-sm-4 col-md-3',
        formControlName: 'status',
        elements: this.statusTypes,
        selectText: 'name',
        selectValue: 'id',
      }
    ];
  }

  createFormControl() {
    this.remittanceListForm = new FormGroup({
      type: new FormControl(''),
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      status: new FormControl('')
    });
  }

  selectEventChange(event: any) {
    this.loading = true;
    this.sepaService.getRemittanceStatusTypes(event).subscribe(result => {
      this.statusTypes = result.data;
      this.formConfig.formsControl[3].elements = this.statusTypes;
      this.remittanceListForm.patchValue({ status: this.statusTypes[0].id });
      this.setRequiredItems(event);
      this.loading = false;
    }, (e: any) => {
      console.error(e);
      this.loading = false;
    });
  }

  setRequiredItems(fileTypeId: string) {
    // si es "Adeudos domiciliados" (id 19.14) tienen que ser obligatorias las fechas desde/hasta
    if (fileTypeId === "19.14") {
      this.remittanceListForm.get('dateFrom').setValidators(Validators.required);
      this.remittanceListForm.get('dateTo').setValidators(Validators.required);
    } else {
      this.remittanceListForm.get('dateFrom').clearValidators();
      this.remittanceListForm.get('dateTo').clearValidators();
    }
    this.remittanceListForm.get('dateTo').updateValueAndValidity();
    this.remittanceListForm.get('dateFrom').updateValueAndValidity();
  }

  getRemittances(): void {
    let consultRemittances = true;
    let emptyFormRemittances = false;
    this.listRemittances.reset();

    if ((!this.remittanceListForm.value.status) && (!this.remittanceListForm.value.dateFrom) && (!this.remittanceListForm.value.dateTo)) {
      emptyFormRemittances = true;
    }

    if (consultRemittances) {
      if (emptyFormRemittances) {
        this.showingLastRemittances = true;
      } else {
        this.showingLastRemittances = false;
      }
      if (this.remittanceListForm.value.dateFrom) {
        this.remittanceListForm.value.dateFrom = moment(this.remittanceListForm.value.dateFrom).format('YYYY-MM-DD');
      }
      if (this.remittanceListForm.value.dateTo) {
        this.remittanceListForm.value.dateTo = moment(this.remittanceListForm.value.dateTo).format('YYYY-MM-DD');
      }

      this.next();
    }
  }

  next() {
    this.queryParams = {
      type: this.remittanceListForm.controls.type.value,
      dateFrom: this.datePipe.transform(this.remittanceListForm.controls.dateFrom.value, 'yyyy-MM-dd'),
      dateTo: this.datePipe.transform(this.remittanceListForm.controls.dateTo.value, 'yyyy-MM-dd'),
      status: this.remittanceListForm.controls.status.value
    };

    let args = [this.queryParams];

    if (this.listRemittancesObservable) {
      this.listRemittancesObservable.unsubscribe();
    }
    this.loading = true;
    this.listRemittancesObservable = this.listRemittances.next(args).subscribe(this.successRemittances, this.errorRemittances);
  }

  private successRemittances = (myResult) => {
    this.loading = false;
    this.remittances = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorRemittances = (error) => {
    this.loading = false;
    console.log(error);
  }


  viewOrdersOfRemittance(remittance: SepaRemittance) {
    this.loading = true;
    let params = {
      type: this.remittanceListForm.value.type,
      remittanceId: remittance.id
    };

    this.sepaService.getRemittanceDetail(params).subscribe(({ data }) => {
      this.remittance = data;
      this.loading = false;
      this.viewRemittanceDetail = true;
    }, (e: any) => {
      console.error(e);
      this.loading = false;
    });
  }

  handleBack() {
    this.viewRemittanceDetail = false;
    this.remittance = null;
  }

  ngOnDestroy() {
    if (this.listRemittancesObservable) {
      this.listRemittancesObservable.unsubscribe();
    }
  }
}
