import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SignatureSecurityCardComponent } from './signature-security-card/signature-security-card.component';
import { SignatureTokenComponent } from './signature-token/signature-token.component';
import { SignatureEntity } from '../../services/signature-token-service/signature-token.service';

@Component({
  selector: 'osb-signature',
  templateUrl: './signature.component.html',
  entryComponents: [SignatureSecurityCardComponent, SignatureTokenComponent]
})
export class SignatureComponent implements OnInit, OnChanges {


  @Input()
  signatureEntity: SignatureEntity;

  @ViewChild('signatureContainer', { read: ViewContainerRef })
  private container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    /*if (this.signatureEntity) {
      this.signatureEntity.token = null;
      if (this.signatureEntity.type.toUpperCase() === 'SECURITY-CARD') {
        let componentFactory = this.resolver.resolveComponentFactory(SignatureSecurityCardComponent);
        let componentRef = this.container.createComponent(componentFactory);
        componentRef.instance.signatureEntity = this.signatureEntity;
      } else if (this.signatureEntity.type.toUpperCase() === 'SECURITY-TOKEN') {
        let componentFactory = this.resolver.resolveComponentFactory(SignatureTokenComponent);
        let componentRef = this.container.createComponent(componentFactory);
        componentRef.instance.signatureEntity = this.signatureEntity;
      }
    }*/
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.signatureEntity){
      this.signatureEntity.token = null;
      this.container.clear();
      if (this.signatureEntity.type.toUpperCase() === 'SECURITY-CARD') {
        let componentFactory = this.resolver.resolveComponentFactory(SignatureSecurityCardComponent);
        let componentRef = this.container.createComponent(componentFactory);
        componentRef.instance.signatureEntity = this.signatureEntity;
      } else if (this.signatureEntity.type.toUpperCase() === 'SECURITY-TOKEN' || this.signatureEntity.type.toUpperCase() === 'OTP') {
        let componentFactory = this.resolver.resolveComponentFactory(SignatureTokenComponent);
        let componentRef = this.container.createComponent(componentFactory);
        componentRef.instance.signatureEntity = this.signatureEntity;
      }
    }
  
  }

}

