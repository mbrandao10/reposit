import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditsService, SearchConfig, SEARCH_CONFIG_TYPE, List, UtilsService, DeviceUtilsService, InputValidatorOptions, DatesValidator } from 'onesait-core';
import { CreditMovementsCollection, GenericListResponse } from 'onesait-api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Json2PdfFieldDefinition } from 'onesait-core';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-credit-movements',
  templateUrl: './credit-movements.component.html'
})

export class CreditMovementsComponent implements OnInit, OnDestroy {

  @Input() creditId: string;
  @Input() creditDate: string;
  loading: boolean;

  protected listMovementsObservable: Subscription;
  public listMovements: List;
  hasMoreData: boolean;
  creditMovements: GenericListResponse<CreditMovementsCollection>;
  filterSearchForm: FormGroup;
  extractForm: FormGroup;
  formConfig: SearchConfig;
  selectedItem: string;

  inputValidatorOptionsIni: InputValidatorOptions;
  inputValidatorOptionsEnd: InputValidatorOptions;

  constructor(
    protected creditsService: CreditsService,
    protected route: ActivatedRoute,
    protected utilsService: UtilsService,
    protected deviceUtilsService: DeviceUtilsService
  ) { }

  ngOnInit() {
    this.createFormControl();
    this.listMovements = new List(this.creditsService, 'getMovements');
    this.loading = true;
    this.prepareSearch();
    this.getMovements();
  }

  getMovements() {
    this.listMovements.reset();
    if (this.filterSearchForm.value.dateFrom) {
      this.filterSearchForm.value.dateFrom = moment(this.filterSearchForm.value.dateFrom).format('YYYYMMDD');
    }
    if (this.filterSearchForm.value.dateTo) {
      this.filterSearchForm.value.dateTo = moment(this.filterSearchForm.value.dateTo).format('YYYYMMDD');
    }
    this.next();
  }

  next() {
    let args = [this.creditId, this.filterSearchForm.value];
    if (this.listMovementsObservable) {
      this.listMovementsObservable.unsubscribe();
    }
    this.loading = true;
    this.listMovementsObservable = this.listMovements.next(args).subscribe(this.successMovements, this.errorMovements);
  }

  private successMovements = (myResult) => {
    this.loading = false;
    this.creditMovements = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorMovements = (error) => {
    this.loading = false;
    console.log(error);
  }

  createFormControl() {

    this.inputValidatorOptionsIni = <InputValidatorOptions>{
      errorText: {
        INVALIDDATE: 'ITECBAN-CREDITS.FORMGROUP-VALIDATOR.INVALIDATEFORDATE'
      }
    };
    this.inputValidatorOptionsEnd = <InputValidatorOptions>{
      errorText: {
        INVALIDDATE: 'ITECBAN-CREDITS.FORMGROUP-VALIDATOR.INVALIDAENDTODATE'
      }
    };

    //let creationDate = Number(moment(this.creditDate).format('YYYYMMDD'));
    //, DatesValidator.CreationDateValidator(creationDate)
    this.filterSearchForm = new FormGroup({
      dateFrom: new FormControl('', [DatesValidator.DateInitialValidator]),
      dateTo: new FormControl('', [DatesValidator.DateEndValidator])
    }, [DatesValidator.groupValidationSearch('ITECBAN-CREDITS')]);

    this.extractForm = new FormGroup({
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required)
    });
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();

    this.formConfig.mobileText = 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.SEARCH.SEARCHER-TEXT';
    this.formConfig.mobileSearcherTitle = 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.SEARCH.SEARCHER-TITLE';
    this.formConfig.buttonText = 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.SEARCH.BUTTON-CONSULT';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.SEARCH.SINCE',
        class: 'col-xs-12 col-sm-4',
        formControlName: 'dateFrom',
        opts: this.inputValidatorOptionsIni
      },
      {
        type: SEARCH_CONFIG_TYPE.DATE,
        label: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.SEARCH.UNTIL',
        class: 'col-xs-12 col-sm-4',
        formControlName: 'dateTo',
        opts: this.inputValidatorOptionsEnd
      }
    ];
  }

  viewDetail(creditMovement) {
    if (this.selectedItem === creditMovement.id) {
      this.selectedItem = '';
    } else {
      this.selectedItem = creditMovement.id;
    }
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }


  downloadExcel() {
    // const cCode = (this.creditMovements[0].amount.currency.code);
    let movementsFieldDef: Json2PdfFieldDefinition[] = [
      {
        field: 'arrow',
        fieldTranslateKey: '',
        fieldType: {
          type: 'string'
        }
      },
      {
        field: 'operationDate',
        fieldTranslateKey: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.MOVEMENTS-FIELD-DEF.OPERATION-DATE',
        fieldType: {
          type: 'date'
        }
      },
      {
        field: 'valueDate',
        fieldTranslateKey: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.MOVEMENTS-FIELD-DEF.VALUEDATE',
        fieldType: {
          type: 'date'
        }
      },
      {
        field: 'reason',
        fieldTranslateKey: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.MOVEMENTS-FIELD-DEF.CONCEPT',
        fieldType: {
          type: 'string'
        }
      },
      {
        field: 'amount.amount',
        fieldTranslateKey: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.MOVEMENTS-FIELD-DEF.AMOUNT',
        fieldType: {
          type: 'amount'
          // currencyCode: cCode
        }
      },
      {
        field: 'balance.amount',
        fieldTranslateKey: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.MOVEMENTS-FIELD-DEF.BALANCE',
        fieldType: {
          type: 'amount'
          // currencyCode: cCode
        }
      },
      {
        field: 'amount.currency.code',
        fieldTranslateKey: 'ITECBAN-CREDITS.CREDIT-MOVEMENTS.MOVEMENTS-FIELD-DEF.CURRENCY',
        fieldType: {
          type: 'currencyOnly'
        }
      }
    ];


    // Primer parametro => lista de datos a exportar
    // Segundo parametro => columnas a crear (con literales, origen de datos, formato del dato)
    // Tercer parametro => nombre con el que se descarga el documento
    this.utilsService.downloadJsonTo2Csv(
      this.creditMovements,
      movementsFieldDef,
      this.creditId
    );
  }

  close() {
    this.selectedItem = null;
  }

  ngOnDestroy() {
    if (this.listMovementsObservable) {
      this.listMovementsObservable.unsubscribe();
    }
  }

}
