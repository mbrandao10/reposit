import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, TransferService } from 'onesait-core';
import { AppConfigService, UtilsService } from 'onesait-core';
import { AccountElement } from 'onesait-api';
import * as _ from 'underscore';

@Component({
  selector: 'app-account-cancel-page',
  templateUrl: './account-cancel-page.component.html'
})
export class AccountCancelPageComponent implements OnInit, OnDestroy {


  step = 'FIRST';
  accountDetail: any;
  destinyAccountDetail: any;
  destinyType = 'account';
  accounts: AccountElement[];
  cancelAccount: any = {};
  reasonTypes: any[];
  currencies: any[];
  selectDestiny = false;
  loading = false;
  token: string;
  tokenValid: boolean;
  simulation: any;
  errorDestiny: boolean;
  formValid = false;
  cancelObj: any;


  protected paramsObservable: any;
  protected id: string;

  constructor(
    protected accountService: AccountService,
    protected transferService: TransferService,
    protected utilsService: UtilsService,
    protected router: Router,
    protected route: ActivatedRoute,
    private appConfigService: AppConfigService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.init();
    // No existe en transferService
    /*
    this.transferService.getReasonTypes().subscribe(result => {
      this.reasonTypes = result.data;
      this.cancelAccount.reasonType = _.findWhere(this.reasonTypes, { id: this.appConfigService.getConfig().transfers.form.conceptSelected });
    });
    */
    this.currencies = this.appConfigService.getConfig().currencies;
    this.cancelAccount.reason = 'Cancelación de cuenta';
  }

