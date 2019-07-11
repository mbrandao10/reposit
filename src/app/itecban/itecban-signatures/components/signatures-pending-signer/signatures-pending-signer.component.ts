import { Component, OnInit, Input } from '@angular/core';
import { Signer } from 'onesait-api';

@Component({
  selector: 'osb-signatures-pending-signer',
  templateUrl: './signatures-pending-signer.component.html'
})
export class SignaturesPendingSignerComponent implements OnInit {

  @Input() signers: Signer[];
  @Input() requiredSignatures: string;
  completedSigners: Signer[] = [];
  pendingSigners: Signer[] = [];
  completedCount = 0;
  pendingCount = 0;

  constructor() {

  }

  ngOnInit() {
    this.signers.forEach(element => {
      if (element.status.id === '0') {
        this.pendingSigners.push(element);
        this.pendingCount ++;
      }
      if (element.status.id === '1') {
        this.completedSigners.push(element);
        this.completedCount ++;
      }
    });
  }

}
