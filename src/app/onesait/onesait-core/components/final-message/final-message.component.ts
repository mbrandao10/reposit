import { Component, OnInit, Input } from '@angular/core';
import { SignatureData } from 'onesait-api';
import { RouterHelperService } from '../../services/router-helper-service/router-helper.service';
import { Router } from '@angular/router';


@Component({
  selector: 'osb-final-message',
  templateUrl: './final-message.component.html'
})
export class FinalMessageComponent implements OnInit {

  /**
   * Text to show in the component
   */
  @Input() text: string;

  @Input() signatureData: SignatureData;

  // @ContentChild(VoucherContainerDirective) voucherContainer: VoucherContainerDirective;

  @Input() style: string;
  @Input() icon: string;
  @Input() close: boolean;
  @Input() routeId: string;

  _style: string;
  _icon: string;
  show = true;

  constructor(
    protected router: Router,
  ) { }

  ngOnInit() {
    this._style = this.style ? this.style : 'message-ok';
    this._icon = this.icon ? this.icon : 'icon-ok';
  }

  goTo() {
    if (this.routeId) {
      let link = [RouterHelperService.getPathFromId(this.routeId)];
      this.router.navigate(link);
    }

  }



}
