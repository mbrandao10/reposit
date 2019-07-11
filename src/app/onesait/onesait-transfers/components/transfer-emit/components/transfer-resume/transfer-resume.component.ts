import { Component, Input } from '@angular/core';
import { TransferState } from 'onesait-api';

@Component({
  selector: 'osb-transfer-resume',
  templateUrl: './transfer-resume.component.html'
})
export class TransferResumeComponent {

  @Input() transferState: TransferState;

}
