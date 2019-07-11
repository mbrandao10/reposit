import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { SearchConfig, SEARCH_CONFIG_TYPE, List, DeviceUtilsService, DatesValidator } from 'onesait-core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
const moment = _moment;

@Component({
  selector: 'app-card-statements',
  templateUrl: './card-statements.component.html'
})
export class CardStatementsComponent implements OnInit, OnDestroy {

@Input() listCardStatement: List;
@Input() recivedCard: any;

protected listCardStatementObservable: Subscription;
loading: boolean;
filterSearchForm: FormGroup;
extractForm: FormGroup;
cardStatements: List;
formConfig: SearchConfig;
hasMoreData: boolean;
selectedItem: string;
coming: string;

  constructor(
    protected deviceUtilsService: DeviceUtilsService,
    protected translateService: TranslateService
    ) {
    this.coming = 'cardStatements';
    }

  ngOnInit() {
    this.createFormControl();
  }

  createFormControl() {
    this.filterSearchForm = new FormGroup({
      dateFrom: new FormControl('', [DatesValidator.DateInitialValidator]),
      dateTo: new FormControl('', [DatesValidator.DateEndValidator])
    }, DatesValidator.groupValidationSearch('ITECBAN-ACCOUNT'));

    this.extractForm = new FormGroup({
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required)
    });
    this.prepareSearch();
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonText = 'ITECBAN-ACCOUNT.MOVEMENT.FILTER.SEARCH';
    this.formConfig.mobileText = 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.SEARCHER-TEXT';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-ACCOUNT.ACCOUNT.PAGE.SEARCHER-TITLE';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.FROM',
        class: 'col-xs-12 col-sm-4',
        formControlName: 'dateFrom'
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'COMMON.TO',
        class: 'col-xs-12 col-sm-4',
        formControlName: 'dateTo'
      }
    ];
    if (this.filterSearchForm.value.dateFrom) {
      this.filterSearchForm.value.dateFrom = moment(this.filterSearchForm.value.dateFrom).format('YYYYMMDD');
    }
    if (this.filterSearchForm.value.dateTo) {
      this.filterSearchForm.value.dateTo = moment(this.filterSearchForm.value.dateTo).format('YYYYMMDD');
    }
    this.next();
  }

  next() {
    this.listCardStatement.reset();
    let args = [this.recivedCard.id, this.filterSearchForm.value];
    if (this.listCardStatementObservable) {
      this.listCardStatementObservable.unsubscribe();
    }
    this.loading = true;
    this.listCardStatementObservable = this.listCardStatement.next(args).subscribe(this.successStatements, this.errorStatements);
  }

  protected successStatements = (res) => {
    this.loading = false;
    this.cardStatements = res.data;
    if (res.paging && res.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  protected errorStatements = (error) => {
    this.loading = false;
    console.log(error);
  }

  viewDetail(item) {
    if (this.selectedItem === item.reference) {
      this.selectedItem = '';
    } else {
      this.selectedItem = item.reference;
    }
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

  close() {
    this.selectedItem = null;
  }

  ngOnDestroy(): void {
    if (this.listCardStatementObservable) {
      this.listCardStatementObservable.unsubscribe();
    }
  }
}
