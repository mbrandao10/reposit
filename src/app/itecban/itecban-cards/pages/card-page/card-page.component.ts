import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { HeaderService, ShareService, List, RouterHelperService, HeaderTitleElement, HeaderTitleArray, LiteralFormats, TabElement } from 'onesait-core';
import { Router, NavigationEnd } from '@angular/router';
import { CardsService } from 'itecban-common';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';
import { CardsElement, Balances } from '../../classes/card-elements';

@Component({
    selector: 'app-card-page',
    templateUrl: './card-page.component.html'
  })


export class CardPageComponent implements AfterViewInit, OnDestroy {

  // subscriptionCard: Subscription;
  listCardReceived: List;
  listCardStatement: List;
  recivedCard: CardsElement;
  recivedAllCards: CardsElement[];
  loading: boolean;
  balance: Balances;
  tabs: TabElement[] = [];
  view: string;
  level1: HeaderTitleElement;
  level2: HeaderTitleArray;
  cardId: string;
  people = false;

  protected _routerSub = Subscription.EMPTY;

    constructor(
      protected headerService: HeaderService,
      protected router: Router,
      protected cardsService: CardsService,
      protected shareService: ShareService
      ) {
        this.loading = true;
      }

    ngAfterViewInit() {
      if (this.shareService.getData('cardId')) {
        this._routerSub = this.router.events.subscribe((e) => {
          if (e instanceof NavigationEnd) {
            this.loader();
        }}, () => {
          this.goCards();
        });
    } else {
      this.goCards();
      }
      this.loader();
  }

  loader() {
    let crdId: string = this.shareService.getData('cardId');
    if (crdId !== undefined) {
      if (this.cardId !== crdId) {
        this.cardId = crdId;
        this.view = undefined;
        this.recivedCard = undefined;
          this.loadPage();
        }
    } else {
      this.goCards();
    }
  }

    goCards() {
      let link = [RouterHelperService.getPathFromId('cards-page')];
      this.router.navigate(link);
    }

    loadPage() {
      this.loading = true;
      if (this.recivedCard) {
        this.loadCard();
      } else {
        this.loadCards();
      }
    }

    loadCards() {
      this.cardsService.getDebitCards().subscribe( (respuesta: any) => {
        this.recivedCard = undefined;
        this.listCardReceived = new List(this.cardsService, 'getMovements');
        this.listCardStatement = new List(this.cardsService, 'getStatements');
        this.recivedAllCards = respuesta.data;
        this.loadCard();
      }, () => this.loading = false );
    }

    loadCard() {
      this.view = '';
      this.setHeaderTitle();
      this.cardsService.getDebitCard(this.cardId).subscribe( res => {
        this.recivedCard = res.data;
        this.tabs = [];
        if (this.recivedCard.productData.type.id !== 'C') {
          this.tabs.push({name: 'ITECBAN-DEBITCARD.MENU.ACTIVITY', view: 'M' },
          {name: 'ITECBAN-DEBITCARD.MENU.INFO', view: 'I' });
        } else {
          this.tabs.push({name: 'ITECBAN-DEBITCARD.MENU.ACTIVITY', view: 'M' }, {name: 'ITECBAN-DEBITCARD.MENU.INFO', view: 'I' });
        }
        this.view = this.tabs[0].view;
        this.cardsService.getCreditcardBalance(this.cardId).subscribe(resp => {
          this.balance = resp.data;
          this.loading = false;
     }, () => {
       this.loading = false;
     });
    });
  }

    setHeaderTitle() {
      this.level1 = {
        title: 'MENU.CARDS',
        routeId: 'cards-page'
      };
      this.level2 = {
        selectedTitle: '',
        elements: [],
        selectedId: '',
        fmt: LiteralFormats.CARD
      };
      this.recivedAllCards.forEach(element => {
          this.level2.elements.push({
            title: element.id,
            routeId: 'card-page',
            routeCardId: element.id,
            fmt: LiteralFormats.CARD
          });
        if (element.id === this.cardId) {
          this.level2.selectedId = this.cardId;
          this.level2.selectedTitle = element.id;
        }
      });
      this.level2.elements = _.sortBy(this.level2.elements, function (element) { return element.title; });
      this.headerService.setTitle(this.level1, this.level2);
  }

  beneficiaryCard() {

  }

  ngOnDestroy() {
    if (this._routerSub) {
      this._routerSub.unsubscribe();
    }
  }

}
