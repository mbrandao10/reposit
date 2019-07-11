import { Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { TransferSimulation } from 'onesait-api';
import { DeviceUtilsService } from 'onesait-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-transfer-emit-simulator',
  templateUrl: './transfer-emit-simulator.component.html'
})
export class TransferEmitSimulatorComponent  implements OnInit, OnChanges, OnDestroy {

  @Input() simulation: TransferSimulation;
  resolution;
  deviceUtilsServiceSubscription: Subscription;

  constructor(
    protected deviceUtilsService: DeviceUtilsService
  ) {
    this.deviceUtilsServiceSubscription = deviceUtilsService
      .changeScreenSize()
      .subscribe(_screenSize => {
        this.resolution = _screenSize;
      });
  }
  ngOnInit(): void {

  }

  ngOnChanges(_changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
  }
}
