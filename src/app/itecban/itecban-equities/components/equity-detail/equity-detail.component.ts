import { Component, OnInit, Input } from '@angular/core';
import { EquityDetail } from 'itecban-common';
import { DeviceUtilsService } from 'onesait-core';


@Component({
  selector: 'osb-equity-detail',
  templateUrl: './equity-detail.component.html'
})
export class EquityDetailComponent implements OnInit {
  @Input() equityDetail: EquityDetail;


  constructor(
    protected deviceUtilsService: DeviceUtilsService) {

  }

  ngOnInit() {}


  // isMobileResolution() {
  //   return this.deviceUtilsService.isMobileResolution;
  // }

}
