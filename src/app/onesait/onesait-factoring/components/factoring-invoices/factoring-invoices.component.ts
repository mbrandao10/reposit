import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FactoringInvoice, FactoringSimulation, FactoringInvoiceType, FactoringContract } from 'onesait-api';
import { List, FactoringService, SignatureEntity, SignatureTokenService, RouterHelperService, SearchConfig, SEARCH_CONFIG_TYPE } from 'onesait-core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'osb-factoring-invoices',
  templateUrl: './factoring-invoices.component.html'
})
export class FactoringInvoicesComponent implements OnChanges {

  @Input() contractId: string;

  view: string;

  signatureEntity: SignatureEntity;

  protected listInvoicesObservable: any;
  protected listInvoices: List;
  invoices: FactoringInvoice[];
  invoice: FactoringInvoice;

  simulation: FactoringSimulation;
  contract: FactoringContract;

  selectedId: string;
  selectedItem: FactoringInvoice;
  showDetail: boolean;

  loading: boolean;
  showingLastInvoices: boolean;
  consultInvoicesForm: FormGroup;
  invoiceStatus: FactoringInvoiceType[];

  formConfig: SearchConfig;

  hasMoreData: boolean;

  constructor(private factoringService: FactoringService,
    private signatureTokenService: SignatureTokenService,
    protected router: Router) {
    this.showingLastInvoices = true;
    this.createFormControl();
    this.listInvoices = new List(this.factoringService, 'getInvoices');
    this.loading = true;
    this.factoringService.getInvoiceStatusTypes().subscribe(result => {
      this.loading = false;
      this.invoiceStatus = result.data;
      this.prepareSearch();
    }, () => this.loading = false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contractId) {
      this.newAdvance();
      this.getContract();
    }
  }

  getContract() {
    this.loading = true;
    this.factoringService.getContract(this.contractId).subscribe(result => {
      this.contract = result.data;
      this.loading = false;
    }, () => { this.loading = false; });
  }

  createFormControl() {
    this.consultInvoicesForm = new FormGroup({
      invoiceNum: new FormControl(''),
      amountFrom: new FormControl(''),
      amountTo: new FormControl(''),
      debtor: new FormControl(''),
      status: new FormControl('')
    });
  }

  prepareSearch() {
    this.formConfig = new SearchConfig();
    this.formConfig.buttonDivClass = 'hidden-md col-xs-12 col-sm-3 mb-1 mt-1';
    this.formConfig.formsControl = [
      {
        type: SEARCH_CONFIG_TYPE.TEXT,
        label: 'ONESAIT-FACTORING.INVOICES.INVOICE-NUM1',
        class: 'col-xs-5 col-sm-4 col-md-3',
        formControlName: 'invoiceNum'
      },
      {
        type: SEARCH_CONFIG_TYPE.NUMBER,
        label: 'ONESAIT-FACTORING.INVOICES.FROM',
        class: 'col-xs-3 col-sm-4 col-md-2',
        formControlName: 'amountFrom'
      },
      {
        type: SEARCH_CONFIG_TYPE.NUMBER,
        label: 'ONESAIT-FACTORING.INVOICES.TO',
        class: 'col-xs-3 col-sm-4 col-md-2',
        formControlName: 'amountTo'
      },
      {
        type: SEARCH_CONFIG_TYPE.TEXT,
        label: 'ONESAIT-FACTORING.INVOICES.DEBTOR',
        class: 'col-xs-6 col-sm-4 col-md-2',
        formControlName: 'debtor'
      },
      {
        type: SEARCH_CONFIG_TYPE.SELECT,
        label: 'ONESAIT-FACTORING.INVOICES.STATUS',
        class: 'col-xs-6 col-sm-4 col-md-3',
        formControlName: 'status',
        elements: this.invoiceStatus,
        selectText: 'name',
        selectValue: 'id'
      }
    ];
  }

  next() {
    let args = [this.contractId, this.consultInvoicesForm.value];

    if (this.listInvoicesObservable) {
      this.listInvoicesObservable.unsubscribe();
    }
    this.loading = true;
    this.listInvoicesObservable = this.listInvoices.next(args).subscribe(this.successInvoices, this.errorInvoices);
  }

  private successInvoices = (myResult) => {
    this.loading = false;
    this.invoices = myResult.data;
    if (myResult.paging && myResult.paging.hasMorePages) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  private errorInvoices = (error) => {
    this.loading = false;
    console.log(error);
  }

  resetList() {
    this.listInvoices.reset();
    this.next();
  }

  consultInvoices(): void {
    let consultInvoices = true;
    let emptyFormInvoices = false;

    if ((!this.consultInvoicesForm.value.invoiceNum) && (!this.consultInvoicesForm.value.amountFrom || this.consultInvoicesForm.value.amountFrom == null)
      && (!this.consultInvoicesForm.value.amountTo || this.consultInvoicesForm.value.amountTo == null) && (!this.consultInvoicesForm.value.debtor) &&
      (!this.consultInvoicesForm.value.status)) {
      if (this.showingLastInvoices) {
        consultInvoices = false;
      }
      emptyFormInvoices = true;
    }

    if (consultInvoices) {
      if (emptyFormInvoices) {
        this.showingLastInvoices = true;
      } else {
        this.showingLastInvoices = false;
      }
      this.resetList();
    }
  }

  selectItem(invoiceId: string) {
    this.showDetail = true;
    if (this.selectedId === invoiceId) {
      this.selectedId = null;
    } else {
      this.selectedId = invoiceId;
      this.factoringService.getInvoice(this.contractId, invoiceId).subscribe(result => {
        this.loading = false;
        this.selectedItem = result.data;
      }, () => this.loading = false);
    }
  }


  requestAdvance(invoiceId: string): void {
    this.view = 'SIMULATE';
    let observableData: any = [];
    observableData.push(this.factoringService.getInvoice(this.contractId, invoiceId));
    observableData.push(this.factoringService.postInvoiceSimulation(this.contractId, invoiceId));

    this.loading = true;
    forkJoin(observableData).subscribe((result: any) => {
      this.invoice = result[0]['data'];
      this.simulation = result[1]['data'];
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  advanceInvoice(invoiceId: string): void {
    this.loading = true;
    this.factoringService.postInvoiceAdvance(this.contractId, invoiceId, this.signatureEntity).subscribe(() => {
      this.loading = false;
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

  cancel() {
    this.newAdvance();
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

  goToAccounts() {
    let link = [RouterHelperService.getPathFromId('accounts-page')];
    this.router.navigate(link);
  }

  newAdvance() {
    this.signatureEntity = null;
    this.selectedId = null;
    this.consultInvoicesForm.reset();
    this.showingLastInvoices = true;
    this.resetList();
    this.view = 'SEARCH';
  }

  receiveShowDetail(show: boolean): void {
    this.showDetail = show;
    this.selectedId = null;
  }


}
