import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterHelperService, DeviceUtilsService } from 'onesait-core';
import { CardsService } from 'itecban-common';
import { Subscription } from 'rxjs';
import { CardElement } from '../../classes/card-elements';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail-page.component.html'
})
export class CardDetailPageComponent implements OnInit, OnDestroy {

  @Input() card: CardElement;
  @Input() movement;
  @Input() coming;
  @Output() closeEvent = new EventEmitter();

  protected deviceUtilsServiceSubscription: Subscription;
  view: string = 'resume';
  recivedCard: any;
  balance: any;
  loading: boolean;
  ismobileResolution: boolean;
  detail: any;
  normal = false;

  constructor(protected router: Router,
              protected cardsService: CardsService,
              protected deviceUtilsService: DeviceUtilsService
  ) {
    this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
      this.ismobileResolution = deviceUtilsService.isMobileResolution;
    });
  }

  ngOnInit() {
    switch (this.coming) {
      case 'cardMovements':
        if (this.movement.id) {
          this.loading = true;
            this.cardsService.getMovement(this.card.id, this.movement.id).subscribe( res => {
              this.detail = res.data;
              this.loading = false;
            });
        } else {
          this.detail = this.movement;
        }
        break;
      case 'cardStatements':
      this.loading = true;
        this.cardsService.getStatement(this.card.id, this.movement.reference).subscribe( res => {
          console.log(res);
          this.detail = res.data;
          this.loading = false;
        });
        break;
    }
  }

  createTransfer() {
    const link = [RouterHelperService.getPathFromId('transfer-page')];
    this.router.navigate(link);
  }

  goTo(tab: string) {
     this.view = tab;
  }

  isMobileResolution() {
    return this.deviceUtilsService.isMobileResolution;
  }

   ngOnDestroy(): void {
    this.deviceUtilsServiceSubscription.unsubscribe();
  }

  close() {
    this.closeEvent.emit();
  }
}
