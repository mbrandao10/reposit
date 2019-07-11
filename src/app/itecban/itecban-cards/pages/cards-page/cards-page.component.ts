import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'underscore';
import { HeaderService, AppConfigService, RouterHelperService, ShareService, TabElement, DeviceUtilsService } from 'onesait-core';
import { CardsService, CardsUtilsService } from 'itecban-common';
import { Router } from '@angular/router';
import { CardsElement } from '../../classes/card-elements';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards-page',
  templateUrl: './cards-page.component.html'
})
export class CardsPageComponent implements OnInit, OnDestroy {

  tabs: TabElement[] = [];
  cardsTypes = {tabs: []} ;
  cardType: any;
  view: string;
  loading: boolean;
  cards: CardsElement[];
  cardsDebit: CardsElement[];
  cardsCredit: CardsElement[];
  codeDebitCard: string;
  codeCreditCard: string;
  currency: [] = [];
  cardsBalance: any [] = [];
  totalSpentMonth =  {id: '', amount: 0, currency: { code: '', id: ''}};
  ismobileResolution:boolean;

  private deviceUtilsServiceSubscription: Subscription;

  constructor(
    protected shareService: ShareService,
    protected routerHelperService: RouterHelperService,
    protected cardsUtilsService: CardsUtilsService,
    protected cardsService: CardsService,
    protected appConfigService: AppConfigService,
    protected router: Router,
    protected headerService: HeaderService,
    protected deviceUtilsService: DeviceUtilsService
    ) {
      this.cardsTypes.tabs = this.tabs;
      this.codeDebitCard = appConfigService.getConfig().cardsTypes.debit;
      this.codeCreditCard = appConfigService.getConfig().cardsTypes.credit;
      this.currency = appConfigService.getConfig().currencies;
      this.loading = true;
      this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
        this.ismobileResolution = deviceUtilsService.isMobileResolution;
   });
    }

    ngOnInit() {
      this.loading = true;
      this.headerService.setTitle('MENU.CARDS');
      this.cardsService.getDebitCards().subscribe((result: any) => {
        this.cards = result.data;
        if (this.cards && this.cards.length > 0) {
        if (this.cards[0].productData.type && this.cards[0].productData.type.id) {
          const cardsByType = _.groupBy(this.cards, function(elem: any) { return elem.productData.type.id; });
          this.cardsDebit = cardsByType[this.codeDebitCard];
          this.cardsCredit = cardsByType[this.codeCreditCard];

        } else {
          this.cardsDebit = new Array();
          this.cardsCredit = new Array();
          this.cards.forEach(element => {
              if (element.productData.description && element.productData.description.length
                       && element.productData.type.id === 'D') {
                        this.cardsDebit.push(element);
                        element.productData.type.id = 'D';
              } else {
                this.cardsCredit.push(element);
                element.productData.type.id = 'C';
              }

          });
        }
      }
        // CREDITCARDS
        if (this.cardsCredit && this.cardsCredit.length > 0) {
          this.tabs.push({name: 'Crédito', view: 'C' });
          const cardsCreditByCurrency = _.groupBy(this.cardsCredit, function(elem: any) { return elem.outstandingBalance.currency.code; });
          this.currency.forEach((element: any) => {
            let cdbc = cardsCreditByCurrency[element.code];
            if (cdbc) {
                 this.totalSpentMonth.amount = 0;
                 this.totalSpentMonth.id = 'C';
                cdbc.forEach(cardDebit => {
                  if (cardDebit.outstandingBalance && cardDebit.outstandingBalance.amount) {
                    this.totalSpentMonth.amount += cardDebit.outstandingBalance.amount;
                    this.totalSpentMonth.currency = cardDebit.outstandingBalance.currency;
                  }
                });
                this.cardsBalance.push(this.totalSpentMonth);
              }
          });
        }
        // DEBITCARDS
        if (this.cardsDebit) {
          this.tabs.push({name: 'Débito', view: 'D' });
        }
        if (this.cards && this.cards.length > 0) {
        this.cardType = this.cardsTypes.tabs[0];
        this.view = this.cardType.view;
        this.cards = this.cardsCredit;
        }
      this.loading = false;
    }, () => { this.loading = false;
    });
  }

  chargeCardByType(cardId: any) {
    this.cardType = cardId;
    if (cardId === 'C') {
        this.cards = this.cardsCredit;
    } else {
        this.cards = this.cardsDebit;
    }
  }

  viewCard(card: any) {
    this.shareService.setData('cardId', card.id);
    let link = [RouterHelperService.getPathFromId('card-page')];
    this.router.navigate(link);
  }

  contractCard() {
    let link = [RouterHelperService.getPathFromId('cards-page-contract')];
    this.router.navigate(link);
  }

  ngOnDestroy(): void {
    this.deviceUtilsServiceSubscription.unsubscribe();
}

}
