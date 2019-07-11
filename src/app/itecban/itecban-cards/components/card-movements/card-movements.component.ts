import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { SearchConfig, SEARCH_CONFIG_TYPE, List, DeviceUtilsService, DatesValidator } from 'onesait-core';
import { Subscription } from 'rxjs';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';

const moment = _moment;

@Component({
  selector: 'app-card-movements',
  templateUrl: './card-movements.component.html'
})
export class CardMovementsComponent implements OnInit, OnDestroy {

@Input() listCardReceived: List;
@Input() recivedCard: any;

protected listCardMovementsObservable: Subscription;
loading: boolean;
filterSearchForm: FormGroup;
extractForm: FormGroup;
cardMovements: List;
formConfig: SearchConfig;
hasMoreData: boolean;
selectedId = '';
coming: string;
normal = true;
idx = '';

  constructor(protected deviceUtilsService: DeviceUtilsService) {
    this.coming = 'cardMovements';
  }

  ngOnInit() {
    this.createFormControl();
  }

  createFormControl() {
    if ( this.normal ) {
      // Codigo Original
      this.filterSearchForm = new FormGroup({
        dateFrom: new FormControl('', [DatesValidator.DateMonthYearValidator]
        ),
       // dateTo: new FormControl('', [DatesValidator.DateEndValidator])
      }//, DatesValidator.groupValidationSearch('ITECBAN-ACCOUNT')
       );

    this.extractForm = new FormGroup({
      dateFrom: new FormControl('', Validators.required),
     // dateTo: new FormControl('', Validators.required)
    });
  } else {
      // Parte a quitar cuando el servicio se normalice
      this.filterSearchForm = new FormGroup({
        dateFrom: new FormControl('', [])
      }
      // , DatesValidator.groupValidationSearch('ITECBAN-ACCOUNT')
      );

    this.extractForm = new FormGroup({
      dateFrom: new FormControl('', Validators.required)
    });
  }
    this.prepareSearch();
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonText = 'ITECBAN-ACCOUNT.MOVEMENT.FILTER.SEARCH';
    this.formConfig.mobileText = 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.SEARCHER-TEXT';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.SEARCHER-TITLE';
    let minMode: BsDatepickerViewMode = 'month';
    if ( this.normal ) {
      // Codigo Original
      this.formConfig.formsControl = [
        {
          type: SEARCH_CONFIG_TYPE.DATE,
          label: 'COMMON.MONTH',
          class: 'col-xs-12 col-sm-4',
          formControlName: 'dateFrom',
          config:  Object.assign({}, {
            minMode : minMode,
            dateInputFormat: 'MMMM YYYY'
          }),
          maxDate: new Date()
        },
        /*{
          type: SEARCH_CONFIG_TYPE.DATE,
          label: 'COMMON.TO',
          class: 'col-xs-12 col-sm-4',
          formControlName: 'dateTo'
        }*/
      ];
    } else {
      // Parte a quitar cuando el servicio se normalice
      this.formConfig.formsControl = [
        {
          type: SEARCH_CONFIG_TYPE.MONTH,
          label: 'COMMON.FROM',
          class: 'col-xs-12 col-sm-9',
          formControlName: 'dateFrom'
        }
      ];
    }
    this.next();
  }

  next() {
    this.loading = true;
    this.listCardReceived.reset();
    let args = [];
    if ( this.normal ) {
      // Codigo Original
      if (this.filterSearchForm.value.dateFrom) {
        //this.filterSearchForm.value.dateFrom = moment(this.filterSearchForm.value.dateFrom).format('YYYYMMDD');
        this.filterSearchForm.value.dateFrom = moment(this.filterSearchForm.value.dateFrom).format('YYYYMM01');
        this.filterSearchForm.value.dateTo = moment(this.filterSearchForm.value.dateFrom).format('YYYYMM01');
      }
      /*if (this.filterSearchForm.value.dateTo) {
        this.filterSearchForm.value.dateTo = moment(this.filterSearchForm.value.dateTo).format('YYYYMMDD');
      }*/
      args = [this.recivedCard.id, this.filterSearchForm.value];
      //
    } else {
      // Parte a quitar cuando el servicio se normalice
      let m = this.filterSearchForm.value.dateFrom.substr(5, 2);
      let y = this.filterSearchForm.value.dateFrom.substr(0, 4);
      console.log(m, y);
      let params =  {month: parseInt(m, 10), year: y};
      args = [this.recivedCard.id, params];
      //
    }
    if (this.listCardMovementsObservable) {
      this.listCardMovementsObservable.unsubscribe();
    }
    
    this.listCardMovementsObservable = this.listCardReceived.next(args).subscribe(this.successMovements, this.errorMovements);
  }

  protected successMovements = (res) => {
    this.loading = false;
    this.cardMovements = res.data;
    if (res.paging && res.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  protected errorMovements = (error) => {
    this.loading = false;
    this.cardMovements = null;
    console.log(error);
  }

  viewDetail(item, i) {
    if (!this.normal) {
      if (this.selectedId === item.id) {
        this.selectedId = '';
      } else {
        this.selectedId = item.id;
      }
    } else {
      if (this.idx === i) {
        this.idx = '';
      } else {
        this.idx = i;
      }
    }

  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

  close() {
    if (!this.normal) {
      this.selectedId = null;
    } else {
      this.idx = '';
    }
  }

  ngOnDestroy(): void {
    if (this.listCardMovementsObservable) {
      this.listCardMovementsObservable.unsubscribe();
    }
  }
}
