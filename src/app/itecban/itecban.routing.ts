import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlobalPositionPageComponent } from 'itecban-common';
import { MySpacePageComponent, PersonsConfigComponent, PasswordExpiredPageComponent } from 'itecban-persons';
import { AccountsPageComponent, AccountAddPageComponent, AccountPageComponent } from 'itecban-accounts';
import { DirectdebitsPageComponent } from 'itecban-directdebits';
import { RouterHelperService, RouteExtended, OnesaitPageComponent } from 'onesait-core';
import { AccountContractCheckPageComponent } from 'onesait-accounts';
import { ErrorSessionPageComponent } from 'itecban-common';
import { CardsPageComponent, CardDetailPageComponent, CardPageComponent, CardContractPageComponent, CardMovementsComponent } from 'itecban-cards';
import { DepositsPageComponent, DepositPageComponent, DepositAddPageComponent } from 'itecban-deposits';
import { CreditsPageComponent, CreditPageComponent } from 'itecban-credits';
import { CreditsAddPageComponent } from 'onesait-credits';
import { LoansPageComponent, LoanPageComponent, LoanAddPageComponent, LoanAmortizeComponent } from 'itecban-loans';
import { FundAddPageComponent, FundPageComponent, FundsPageComponent } from 'itecban-funds';
import { EquityAddPageComponent, EquitiesPageComponent, EquityPageComponent } from 'itecban-equities';
import { CurrencyExchangeComponent } from 'itecban-foreignoperations';
import { CashpoolingPageComponent } from 'itecban-cashpooling';
import { SettingsPageComponent } from 'itecban-settings';
import { DirectdebitPageComponent } from 'itecban-directdebits';

