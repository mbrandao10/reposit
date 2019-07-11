import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoansService, Currency } from 'itecban-common';
import { RouterHelperService, SignatureEntity, ShareService, SignatureTokenService } from 'onesait-core';
// import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoanAmort, DataLoan, AmortizeData } from 'onesait-api';


@Component({
  selector: 'osb-loan-amortize',
  templateUrl: './loan-amortize.component.html'
})
export class LoanAmortizeComponent implements OnInit, OnDestroy {

  idLoan: string;
  loading: boolean;
  currency: Currency;
  dataLoan: DataLoan;
  view = 'SIMULATION';
  loanAmort: LoanAmort;
  dataLoanJson: string;
  amortizeData: AmortizeData = {};
  loanAmortizeForm: FormGroup;
  signatureEntity: SignatureEntity;
  translateServiceGetTitle: Subscription;
  translateServiceGetsubTitle: Subscription;
  loanServicePostLoanSimulation: Subscription;
  paramsObservable: Subscription;
  // loanServicePostLoanRepayments: Subscription;

  // title = 'ITECBAN-LOANS.LOAN-AMORTIZE.SIMULATE.DETAIL.TITLE';
  // subTitle = 'ITECBAN-LOANS.LOAN-AMORTIZE.SIMULATE.DETAIL.SUB-TITLE';

  constructor(
    protected router: Router,
    private loanService: LoansService,
    private shareService: ShareService,
    private activateRoute: ActivatedRoute,
    // private translateService: TranslateService,
    private signatureTokenService: SignatureTokenService
  ) {
    this.createFormControl();
    // this.createTitle(this.title, this.subTitle); // ????????
  }

  ngOnInit(): void {
    if (this.shareService.getData('dataLoanAmortize')) {
      let dataLoanAmortize = this.shareService.getData('dataLoanAmortize');
      // this.idLoan = dataLoanAmortize.id;
      this.currency = dataLoanAmortize.currency;
    }

    this.paramsObservable = this.activateRoute.params.subscribe(params => {
      this.idLoan = params['id'];
    });

    this.loanAmort = {
      type: '',
      amount: {
        amount: 0,
        currency: this.currency
      },
      loanAccountId: this.idLoan,
      chargeAccount: ''
    };
  }

  createFormControl(): void {
    this.loanAmortizeForm = new FormGroup({
      importSel: new FormControl('', Validators.required),
      type: new FormControl('01', Validators.required)
    });
  }

  applyFormatInput() {
    if (!this.loanAmortizeForm.get('importSel').invalid) {
      let n = this.loanAmortizeForm.get('importSel').value;
      n = n.replace(/\./g, '');
      n = n.replace(/,/g, '.');
      n = + n;
      n = n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.loanAmortizeForm.get('importSel').setValue(n);
    }
  }

  simulate() {
    this.loading = true;
    this.loanAmort = this.prepareExecutionData();
    this.loanServicePostLoanSimulation = this.loanService.postLoanSimulation(this.loanAmort).subscribe(results => {
      this.amortizeData.resultsPost = results.data;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  postConfirmAmortize() {
    this.loading = true;
    this.loanService.postLoanRepayments(this.loanAmort, this.signatureEntity).subscribe(results => {
      this.amortizeData.resultsPost = results.data;
      this.view = 'AMORTIZE';
      this.loading = false;
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

  amortizeNoSimulate() {
    this.loading = true;
    this.loanAmort = this.prepareExecutionData();
    this.postConfirmAmortize();
  }

  prepareExecutionData(): LoanAmort {
    let dataExecution: LoanAmort;
    dataExecution = {
      type: this.loanAmortizeForm.get('type').value,
      amount: {
        amount: this.loanAmortizeForm.get('importSel').value.replace(/\./g, '').replace(/,/g, '.'),
        currency: this.currency
      },
      loanAccountId: this.idLoan,
      chargeAccount: ''
    };
    return dataExecution;
  }

  cleanSimulate() {
    this.amortizeData.resultsPost = undefined;
  }

  cancel(): void {
    let link = RouterHelperService.getPathFromId('loan-page', {id: this.idLoan});
    this.router.navigate([link]);
    // this.amortizationTable();
  }











  // createTitle(title: string, subTitle: string): void {
  //   this.translateServiceGetTitle = this.translateService.get(title).subscribe(result => {
  //     this.title = result;
  //   });
  //   this.translateServiceGetsubTitle = this.translateService.get(subTitle).subscribe(result => {
  //     this.subTitle = result;
  //   });
  //   this.amortizeData.title = this.title;
  //   this.amortizeData.subTitle = this.subTitle;
  // }



  // amortizeLoan(): void {
    // this.title = 'ITECBAN-LOANS.LOAN-AMORTIZE.AMORTIZE.DETAIL.TITLE';
    // this.subTitle = 'ITECBAN-LOANS.LOAN-AMORTIZE.AMORTIZE.DETAIL.SUB-TITLE';
    // this.createTitle(this.title, this.subTitle);
    // this.loanAmort = {
    //   type: '',
    //   amount: {
    //     amount: this.loanAmortizeForm.get('importSel').value.replace(/\./g, '').replace(/,/g, '.'),
    //     currency: this.currency
    //   },
    //   loanAccountId: this.idLoan,
    //   chargeAccount: ''
    // };
    // this.view = 'TOKEN';
  // }

  back() {

  }


  behind(): void {
    this.view = 'SIMULATION';
  }


  tokenCompleted(): void {
    this.postConfirmAmortize();
  }

  // A valta del servicio de links
  downloadDocument(): void {
    console.log('downloadDocument');
    let url = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '')  + window.location.pathname + 'construccion.pdf';
    window.open(url, '_blank');
  }

  amortizationTable(): void {
    let data = {
      idLoan:  this.idLoan,
      currency: {
        code: this.currency.code,
        id: this.currency.id,
      },
    };
    let dataLoanString = JSON.stringify(data);
    let link = RouterHelperService.getPathFromId('loan-page',  {dataLoan: dataLoanString});
    this.router.navigate([link]);
  }


  goToAccounts(): void {
    let link = RouterHelperService.getPathFromId('accounts-page');
    this.router.navigate([link]);
  }

  ngOnDestroy(): void {
    if (this.translateServiceGetTitle) {
      this.translateServiceGetTitle.unsubscribe();
    }

    if (this.translateServiceGetsubTitle) {
      this.translateServiceGetsubTitle.unsubscribe();
    }
    if (this.loanServicePostLoanSimulation) {
      this.loanServicePostLoanSimulation.unsubscribe();
    }
    if (this.paramsObservable) {
      this.paramsObservable.unsubscribe();
    }

    // this.shareService.removeData('dataLoanAmortize');
    // if (this.loanServicePostLoanRepayments) {
    //   this.loanServicePostLoanRepayments.unsubscribe();
    // }
  }


  // changeInput() {
  //   if ( this.loanAmortizeForm.value.importSel.length <= 0 ) {
  //     this.loanAmortizeForm.get('importSel').clearValidators();
  //     this.loanAmortizeForm.get('importSel').updateValueAndValidity();
  //   }
  // }

}
