import { Component, Input } from '@angular/core';
import { AmortizeData } from 'onesait-api';

@Component({
  selector: 'osb-loan-amortize-detail',
  templateUrl: './loan-amortize-detail.component.html'
})

export class LoanAmortizeDetailComponent {

  @Input() amortizeData: AmortizeData;

  constructor(
  ) { }

}
