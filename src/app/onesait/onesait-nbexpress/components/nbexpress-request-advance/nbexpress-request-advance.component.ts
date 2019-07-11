import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EBAdvance, EBAdvances } from 'onesait-api';
import { SignatureTokenService, SignatureEntity, RouterHelperService, List, SEARCH_CONFIG_TYPE, SearchConfig, NBExpressBillService } from 'onesait-core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'osb-nbexpress-request-advance',
  templateUrl: './nbexpress-request-advance.component.html'
})
export class NbExpressRequestAdvanceComponent implements OnInit {

  @Input() contractId: string;
  view: string;

  showingRecent: boolean;
  orderNum: string;
  loading: boolean;
  consulted: boolean;
  downloadObject: { key: string, value: string };

  advance: EBAdvance;
  advances: EBAdvances[];
  protected listAdvancesObservable: any;
  protected listAdvances: List;

  signatureEntity: SignatureEntity;
  message: string;

  consultOrdersForm: FormGroup;
  formConfig: SearchConfig;

  hasMoreData: boolean;

  constructor(private nbExpressBillService: NBExpressBillService,
    private signatureTokenService: SignatureTokenService,
    protected router: Router) {
    this.createFormControl();
    this.prepareSearch();
    this.listAdvances = new List(this.nbExpressBillService, 'getAdvances');
  }

  ngOnInit() {
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
    this.listAdvancesObservable = this.listAdvances.next(args).subscribe(this.successAdvances, this.errorAdvances);
  }

  private successAdvances = (myResult) => {
    this.loading = false;
    this.advances = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorAdvances = (error) => {
    this.loading = false;
    console.log(error);
  }

  resetList() {
    this.listAdvances.reset();
    this.next();
  }

  advanceOrder(orderId: string) {
    this.loading = true;
    this.nbExpressBillService.postOrderAdvance(orderId).subscribe(result => {
      this.loading = false;
      this.advance = result.data;
      this.view = 'SIMULATE';
    });
  }

  advanceOrderConfirm(orderId: string) {
    this.loading = true;
    this.nbExpressBillService.postOrderAdvanceConfirm(orderId, this.signatureEntity).subscribe(result => {
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
    switch (this.view) {
      case 'SIMULATE':
        this.view = 'SEARCH';
        break;
      case 'TOKEN':
        this.signatureEntity = null;
        this.view = 'SIMULATE';
        break;
      default:
        break;
    }
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.TEXT,
        label: 'ONESAIT-FACTORING.INVOICES.INVOICE-NUM1',
        class: 'col-xs-6 col-sm-4 col-md-4',
        formControlName: 'orderNum'
      }
    ];
  }

  tokenCompleted() {
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
