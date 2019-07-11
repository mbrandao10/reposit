import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmingAdvance, ConfirmingAdvances} from 'onesait-api';
import {
  ConfirmingService,
  SignatureTokenService,
  SignatureEntity,
  RouterHelperService,
  List,
  SEARCH_CONFIG_TYPE,
  SearchConfig,
  HeaderService
} from 'onesait-core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'osb-confirming-request-advance',
  templateUrl: './confirming-request-advance.component.html'
})
export class ConfirmingRequestAdvanceComponent implements OnInit {
  // @Input() contractId: string;
  view: string;

  showingRecent: boolean;
  orderNum: string;
  loading: boolean;
  consulted: boolean;
  downloadObject: { key: string; value: string };

  advance: ConfirmingAdvance;
  advances: ConfirmingAdvances[];
  protected listAdvancesObservable: any;
  protected listAdvances: List;

  signatureEntity: SignatureEntity;
  message: string;

  consultOrdersForm: FormGroup;
  formConfig: SearchConfig;

  hasMoreData: boolean;

  currencySymbol = '€';

  constructor(
    private confirmingService: ConfirmingService,
    private signatureTokenService: SignatureTokenService,
    protected router: Router,
    private headerService: HeaderService
  ) {
    this.createFormControl();
    this.prepareSearch();
    this.listAdvances = new List(this.confirmingService, 'getAdvances');
  }

  ngOnInit() {
    this.headerService.setTitle('ONESAIT-CONFIRMING-SUPPLIER.VIEW');
    this.showingRecent = true;
    this.view = 'SEARCH';
    this.consulted = false;
    this.resetList();
  }

  createFormControl() {
    this.consultOrdersForm = new FormGroup({
      orderNum: new FormControl('')
    });
  }

  getOrder(): void {
    let consultInvoices = true;
    let emptyFormInvoices = false;

    if (!this.consultOrdersForm.value.orderNum) {
      if (this.showingRecent) {
        consultInvoices = false;
      }
      emptyFormInvoices = true;
    }

    if (consultInvoices) {
      if (emptyFormInvoices) {
        this.showingRecent = true;
        this.consulted = false;
      } else {
        this.showingRecent = false;
        this.consulted = true;
      }
      this.resetList();
    }
  }

  next() {
    let args = [this.consultOrdersForm.value.orderNum];
    if (this.listAdvancesObservable) {
      this.listAdvancesObservable.unsubscribe();
    }
    this.loading = true;
    this.listAdvancesObservable = this.listAdvances
      .next(args)
      .subscribe(this.successAdvances, this.errorAdvances);
  }

  private successAdvances = myResult => {
    this.loading = false;
    this.advances = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  };

  private errorAdvances = error => {
    this.loading = false;
    this.advances.length = 0;
    console.log(error);
  };

  resetList() {
    this.listAdvances.reset();
    this.next();
  }

  advanceOrder(orderId: string) {
    this.loading = true;
    this.confirmingService.postOrderAdvance(orderId).subscribe(result => {
      this.loading = false;
      this.advance = result.data;
      this.view = 'SIMULATE';
    }, e => {
      this.loading = false;
      console.log(e);
    });
  }

  advanceOrderConfirm(orderId: string) {
    this.loading = true;
    this.confirmingService.postOrderAdvanceConfirm(orderId, this.signatureEntity).subscribe(result => {
      this.loading = false;
      this.advance = result.data;
      this.view = 'ADVANCED';
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

  back() {
    this.signatureEntity = null;
    switch (this.view) {
      case 'SIMULATE':
        this.view = 'SEARCH';
        break;
      case 'TOKEN':
        this.view = 'SIMULATE';
        break;
      default:
        break;
    }
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    (this.formConfig.buttonDivClass =
      'col-xs-12 col-sm-3 col-md-3 mb-1 mt-1 pull-right'),
      (this.formConfig.formsControl = [
        {
          type: SEARCH_CONFIG_TYPE.TEXT,
          label: 'ONESAIT-CONFIRMING.REQUEST-ADVANCE.NUMBER-ORDER',
          class: 'col-xs-6 col-sm-4 col-md-4',
          formControlName: 'orderNum'
        }
      ]);
  }

  tokenCompleted() {
    // this.advanceOrder(this.advance.id, false);
    this.advanceOrderConfirm(this.advance.id);
  }

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }

  newAdvance() {
    this.signatureEntity = null;
    this.consultOrdersForm.reset();
    this.showingRecent = true;
    this.resetList();
    this.view = 'SEARCH';
  }
}
