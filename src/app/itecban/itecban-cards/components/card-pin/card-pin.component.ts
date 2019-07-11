import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from 'itecban-common';

@Component({
  selector: 'app-card-pin',
  templateUrl: './card-pin.component.html'
})
export class CardPinComponent implements OnInit {

@Input() recivedCard: any;

loading: boolean;
pin: string;
show = true;
showpin: string;
txt = 'mostrar';

    constructor(
        protected cardsService: CardsService
        ) {}

      ngOnInit() {
        this.loading = true;
        this.cardsService.getPin(this.recivedCard.id).subscribe( res => {
            this.pin = res.data.pin;
            this.change();
            this.loading = false;
        });

      }

      change() {
        this.show = !this.show;
        if (this.show) {
          this.showpin = this.pin;
        } else {
          this.showpin = '****';
        }
      }

}
