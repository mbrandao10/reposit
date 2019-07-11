import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CardsService } from 'itecban-common';
import { AppConfigService, DeviceUtilsService } from 'onesait-core';
import { Subscription } from 'rxjs';
import { CardElement } from '../../classes/card-elements';

@Component({
selector: 'app-card-info',
templateUrl: './card-info.component.html'
})
export class CardInfoComponent implements OnInit, OnDestroy {

@Input() recivedCard: CardElement;

loading: boolean;
typeCard: CardElement;
coderecivedCard: string;
accountFormatView: string;
ismobileResolution: boolean;
deviceUtilsServiceSubscription: Subscription;

  constructor(
    protected cardsService: CardsService,
    appConfigService: AppConfigService,
    protected deviceUtilsService: DeviceUtilsService
    ) {
      this.accountFormatView = appConfigService.getConfig().account.viewKey;
      this.deviceUtilsServiceSubscription = deviceUtilsService.changeScreenSize().subscribe((_screenSize) => {
        this.ismobileResolution = deviceUtilsService.isMobileResolution;
      });
  }

  ngOnInit() {
    this.loading = true;
    this.coderecivedCard = this.recivedCard.productData.type.id;
    this.cardsService.getDebitCard(this.recivedCard.id).subscribe(res => {
      this.typeCard = res.data ;
      // if (this.typeCard.account.formats[0].id) {
        let cbu = this.typeCard.account.formats[0].value;
        this.typeCard.account.formats[0] = {format: {id: 'IBAN',
        name: 'IBAN'}, value: cbu};
      // }
      this.loading = false;
    }, () => this.loading = false );
  }

  ngOnDestroy(): void {
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
  }

}