  init() {
    this.paramsObservable = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadDetail(this.id);
    });
  }

  changeDestinyType(type: string) {
    this.errorDestiny = false;
    if (type === 'cbu') {
      this.cancelAccount.account = null;
    } else {
      this.cancelAccount.beneficiaryCoelsa = null;
      this.cancelAccount.destinyCoelsaAccount = null;
    }
    this.validateForm();

  }

  getAccontFromCoelsa() {
    /* this.errorDestiny = false;
    if (this.cancelAccount.beneficiaryCoelsa.length > 5 && this.cancelAccount.beneficiaryCoelsa.length < 21) {
      this.getCoelsaAccountInfo({ alias: this.cancelAccount.beneficiaryCoelsa });
    } else if (this.cancelAccount.beneficiaryCoelsa.length === 22) {
      this.getCoelsaAccountInfo({ cbu: this.cancelAccount.beneficiaryCoelsa });
    } */

  }

  getCoelsaAccountInfo(_params: any) {
    /* let me = this;
    this.coelsaService.getAccountData(params, {disableErrors: true})
      .subscribe(result => {
        let user = this.utilsService.getUser();
        if (_.pluck(result.data.holders, 'cuit').indexOf(user.userSecondaryLegalId) >= 0) {
          this.cancelAccount.destinyCoelsaAccount = result.data;
          this.cancelAccount.destinyCoelsaAccount.currency.id = me.utilsService.getCurrency(this.cancelAccount.destinyCoelsaAccount.currency.code);
        } else {
          this.errorDestiny = true;
        }
        this.validateForm();
      }, () => {
        // this.formState.loadingCoelsa = false;
      }); */

  }

  validateForm() {
    if (this.destinyType === 'cbu' && this.cancelAccount.destinyCoelsaAccount) {
      this.formValid = true;
    } else if (this.destinyType === 'account' && this.cancelAccount.account) {
      this.formValid = true;
    } else {
      this.formValid = false;
    }
  }

  loadDetail(id: string) {
    this.accountService.getAccount(id).subscribe(result => {
      this.accountDetail = result.data;
      // this.cancelAccount.amount = this.accountDetail.balance.amount;
      this.cancelAccount.currency = _.findWhere(this.currencies, { code: this.accountDetail.currency.code });
      this.accountService.getAlias(id).subscribe( (aliasResult: any) => {
        this.cancelAccount.alias = aliasResult.data.alias;
      });
    });

    this.accountService.getAccounts().subscribe(result => {
      this.accounts = _.reject(result.data, (account: any) => {
        return account.id === this.id;
      });
      this.accountService.cancelAccountSimulation(this.id).subscribe( (simResult: any) => {
        this.loading = false;
        this.simulation = simResult.data;
        this.cancelAccount.amount = this.simulation.cancelAmount;
        this.cancelAccount.newBalance = this.simulation.newBalance;
      }, () => this.loading = false);
    });
  }

  moveAmount() {
    if (this.simulation.cancelAmount > 0) {
      this.changeView('SELECT_ACCOUNT');
      this.selectDestiny = true;
    } else if (this.simulation.cancelAmount < 0) {
      this.changeView('NEGATIVE_ACCOUNT');
    } else {
      this.changeView('VERIFY');
    }
  }

  cancel() {
    let link = ['/itecban/account-detail', this.id];
    this.router.navigate(link);
  }

  doTransfer() {
    this.changeView('VERIFY');
    this.cancelObj = null;
    if (this.selectDestiny) {
      this.cancelObj = {
        amount: {
          amount: this.cancelAccount.newBalance,
          currency: {
            id: this.accountDetail.currency.id,
            code: this.accountDetail.currency.code
          }
        },
        beneficiary: {
          legalDocument: {
            id: this.utilsService.getUser().userSecondaryLegalId,
            type: '0'
          },
          personType: (this.cancelAccount.destinyCoelsaAccount) ? this.cancelAccount.destinyCoelsaAccount.holders[0].personType : null
        },
        reason: this.cancelAccount.reason
      };
      if (this.destinyType === 'account') {
        // Para wanap enviamos cbu antes que el id
        if (this.cancelAccount.account.formats && this.cancelAccount.account.formats.length > 0) {
          this.cancelObj.toAccount = {
            id: this.cancelAccount.account.formats[0].value,
            type: this.cancelAccount.account.formats[0].format.id
          };
        } else {
          this.cancelObj.toAccount = {
            id: this.cancelAccount.account.id
          };
        }
        this.cancelObj.transferInd = '3';
      } else if (this.destinyType === 'cbu') {
        this.cancelObj.toAccount = {
          id: this.cancelAccount.destinyCoelsaAccount.cbu,
          type: 'CBU',
          coelsaAccountType: this.cancelAccount.destinyCoelsaAccount.type,
        };
        if (this.appConfigService.getConfig().wanapBankCode === this.cancelAccount.destinyCoelsaAccount.bank) {
          this.cancelObj.transferInd = '3';
        } else {
          this.cancelObj.transferInd = '1';
        }
      }
    }
  }

  completeToken() {
    if (this.appConfigService.getConfig().cancelAccountTokenIsRequired) {
      this.changeView('TOKEN');
    } else {
      this.confirmTransfer();
    }
  }

  confirmTransfer() {
    this.loading = true;

    if (this.selectDestiny) {
        this.accountService.deleteAccount(this.id, this.cancelObj).subscribe(() => {
          this.loading = false;
          this.changeView('FINISH');
        }, () => this.loading = false);
    } else {
      let cancelObj = {
        amount: {
          amount: this.cancelAccount.newBalance,
          currency: {
            id: this.accountDetail.currency.id,
            code: this.accountDetail.currency.code
          }
        }
      };
      this.accountService.deleteAccount(this.id, cancelObj).subscribe(() => {
        this.loading = false;
        this.changeView('FINISH');
      }, () => this.loading = false);
    }
  }

  viewAccounts() {
    let link = ['/itecban/accounts'];
    this.router.navigate(link);
  }

  ngOnDestroy() {
    this.paramsObservable.unsubscribe();
  }

  back() {
    switch (this.step) {
      case 'SELECT_ACCOUNT': {
        this.changeView('FIRST');
        break;
      }
      case 'VERIFY': {
        if (this.simulation.cancelAmount === 0) {
          this.changeView('FIRST');
        } else {
          this.changeView('SELECT_ACCOUNT');
        }
        break;
      }
      case 'TOKEN': {
        this.changeView('VERIFY');
        break;
      }
    }
  }

  changeView(nextView: string) {
    this.step = nextView;
  }


}
