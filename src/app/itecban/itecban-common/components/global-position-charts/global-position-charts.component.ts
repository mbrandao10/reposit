import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { SwipeType } from '../../directives/swipe-directive/swipe-directive';

@Component({
  selector: 'app-global-position-charts',
  templateUrl: './global-position-charts.component.html'
})
export class GlobalPositionChartsComponent implements OnInit, OnChanges {

  @Input() elments;
  @Input() dataFinancial;
  @Input() colorFinancial;
  @Input() dataInvestment;
  @Input() colorInvestment;
  @Input() idCurrency: string;

  @ViewChild('rightGraph', {read: ElementRef}) rightGraph: ElementRef;
  @ViewChild('leftGraph', {read: ElementRef}) leftGraph: ElementRef;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }

  rightElementFire() {
    this.leftGraph.nativeElement.click();
  }

  leftElementFire() {
    this.rightGraph.nativeElement.click();
  }

  managerSwipe( event: SwipeType) {
    if (event === SwipeType.SwipeLeft) {
       this.leftElementFire();
    } else if (event === SwipeType.SwipeRight) {
       this.rightElementFire();
    }
  }

}
