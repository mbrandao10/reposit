import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService, AppConfigService } from 'onesait-core';
import { AccountService, CustomersService } from 'onesait-core';

import * as _ from 'underscore';

@Component({
    selector: 'app-account-add-intervener',
    templateUrl: './account-add-intervener.component.html'
})
export class AccountAddIntervenerComponent implements OnInit, OnDestroy {


    private paramsObservable: any;

    listFormats: any;
    newIntervener: any;
    view = 'addIntervener';
    accountId: any;

    loading: boolean;
    token: any;
    tokenValid: boolean;

    bondTypes: any[];
    numSelected = 0;

    codePesos: any;
    codeUSD: any;

    accountsPesos: any[];
    accountsUSD: any[];

    constructor(
        protected accountService: AccountService,
        protected customersService: CustomersService,
        protected utilsService: UtilsService,
        protected router: Router,
        protected route: ActivatedRoute,
        protected translateService: TranslateService,
        private appConfigService: AppConfigService) {
            this.codePesos = this.appConfigService.getConfig().currencyCodes.pesos;
            this.codeUSD = this.appConfigService.getConfig().currencyCodes.dolares;
        }

    ngOnInit() {
        this.init();
        this.paramsObservable = this.route.params.subscribe(params => {
            this.accountId = params['id'];
            this.loading = true;
            this.accountService.getAccounts().subscribe(result => {
                let accounts: any[] = result.data;
                let accountSelected = _.findWhere(accounts, {id: this.accountId});
                accountSelected.selected = true;
                this.numSelected = 1;
                let accountsByCurrency = _.groupBy(accounts, function(elem: any) { return elem.currency.code; });

                this.accountsPesos = accountsByCurrency[this.codePesos];
                this.accountsUSD = accountsByCurrency[this.codeUSD];
                this.loading = false;
            }, () => { this.loading = false; });
        });
    }

    ngOnDestroy(): void {
        if (this.paramsObservable) {
            this.paramsObservable.unsubscribe();
        }
    }

    init() {
        this.newIntervener = {};
        this.newIntervener.name = null;
        this.newIntervener.surname = null;
        this.newIntervener.secondSurname = null;
        this.newIntervener.email = null;
        this.newIntervener.text = 'PRUEBA';
        this.translateService.get('ITECBAN-ACCOUNT.ADDINTERVENER.TEXT.MESSAGE').subscribe((result: any) => {
            this.newIntervener.text = result;
        });
        this.newIntervener.legalDocument = {};
        this.newIntervener.legalDocument.type = '01';
        // this.newIntervener.bondType = "01";
        this.newIntervener.legalDocument.id = null;
        /*this.customersService.getBondTypes().subscribe(result=>{
            this.bondTypes = result.data;
        })*/

    }

    backDetail() {
        let link = ['/itecban/account-detail', this.accountId];
        this.router.navigate(link);
    }

    goBack(_view: string) {
        switch (_view) {
            case 'verifyIntervener': this.view = 'addIntervener';
                break;
            case 'saveIntervener': this.view = 'verifyIntervener';
                break;
        }
    }

    verifityIntervener() {
        this.view = 'verifyIntervener';
    }

    checkIntervener() {
        if (this.appConfigService.getConfig().addIntervenerTokenIsRequired) {
            this.view = 'saveIntervener';
        } else {
            this.saveIntervener();
        }
    }

    updateSelected() {
        let numSelected = 0;
        this.accountsPesos.forEach((elem: any) => {
            if (elem.selected) {
                numSelected++;
            }
        });
        this.numSelected = numSelected;
    }

    saveIntervenerInAccount(accounts: any[], index: number) {
        let evaluateResult = () => {
            if (index + 1 >= accounts.length) {
                this.view = 'created';
            } else {
                this.saveIntervenerInAccount(accounts, ++index);
            }
        };

        if (accounts && accounts.length > 0 && index >= 0) {
            let account = accounts[index];
            let params = this.utilsService.cloneObject(this.newIntervener);
            params.accountId = account.id;
            params.name = params.name
            + ( params.surname ? ' ' + params.surname : '')
            + ( params.secondSurname ? ' ' + params.secondSurname : '');
            evaluateResult();
        }
    }

    saveIntervener() {
        let allAccounts = this.accountsPesos.concat(this.accountsUSD);
        let accounts = _.where(allAccounts, {selected: true});
        this.saveIntervenerInAccount(accounts, 0);
    }

}
