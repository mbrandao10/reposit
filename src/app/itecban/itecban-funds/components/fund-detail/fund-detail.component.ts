import { Component, OnInit, Input} from '@angular/core';
import { FundDetail } from 'itecban-common';
// import { CustomersService, DeviceUtilsService } from 'onesait-core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'osb-fund-detail',
  templateUrl: './fund-detail.component.html'
})
export class FundDetailComponent implements OnInit {

  @Input() fundDetail: FundDetail;

  constructor() {
  }

  ngOnInit() {
  }


  // isMobileResolution() {
  //   return this.deviceUtilsService.isMobileResolution;
  // }

  // close() {
  //   this.closeEvent.emit();
  // }
}