const ItecbanRoutes: RouteExtended[] = [
    {
        id: 'itb-page',
        path: 'onesait/i',
        component: OnesaitPageComponent,
        children: [
            // {
            //     id: 'home-page',
            //     path: '',
            //     component: InitPageComponent
            // },
            {
                id: 'global-position-page',
                path: 'global-position',
                component: GlobalPositionPageComponent
            },
            // {
            //     id: 'change-password-page',
            //     path: 'change-password',
            //     component: ChangePasswordPageComponent,
            //     canDeactivate: ['ConfirmDeactivateGuard']
            // },
            {
                id: 'persons-config-page',
                path: 'persons-config',
                component: PersonsConfigComponent,
                canDeactivate: ['ConfirmDeactivateGuard']
            },
            // CUENTAS
            {
                id: 'accounts-page',
                path: 'accounts',
                children: [
                    {
                        id: 'accounts-page',
                        path: '',
                        component: AccountsPageComponent
                    },
                    {
                        id: 'account-add-page',
                        path: 'add',
                        component: AccountAddPageComponent
                    },
                    {
                        id: 'account-detail-page',
                        path: 'account-detail/:id',
                        component: AccountPageComponent
                    },
                    {
                        id: 'account-contract-check-page',
                        path: 'account-contract-check/:id',
                        component: AccountContractCheckPageComponent
                    }
                ]
            },
            // END CUENTAS
            {
                id: 'cashpooling-page',
                path: 'cashpooling',
                children: [
                    {
                        id: 'cashpooling-page',
                        path: '',
                        component: CashpoolingPageComponent
                    }
                ]
            },
            // PRESTAMOS
            {
                id: 'loans-page',
                path: 'loans',
                children: [
                    {
                        id: 'loans-page',
                        path: '',
                        component: LoansPageComponent
                    },
                    {
                        id: 'loan-page',
                        path: 'loan-page/:id',
                        component: LoanPageComponent
                    },
                    {
                        id: 'loan-add-page',
                        path: 'loan-add',
                        component: LoanAddPageComponent
                    },
                    {
                        id: 'loan-amortize',
                        path: 'loan-amortize/:id',
                        component: LoanAmortizeComponent
                    },
                ]
            },
            // DIRECTDEBITS
            {
                id: 'directdebits-page',
                path: 'directdebits',
                children: [
                    {
                        id: 'directdebits-page',
                        path: '',
                        component: DirectdebitsPageComponent
                    },
                    {
                        id: 'directdebit-page',
                        path: 'directdebit/:id/:account',
                        component: DirectdebitPageComponent
                    },
                ]
            },
            // END DIRECTDEBITS
            // CREDITS
            {
                id: 'credits-page',
                path: 'credits',
                children: [
                    {
                        id: 'credits-page',
                        path: '',
                        component: CreditsPageComponent,
                    },
                    {
                        id: 'credit-detail-page',
                        path: 'credit-detail/:id',
                        component: CreditPageComponent,
                    },
                    {
                        id: 'credit-add-page',
                        path: 'add',
                        component: CreditsAddPageComponent,
                    },
                ]
            },
            // END CREDITS
            {
                id: 'deposits-page',
                path: 'deposits',
                children: [
                    {
                        id: 'deposits-page',
                        path: '',
                        component: DepositsPageComponent
                    },
                    {
                        id: 'deposit-detail-page',
                        path: 'deposit-detail/:id',
                        component: DepositPageComponent
                    },
                    {
                        id: 'deposit-add-page',
                        path: 'add',
                        component: DepositAddPageComponent
                    }
                ]
            },
            // END DEPOSITOS
            // FOREING OPERATIONS
            {
                id: 'currency-exchange-page',
                path: 'exchange',
                component: CurrencyExchangeComponent
            },
            // END FOREING OPERATIONS
            // FONDOS
            {
                id: 'funds-page',
                path: 'funds',
                children: [
                    {
                        id: 'funds-page',
                        path: '',
                        component: FundsPageComponent
                    },
                    {
                        id: 'funds-add-page',
                        path: 'add',
                        component: FundAddPageComponent
                    },
                    {
                        id: 'funds-account-page',
                        path: ':id',
                        component: FundsPageComponent
                    },
                    {
                        id: 'fund-page',
                        path: 'fund-page/:accountId/:fundId',
                        component: FundPageComponent
                    }
                ]
            },
            // END FONDOS
            // VALORES
            {
                id: 'equities-page',
                path: 'equities',
                children: [
                    {
                        id: 'equities-page',
                        path: '',
                        component: EquitiesPageComponent
                    },
                    {
                        id: 'equity-add-page',
                        path: 'add',
                        component: EquityAddPageComponent
                    },
                    {
                        id: 'equity-page',
                        path: 'equity-page/:id',
                        component: EquityPageComponent
                    }
                    // {
                    //     id: 'equity-detail',
                    //     path: 'equity-detail/:id',
                    //     component: EquityDetailComponent
                    // }
                ]
            },
            // END VALORES
            // TARJETAS
            {
                id: 'cards-page',
                path: 'cards',
                children: [
                    {
                        id: 'cards-page',
                        path: '',
                        component: CardsPageComponent
                    },
                    {
                        id: 'cards-page-contract',
                        path: 'cards-contract',
                        component: CardContractPageComponent
                    },
                    {
                        id: 'card-page',
                        path: 'card',
                        component: CardPageComponent
                    },
                    {
                        id: 'card-movements-page',
                        path: 'card-movements',
                        component: CardMovementsComponent
                    },
                    {
                        id: 'cards-detail-page',
                        path: 'detail',
                        component: CardDetailPageComponent
                    }
                ]
            },
            {
                id: 'my-space-page',
                path: 'my-space',
                component: MySpacePageComponent
            },
            {
                id: 'my-space-page-tab',
                path: 'my-space/:view',
                component: MySpacePageComponent,
                canDeactivate: ['ConfirmDeactivateGuard']
            },
            {
                id: 'my-space-detail-page',
                path: 'my-space/:view/:productId',
                component: MySpacePageComponent,
                canDeactivate: ['ConfirmDeactivateGuard']
            },
            {
                id: 'settings-page',
                path: 'settings',
                component: SettingsPageComponent
            }

        ]
    },
    {
        id: 'errorSession-error',
        path: 'errorSession/:error',
        component: ErrorSessionPageComponent
    },
    {
        id:'expired-password',
        path:'expired-password',
        component: PasswordExpiredPageComponent
    }
];

RouterHelperService.register(ItecbanRoutes);


@NgModule({
    imports: [RouterModule.forChild(ItecbanRoutes)],
    exports: [RouterModule]
})

export class ItecbanRoutingModule { }

