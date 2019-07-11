import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService, AppConfigService, DeviceUtilsService } from 'onesait-core';
import { RouterHelperService } from 'onesait-core';
import { Subscription } from 'rxjs';



@Component({
    selector: 'app-global-position-box',
    templateUrl: './global-position-box.component.html'
})
export class GlobalPositionBoxComponent implements OnChanges, OnInit, OnDestroy {

    @Input()
    elments: any;

    @Input()
    product: string;

    @Input()
    headerText: string;

    @Input()
    headerPath: string;

    @Input()
    detailPath: any;

    @Input()
    detailPathEB: any; // detailpath de expressbill

    @Input()
    currencyCode: string;

    @Input()
    iconClass: string;

    @Input()
    colorClass: string;

    @Input()
    color: string;

    @Input()
    loading: boolean;

    routeActive: string;
    codeDebitCard: any;
    codeCreditCard: any;
    accountFormatView: string;

    ismobileResolution: boolean;
    private deviceUtilsServiceSubscription: Subscription;

    constructor(private router: Router,
        protected shareService: ShareService,
        protected appConfigService: AppConfigService,
        protected routerHelperService: RouterHelperService,
        protected deviceUtilsService: DeviceUtilsService) {
        this.codeDebitCard = appConfigService.getConfig().cardsTypes.debit;
        this.codeCreditCard = appConfigService.getConfig().cardsTypes.credit;
        this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
            this.ismobileResolution = deviceUtilsService.isMobileResolution;
       });
    }

    ngOnChanges() {

    }
    ngOnInit() {
        this.accountFormatView = this.appConfigService.getConfig().account.viewKey;
    }

    goToHeader(header) {
        let link = [RouterHelperService.getPathFromId(header)];
        this.router.navigate(link);
    }

    goTo(selec) {
        // let link: string[] = [];
        // if(this.detailPath
            // {accountId: fund.accountFundId, fundId: fund.fund.id})
        // if(this.detailPath.includes('funds') || this.detailPath.includes('equities'))
        //     link = [RouterHelperService.getPathFromId(this.detailPath)];
        // else
        //     link = [RouterHelperService.getPathFromId(this.detailPath, {id: selec.id})];
        // this.router.navigate(link);
        if (this.detailPath !== 'card-page' ) {
            if (this.product === 'factoring' || this.product === 'leasing') {
                let link = [RouterHelperService.getPathFromId(this.detailPath, {contractId: selec.id})];
                this.router.navigate(link);
            } else if (this.product === 'confirming' && selec.productType === 'EB' ) {
                let link = [RouterHelperService.getPathFromId(this.detailPathEB, {id: selec.id})];
                this.router.navigate(link);
            } else {
                if (this.product === 'loans') {
                    let dataLoanString = {
                        currency: {
                          code: selec.outstandingBalance.currency.code,
                          id: selec.outstandingBalance.currency.id,
                        },
                      };
                    this.shareService.setData('dataLoanString', dataLoanString);
                }
                let link = [RouterHelperService.getPathFromId(this.detailPath, {id: selec.id})];
                this.router.navigate(link);
            }
        } else {
            let link = [RouterHelperService.getPathFromId(this.detailPath)];
            this.shareService.setData('cardId', selec.id);
            this.router.navigate(link);
        }
    }

    ngOnDestroy(): void {
        this.deviceUtilsServiceSubscription.unsubscribe();
    }

}
