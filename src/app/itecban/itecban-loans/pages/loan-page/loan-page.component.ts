import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoansService, Loan, Currency } from 'itecban-common';
import { ShareService, PageConfiguration, AppConfigService, RouterHelperService, HeaderService, DeviceUtilsService, HeaderTitleArray, HeaderTitleElement, FormatAccountPipe, LiteralFormats } from 'onesait-core';
import { Subscription } from 'rxjs';
import { DataLoan } from 'onesait-api';

@Component({
  selector: 'osb-loan-page',
  templateUrl: './loan-page.component.html'
})
export class LoanPageComponent implements OnInit, OnDestroy {

  idLoan: string;
  loading: boolean;
  loanDetail: Loan;
  currency: Currency;
  dataLoan: DataLoan;
  dataLoanJson: string;
  level2: HeaderTitleArray;
  accountFormatView: string;
  level1: HeaderTitleElement;
  ismobileResolution: boolean;
  view = 'amortizationsTable';
  pageConfig: PageConfiguration;
  paramsObservable: Subscription;
  loanServiceSubscription: Subscription;
  loanServiceeSubscription: Subscription;
  deviceUtilsServiceSubscription: Subscription;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    private loanService: LoansService,
    private shareService: ShareService,
    private headerService: HeaderService,
    private appConfigService: AppConfigService,
    private formatAccountPipe: FormatAccountPipe,
    protected deviceUtilsService: DeviceUtilsService,
  ) {
    this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
  }

  ngOnInit(): void {
    this.pageConfig = this.appConfigService.getPageConfig('loan-page');

    this.paramsObservable = this.route.params.subscribe(params => {
      this.idLoan = params['id'];
      if (this.shareService.getData('dataLoanString')) {
        let dataLoanString = this.shareService.getData('dataLoanString');
        this.currency = dataLoanString.currency;
        this.shareService.removeData('dataLoanString');
        // this.getLoan(this.idLoan);
      }
    });
  }

  getLoan(idLoan): void {
    this.loading = true;
    this.loanServiceeSubscription = this.loanService.getLoanDetail(idLoan).subscribe(result => {
      this.loanDetail = result.data;
      this.setHeaderTitle();
      this.loading = false;
    }, e => {
      this.loading = false;
      console.log(e);
    });
  }

  loanAmortize(): void {
    let dataLoanAmortize = {
      id: this.idLoan,
      currency: {
        code: this.currency.code,
        id: this.currency.id,
      },
    };
    this.shareService.setData('dataLoanAmortize', dataLoanAmortize);
    let link = RouterHelperService.getPathFromId('loan-amortize', { id: this.idLoan });
    this.router.navigate([link]);
  }

  setHeaderTitle() {
    this.level1 = {
      title: 'MENU.LOAN',
      routeId: 'loan-page'
    };

    this.level2 = {
      selectedTitle: '',
      elements: [],
      fmt: LiteralFormats.IBAN
    };

    this.headerService.setTitle(this.level1, this.level2);
    this.loanServiceSubscription = this.loanService.getLoans().subscribe(result => {
      this.loading = false;
      result.data.forEach(elemen => {
        if (elemen.account.id !== this.idLoan) {

          let dataLoanString = {
            idLoan: elemen.account.id,
            currency: {
              code: elemen.currency.code,
              id: elemen.currency.id,
            },
          };
          this.shareService.setData('dataLoanString', dataLoanString);
          let cbu = this.formatAccountPipe.transform(elemen.account.formats, this.accountFormatView, this.ismobileResolution);
          this.level2.selectedTitle = cbu;

          this.level2.elements.push({
            title: cbu,
            routeId: 'loan-page',
            routeParams: { id: elemen.account.id },
            fmt: LiteralFormats.IBAN
          });
        } else {
          this.level2.selectedTitle = this.formatAccountPipe.transform(elemen.account.formats, this.accountFormatView, this.ismobileResolution);
        }
      }, () => {
        this.loading = false;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.loanServiceeSubscription) {
      this.loanServiceeSubscription.unsubscribe();
    }
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
    if (this.loanServiceSubscription) {
      this.loanServiceSubscription.unsubscribe();
    }
    if (this.paramsObservable) {
      this.paramsObservable.unsubscribe();
    }
  }

}
