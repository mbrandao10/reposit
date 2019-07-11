import { Component, Input  } from '@angular/core';
import { SignatureEntity } from '../../../services/signature-token-service/signature-token.service';

@Component({
  selector: 'osb-signature-token',
  templateUrl: './signature-token.component.html'
})
export class SignatureTokenComponent {

  @Input()
  signatureEntity: SignatureEntity;

  token: string;

  isTokenValid(token: string) {
    return token.length === 6;
  }

  tokenModified(token: string): void {
    this.signatureEntity.tokenValid = this.isTokenValid(token);
    this.signatureEntity.token = token;
  }
}
