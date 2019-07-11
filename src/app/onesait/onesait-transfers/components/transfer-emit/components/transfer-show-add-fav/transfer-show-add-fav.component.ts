import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransferExecutionMoment } from 'onesait-api';

@Component({
  selector: 'osb-transfer-show-add-fav',
  templateUrl: './transfer-show-add-fav.component.html'
})
export class TransferShowAddFavComponent implements OnChanges {

  @Input() transferFormData: FormGroup;
  @Input() transferFormExecution: any;
  show: boolean;
  changedPeriod = false;
  constructor() { }

  ngOnChanges() {
    if (this.transferFormExecution) {
      if (this.transferFormExecution.executionMoment === TransferExecutionMoment.N) {
        this.show = true;
        if (this.changedPeriod) {
          this.changedPeriod = false;
        }
      } else {
        this.show = false;
        this.changedPeriod = true;
        // this.transferFormData.patchValue({favouriteName: null});
        this.transferFormData.patchValue({favouriteName: false});
      }
    } else {
      this.show = false;
    }
  }
}
