import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppConfigService } from '../../../services/app-config-service/app-config.service';
import { SignatureEntity } from '../../../services/signature-token-service/signature-token.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'osb-signature-security-card',
  templateUrl: './signature-security-card.component.html'
})
export class SignatureSecurityCardComponent implements OnInit {

  tokenLength = 2;
  link = location.protocol + '//' + location.hostname + ((location.port) ? ':' + location.port : '') + window.location.pathname + 'SignCardTextHelp/whereLocateSignatureCards.pdf'

  @Input()
  signatureEntity: SignatureEntity;

  tokensRequired: {id: string, value: string}[] = [];

  @ViewChild('formToken', { read: NgForm }) formToken: NgForm;

  constructor(
    private appConfigService: AppConfigService
  ) { }

  ngOnInit() {
    this.tokenLength = this.appConfigService.getConfig('signature.securityCard.length');
    let tokens = this.signatureEntity.data.split(',');
    tokens.forEach(element => {
      this.tokensRequired.push({id: element, value: null});
    });
  }

  isTokenValid(token) {
    if (token) {
      return token.length === this.tokenLength;
    } else {
      return false;
    }
  }

  tokenModified($event): void {
    console.log($event);
    let correct = false;
    let tokens: string[] = [];
    for (let i = 0; i < this.tokensRequired.length; i++) {
      let token = this.tokensRequired[i];
      correct = this.isTokenValid(token.value);
      tokens.push(token.id + ':' + token.value);
      if (!correct) {
        break;
      }
    }
    if (correct) {
      this.signatureEntity.token = tokens.join(',');
    }
    if(this.tokensRequired[$event]){
      if(this.tokensRequired[$event].value.length === this.tokenLength){
        if(document.getElementById('labelCordenada' + ($event + 1 )))
          document.getElementById('labelCordenada' + ($event + 1 )).focus();
      }
    }

    this.signatureEntity.tokenValid  = correct;


  }

  viewLink() {
    window.open(this.link, '_blank');
  }

}

